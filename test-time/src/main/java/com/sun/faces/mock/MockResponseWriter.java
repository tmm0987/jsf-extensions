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
 * $Id: MockResponseWriter.java,v 1.1 2005/10/18 17:48:02 edburns Exp $
 */

package com.sun.faces.mock;


import java.io.IOException;
import java.io.Writer;
import javax.faces.context.ResponseWriter;
import javax.faces.component.UIComponent;


public class MockResponseWriter extends ResponseWriter {


    public MockResponseWriter(Writer writer, String encoding) {
        this.writer = writer;
        this.encoding = encoding;
    }


    private Writer writer;
    private String encoding;


    // ---------------------------------------------------------- Writer Methods


    public void close() throws IOException {
        writer.close();
    }


    public void flush() throws IOException {
        writer.flush();
    }


    public void write(char c) throws IOException {
        writer.write(c);
    }


    public void write(char cbuf[], int off, int len) throws IOException {
        writer.write(cbuf, off, len);
    }


    public void write(int c) throws IOException {
        writer.write(c);
    }


    public void write(String s) throws IOException {
        writer.write(s);
    }


    public void write(String s, int off, int len) throws IOException {
        writer.write(s, off, len);
    }


    // --------------------------------------------------- ResponseWrter Methods

    public String getContentType() {
        return "text/html";
    }

    public String getCharacterEncoding() {
        return (this.encoding);
    }


    public void startDocument() throws IOException {
        throw new UnsupportedOperationException();
    }


    public void endDocument() throws IOException {
        throw new UnsupportedOperationException();
    }


    public void startElement(String name, 
			     UIComponent component) throws IOException {
        throw new UnsupportedOperationException();
    }


    public void endElement(String name) throws IOException {
        throw new UnsupportedOperationException();
    }

    public void writeAttribute(String name, Object value, 
			       String componentPropertyName) throws IOException {
        throw new UnsupportedOperationException();
    }


    public void writeURIAttribute(String name, Object value, String componentPropertyName) throws IOException {
        throw new UnsupportedOperationException();
    }


    public void writeComment(Object comment) throws IOException {
        throw new UnsupportedOperationException();
    }


    public void writeText(Object text, String componentProperty) throws IOException {
        throw new UnsupportedOperationException();
    }

    public void writeText(char text[], int off, int len) throws IOException {
        throw new UnsupportedOperationException();
    }


    public ResponseWriter cloneWithWriter(Writer writer) {
        throw new UnsupportedOperationException();
    }


}
