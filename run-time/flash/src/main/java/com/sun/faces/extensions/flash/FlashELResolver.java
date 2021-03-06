/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 only ("GPL") or the Common Development
 * and Distribution License("CDDL") (collectively, the "License").  You
 * may not use this file except in compliance with the License.  You can
 * obtain a copy of the License at
 * https://oss.oracle.com/licenses/CDDL+GPL-1.1
 * or LICENSE.txt.  See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * When distributing the software, include this License Header Notice in each
 * file and include the License file at LICENSE.txt.
 *
 * GPL Classpath Exception:
 * Oracle designates this particular file as subject to the "Classpath"
 * exception as provided by Oracle in the GPL Version 2 section of the License
 * file that accompanied this code.
 *
 * Modifications:
 * If applicable, add the following below the License Header, with the fields
 * enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyright [year] [name of copyright owner]"
 *
 * Contributor(s):
 * If you wish your version of this file to be governed by only the CDDL or
 * only the GPL Version 2, indicate your decision by adding "[Contributor]
 * elects to include this software in this distribution under the [CDDL or GPL
 * Version 2] license."  If you don't indicate a single choice of license, a
 * recipient has the option to distribute your version of this file under
 * either the CDDL, the GPL Version 2 or to extend the choice of license to
 * its licensees as provided above.  However, if you add GPL Version 2 code
 * and therefore, elected the GPL Version 2 license, then the option applies
 * only if the new code is made subject to such option by the copyright
 * holder.
 */

/*
 * $Id: FlashELResolver.java,v 1.6 2005/12/16 21:32:37 edburns Exp $
 */

package com.sun.faces.extensions.flash;

import java.beans.FeatureDescriptor;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import javax.el.ELContext;
import javax.el.ELResolver;
import javax.el.PropertyNotFoundException;
import javax.el.PropertyNotWritableException;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

/**
 * <p>Provide a feature semantically identical to the <a target="_"
 * href="http://api.rubyonrails.com/classes/ActionController/Flash.html">
 * "flash" concept in Ruby on Rails</a>.</p>
 *
 * <p>The feature is exposed to users via a custom
 * <code>ELResolver</code> which introduces a new implicit object,
 * <code>flash</code>.  The flash functions as <code>Map</code> and
 * can be used in <code>getValue( )</code> or <code>setValue(
 * )</code> expressions.</p>
 *
 * <p>Usage</p>
 *
 * <ul>
 *
 * <p>Consider three JSF views: viewA, viewB, and viewC.  The user
 * first views viewA, then clicks a button and is shown viewB, where
 * she clicks a button and is shown viewC.  If values are stored
 * into the flash during the rendering or postback phases of viewA,
 * they are available to during the rendering phase of viewB, but
 * are not available during the rendering or postback phases of
 * viewC.  In other words, values stored into the flash on "this"
 * request are accessible for the "next" request, but not
 * thereafter.</p>
 *
 * <p>There are three ways to access the flash.</p>
 *
 * <ol>
 *
 *  <li><p>Using an EL Expression, such as using
 *  <code>#{flash.foo}</code> as the value of an attribute in a JSP
 *  page.</p></li>
 *
 *  <li><p>Using the EL API, such as:</p>
 *
 * <p><code><pre>
 * FacesContext context = FacesContext.getCurrentInstance();
 * ValueExpression flashExpression = context.getApplication().
 *    createValueExpression(context.getELContext(), "#{flash.foo}", 
 *                          null, Object.class);
 * flashExpression.setValue(context.getELContext(), "Foo's new value");
 * </pre></code></p>
 *
 *  </li>
 *
 *  <li><p>Using getting the {@link ELFlash} directly, such as:</p>
 *
 * <p><code><pre>
 * Map&lt;String,Object&gt; flash = ELFlash.getFlash();
 * flash.put("foo", "Foo's new value");
 * </pre></code></p>
 *
 *  </li>
 *
 * </ol>
 *
 * <p>The main entry point to this feature is the first one.  This
 * library includes a simple custom tag, <code><a target="_"
 * href="../../../../tlddoc/jsfExt/set.html">jsfExt:set</a></code>, that
 * evaluates an expression and sets its value into another expression.
 * <code>jsfExt:set</code> can be used to store values into the flash
 * from JSP pages, like this:</p>
 *
 * <p><code>&lt;jsfExt:set var="#{flash.foo}" value="fooValue"
 * /&gt;</code></p>
 *
 * <p>or this:</p>
 *
 * <p><code>&lt;jsfExt:set var="#{flash.keep.bar}" value="#{user.name}"
 * /&gt;</code></p>
 *
 * <p>or even this:</p>
 *
 * <p><code><pre>
 * &lt;jsfExt:set var="#{flash.now.baz}" value="#{cookie.userCookie}" /&gt;
 *
 * &lt;h:outputText value="#{flash.now.baz}" /&gt;
 *
 * </pre></code></p>
 *
 * </ul>
 *
 * <p>Related Classes</p>
 *
 * <p>The complete list of classes that make up this feature is</p>
 *
 * 	<ul><code>
 *   
 *  <li><p>FlashELResolver</p></li>
 *
 *  <li><p>{@link ELFlash}</p></li>
 * 
 *  <li><p>{@link FlashPhaseListener}</p></li>
 * 
 *  </code></ul>
 *
 */

public class FlashELResolver extends ELResolver {

    /**
     * <p>Not intended for manual invocation.  Only called by the JSF
     * Runtime.</p>
     */

    public FlashELResolver() {

    }

    // ------------------------------------------------------ Manifest Constants

    private static final String FLASH_VARIABLE_NAME = "flash";

    private static final String FLASH_NOW_VARIABLE_NAME = "now";    
    
    private static final String FLASH_KEEP_VARIABLE_NAME = "keep";      
    
    // ------------------------------------------------ VariableResolver Methods

    /**
     * 
     * <p>Hook into the EL resolution process to introduce the
     * <code>flash</code> implicit object.  If <code>base</code> is
     * <code>null</code> and value is the literal string "flash", return
     * the {@link ELFlash} instance, which is a Map.  If
     * <code>base</code> is an instance of <code>ELFlash</code> and
     * property is the literal string "keep", set a ThreadLocal property
     * that will be inspected by the flash on the next link in the
     * resolution chain and return the <code>ELFlash</code> instance.
     * If <code>base</code> is an instance of <code>ELFlash</code> and
     * <code>property</code> is the literal string "now", return the
     * result of calling <code>getRequestMap( )</code> on the
     * <code>ExternalContext</code> for the <code>FacesContext</code>
     * for this request.  Call <code>setPropertyResolved(true)</code> on
     * the <code>ELContext</code> where appropriate.</p>
     *
     * @throws PropertyNotFoundException if <code>property</code> is
     * <code>null</code>.
     * 
     */

    public Object getValue(ELContext elContext, Object base, Object property) {
        Object result = null;
        Map<String,Object> flash = null;                
        
        if (null == property) {
            String message = " base " + base + " property " + property;            
            throw new PropertyNotFoundException(message);
        }
        
        FacesContext facesContext = 
            (FacesContext) elContext.getContext(FacesContext.class);
        ExternalContext extCtx = facesContext.getExternalContext();
        // try to get the flash from the session.
        flash = ELFlash.getFlash(facesContext, false);
        
        // Deal with getValue(null, "flash").
        if (null == base) {
            // If the property is the implicit object "flash"...
            if (property.toString().equals(FLASH_VARIABLE_NAME)) {
                elContext.setPropertyResolved(true);
                if (null == flash) {
                    // create a new one and store it in the session.
                    flash = ELFlash.getFlash(facesContext, true);
                    extCtx.getSessionMap().put(Constants.FLASH_ATTRIBUTE_NAME,
					       flash);
                }
                result = flash;
                setDoKeep(false);
            }
        }
        // If the base argument is the flash itself...
        else if (base == flash) {
            Object val = null;
            // and the property argument is "keep"...
            if (property.toString().equals(FLASH_KEEP_VARIABLE_NAME)) {
                elContext.setPropertyResolved(true);
                // then this is a request to promote the value
                // "property", which is assumed to have been previously
                // stored in request scope via the "flash.now"
                // expression, to flash scope.
                result = base;
                // Set a flag so the flash itself can look in the request
                // and promote the value from request scope to flash scope.
                setDoKeep(true);
                
            }
            // Otherwise, if base is the flash, and property is "now"...
            else if (property.toString().equals(FLASH_NOW_VARIABLE_NAME)) {
                elContext.setPropertyResolved(true);
                result = extCtx.getRequestMap();
            }
            else {
                result = null;
            }
        }
        
	return result;
    }
    
    /**
     * <p>The <code>ThreadLocal</code> variable used to record the
     * {@link FacesContext} instance for each processing thread.</p>
     */
    private static ThreadLocal instance = new ThreadLocal() {
            protected Object initialValue() { return (Boolean.FALSE); }
        };

    static boolean isDoKeep() {
        return ((Boolean) instance.get()).booleanValue();
    }
    
    static void setDoKeep(boolean newValue) {
        instance.set(newValue ? Boolean.TRUE : Boolean.FALSE);
    }
    
    /**
     * <p>Return the valid <code>Class</code> for a future set
     * operation, which will always be <code>null</code> because sets
     * happen via the <code>MapELResolver</code> operating on the {@link
     * ELFlash} instance as a <code>Map</code>.</p>
     *
     * @throws PropertyNotFoundException if property is <code>null</code>.
     */

    public Class<?> getType(ELContext elContext,
			    Object base,
			    Object property) {
        
        if (null != base) {
            return null;
        }
        if (null == property) {
            String message = " base " + base + " property " + property;            
            throw new PropertyNotFoundException(message);
        }
        if (property.toString().equals(FLASH_VARIABLE_NAME)) {
            elContext.setPropertyResolved(true);
        }        
        
        return null;
    }

    /**
     * <p>This method will throw
     * <code>PropertyNotWritableException</code> if called with a
     * <code>null</code> <code>base</code> and a <code>property</code>
     * value equal to the literal string "flash".  This is because set
     * operations normally go through the <code>MapELResolver</code> via
     * the <code>ELFlash</code> <code>Map</code>.</p>
     *
     * <p>In other words, do not call this method directly to set a
     * value into the flash!  The only way to access the flash is either
     * through JSP or via the EL API.</p>
     *
     * @throws PropertyNotFoundException if <code>base</code> is
     * <code>null</code> and <code>property</code> is <code>null</code>.
     *
     * @throws PropertyNotWritableException if <code>base</code> is
     * <code>null</code> and <code>property</code> is the literal string
     * "flash".
     */

    public void setValue(ELContext elContext,
			 Object base,
			 Object property,
			 Object value) {
        if (null != base) {
            return;
        }
        if (null == property) {
            String message = " base " + base + " property " + property;            
            throw new PropertyNotFoundException(message);
        }
        if (property.toString().equals(FLASH_VARIABLE_NAME)) {
            elContext.setPropertyResolved(true);
            throw new PropertyNotWritableException(property.toString());
        }        

    }

    /**
     * <p>Returns <code>true</code> because write operations take place
     * via the <code>MapELResolver</code> on the actual {@link ELFlash}
     * instance.</p>
     *
     * @throws PropertyNotFoundException if <code>base</code> is
     * <code>null</code> and <code>property</code> is <code>null</code>.
     *
     */

    public boolean isReadOnly(ELContext elContext,
			      Object base,
			      Object property) {
        if (base != null) {
            return false;
        }
        if (property == null) {
            String message = " base " + base + " property " + property;            
            throw new PropertyNotFoundException(message);
        }
        
        if (property.toString().equals(FLASH_VARIABLE_NAME)) {
            elContext.setPropertyResolved(true);
            return true;
        }        
        
	return false;
    }

    /**
     * <p>Returns an iterator of <code>FeatureDescriptors</code> for the
     * current contents of the flash.</p>
     */

    public Iterator<FeatureDescriptor> getFeatureDescriptors(ELContext elContext,
            Object base) {
        if (null != base) {
            return null;
        }
        Iterator result = null;
        Map flash = null;
        FacesContext facesContext = 
            (FacesContext) elContext.getContext(FacesContext.class);
        ExternalContext extCtx = facesContext.getExternalContext();

        if (null != (flash = (Map) 
            extCtx.getSessionMap().get(Constants.FLASH_ATTRIBUTE_NAME))) {
            Iterator<Map.Entry<String, Object>> iter = flash.entrySet().iterator();
            Map.Entry<String, Object> cur = null;
            ArrayList<FeatureDescriptor> fds = null;
            FeatureDescriptor fd = null;
            if (iter.hasNext()) {
                fds = new ArrayList<FeatureDescriptor>(flash.size());
                while (iter.hasNext()) {
                    cur = iter.next();
                    fd = new FeatureDescriptor();
                    fd.setName(cur.getKey());
                    fds.add(fd);
                }
                result = fds.iterator();
            }
        }
        
        return result;
    }

    /**
     * <p>If <code>base</code> is non-<code>null</code> and is the
     * literal string "flash", return <code>Object.class</code>.</p>
     */ 
    
    public Class<?> getCommonPropertyType(ELContext context,
                                          Object base) {
        Class<?> result = null;
        if (null != base) {
            if (FLASH_VARIABLE_NAME.equals(base.toString())) {
                result = Object.class;
            }
        }
        return result;
    }
    
    
}
