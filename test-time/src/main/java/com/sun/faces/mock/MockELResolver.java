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
 * $Id: MockELResolver.java,v 1.1 2005/10/18 17:47:53 edburns Exp $
 */

package com.sun.faces.mock;


import java.util.Iterator;
import javax.faces.context.FacesContext;
import javax.el.ELResolver;
import javax.el.ELContext;
import javax.el.ELException;

/**
 * <p>Mock implementation of <code>ELResolver</code> that supports a
 * limited subset of expression evaluation functionality:</p>
 *
 * <ul>
 * <li>Recognizes <code>applicationScope</code>, <code>requestScope</code>,
 *     and <code>sessionScope</code> implicit names.</li>
 * <li>Searches in ascending scopes for non-reserved names.</li>
 * </ul>
 */

public class MockELResolver extends ELResolver {

    private MockVariableResolver variableResolver = null;

    private MockPropertyResolver propertyResolved = null;
   


    // ------------------------------------------------------------ Constructors
    public MockELResolver() {
	variableResolver = new MockVariableResolver();
	propertyResolved = new MockPropertyResolver();
    }

    public Object getValue(ELContext context, Object base, Object property)
        throws ELException {
	Object result = null;
	FacesContext facesContext = (FacesContext) 
	    context.getContext(FacesContext.class);
	
	if (null == base) {
	    String name = (null != property) ? property.toString() : null;
	    try {
		result = variableResolver.resolveVariable(facesContext, name);
	    }
	    catch (Throwable e) {
		throw new ELException(e);
	    }
	}
	else {
	    try {
		result = propertyResolved.getValue(base, property);
	    }
	    catch (Throwable e) {
		throw new ELException(e);
	    }
	}

	return result;
    }

    public Class getType(ELContext context, Object base, Object property)
        throws ELException {
	Class result = null;

	return result;
    }

    public void setValue(ELContext context, Object base, Object property,
			 Object value) throws ELException {
    }

    public boolean isReadOnly(ELContext context, Object base, Object property)
        throws ELException {
	boolean result = false;
	return false;
    }

    public Iterator getFeatureDescriptors(ELContext context, Object base) {
	return null;
    }

    public Class getCommonPropertyType(ELContext context, Object base) {
	Class result = null;
	
	return result;
    }
    
   



}
