var __existingDynaFaces__=null;if(typeof DynaFaces!="undefined"){__existingDynaFaces__=DynaFaces}var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(D){for(var A=0;A<D.length;A++){var B=D[A].string;var C=D[A].prop;this.versionSearchString=D[A].versionSearch||D[A].identity;if(B){if(B.indexOf(D[A].subString)!=-1){return D[A].identity}}else{if(C){return D[A].identity}}}},searchVersion:function(B){var A=B.indexOf(this.versionSearchString);if(A==-1){return }return parseFloat(B.substring(A+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init();var DynaFaces=new Object();DynaFaces.gFacesPrefix="com.sun.faces.avatar.";DynaFaces.gPartial=DynaFaces.gFacesPrefix+"Partial";DynaFaces.gExecute=DynaFaces.gFacesPrefix+"Execute";DynaFaces.gRender=DynaFaces.gFacesPrefix+"Render";DynaFaces.gViewRoot=DynaFaces.gFacesPrefix+"ViewRoot";DynaFaces.gFacesEvent=DynaFaces.gFacesPrefix+"FacesEvent";DynaFaces.gMethodName=DynaFaces.gFacesPrefix+"MethodName";DynaFaces.gViewState="javax.faces.ViewState";DynaFaces.gGlobalScope=this;DynaFaces.gSpecialChars={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};DynaFaces.gJSON={array:function(B){var D=["["],A,G,F,C=B.length,E;for(F=0;F<C;F+=1){E=B[F];G=DynaFaces.gJSON[typeof E];if(G){E=G(E);if(typeof E=="string"){if(A){D[D.length]=","}D[D.length]=E;A=true}}}D[D.length]="]";return D.join("")},"boolean":function(A){return String(A)},"null":function(A){return"null"},number:function(A){return isFinite(A)?String(A):"null"},object:function(B){if(B){if(B instanceof Array){return DynaFaces.gJSON.array(B)}var C=["{"],A,F,E,D;for(E in B){D=B[E];F=DynaFaces.gJSON[typeof D];if(F){D=F(D);if(typeof D=="string"){if(A){C[C.length]=","}C.push(DynaFaces.gJSON.string(E),":",D);A=true}}}C[C.length]="}";return C.join("")}return"null"},string:function(A){if(/[\"\\\x00-\x1f]/.test(A)){A=A.replace(/([\x00-\x1f\\\"])/g,function(C,B){var D=DynaFaces.gSpecialChars[B];if(D){return D}D=B.charCodeAt();return"\\u00"+Math.floor(D/16).toString(16)+(D%16).toString(16)})}return"\""+A+"\""}};DynaFaces.trim=function trim(C){var A=null;if(null!=C){var B=C.replace(/^\s+/g,"");A=B.replace(/\s+$/g,"")}return A};DynaFaces.reduce=function reduce(A){return A.length>1?A:A[0]};DynaFaces.$=function(){var C=[],B;for(var A=0;A<arguments.length;A++){B=arguments[A];if(typeof B=="string"){B=document.getElementById(B)}C.push(B)}return DynaFaces.reduce(C)};DynaFaces.elementReplace=function elementReplace(G,J,A){var I=G.parentNode;var L=document.createElement(J);var O=null;L.id=G.id;if(-1!=G.tagName.toLowerCase().indexOf("head")&&G.tagName.length==4){if(-1==BrowserDetect.browser.indexOf("Firefox")){return }if(-1!=A.indexOf("link")){var H=new RegExp("< *link.*>","gi");var E;while(null!=(E=H.exec(A))){A=A.substring(0,E.index)+A.substring(H.lastIndex);H.lastIndex=0}}if(-1!=A.indexOf("style")){var B=new RegExp("< *style.*>","gi"),C=new RegExp("< */ *style.*>","gi");var D,N;while(null!=(D=B.exec(A))){N=C.exec(A);A=A.substring(0,D.index)+A.substring(B.lastIndex);B.lastIndex=0}}L.innerHTML=A;var F,K,M;K=G.getElementsByTagName("link");if(K){for(F=0;F<K.length;F++){L.appendChild(K[F].cloneNode(true))}}M=G.getElementsByTagName("style");if(M){for(F=0;F<M.length;F++){L.appendChild(M[F].cloneNode(true))}}}else{L.innerHTML=A}O=L;I.replaceChild(L,G);return O};DynaFaces.replace=function replace(M,G){if(-1!=M.indexOf(DynaFaces.gViewRoot)){var R=new RegExp("< *html.*>","gi"),I=new RegExp("< */ *html.*>","gi"),E=new RegExp("< *head.*>","gi"),B=new RegExp("< */ *head.*>","gi"),C=new RegExp("< *body.*>","gi"),D=new RegExp("< */ *body.*>","gi"),Q,U,L,J,P,V;var A=null,H=null;var O=document.getElementsByTagName("body")[0];if(null!=(Q=R.exec(G))){if(null!=(U=I.exec(G))){G=G.substring(R.lastIndex,U.index)}else{G=G.substring(R.lastIndex)}}if(null!=(L=E.exec(G))){if(null!=(J=B.exec(G))){A=G.substring(E.lastIndex,J.index)}else{A=G.substring(E.lastIndex)}var F=document.getElementsByTagName("head")[0];if(F){this.elementReplace(F,"head",A)}}if(null!=(P=C.exec(G))){if(null!=(V=D.exec(G))){H=G.substring(C.lastIndex,V.index)}else{H=G.substring(C.lastIndex)}N=this.elementReplace(O,"body",H)}if(!H){N=this.elementReplace(O,"body",G)}}else{var T=DynaFaces.$(M);if(!T){alert(M+" not found")}var K=T.parentNode;var S=document.createElement("div");var N=null;S.id=T.id;S.innerHTML=DynaFaces.trim(G);N=S.firstChild;K.replaceChild(S.firstChild,T)}return N};DynaFaces.serialize=function serialize(A){var B=(A.xml)?this.serializeIE(A):this.serializeMozilla(A);return B};DynaFaces.serializeIE=function serializeIE(A){return A.xml};DynaFaces.serializeMozilla=function serializeMozilla(A){return new XMLSerializer().serializeToString(A)};DynaFaces.firstElement=function firstElement(A){var B=A.firstChild;while(B&&B.nodeType!=1){B=B.nextSibling}return B};DynaFaces.getForm=function getForm(B){if(B){var A=DynaFaces.$(B);while(A&&A.tagName&&A.tagName.toLowerCase()!="form"){if(A.form){return A.form}if(A.parentNode){A=A.parentNode}else{A=null}}if(A){return A}}return document.forms[0]};var __existingFaces__=null;if(typeof Faces!="undefined"){__existingFaces__=Faces}var Faces={initialized:false,create:function(){return function(){if(Faces.initialized){this.initialize.apply(this,arguments)}else{var A=arguments;var B=this;Event.observe(window,"load",function(){Faces.initialized=true;B.initialize.apply(B,A)},false)}}},toArray:function(A,B){if(typeof A=="string"){return A.split((B)?B:" ").map(function(C){return DynaFaces.trim(C)})}return A},toString:function(){return"Faces Agent v. 1.0"}};DynaFaces.ViewState={setOptions:function(A){this.options={};for(prop in A){this.options[prop]=prop}},initialize:function(C,K){this.setOptions(K);var D=typeof this.options.collectPostData;var I=typeof this.options.inputs;if(("void"!=D&&"undefined"!=D)||("void"!=I&&"undefined"!=I)){var G=DynaFaces.$(DynaFaces.gViewState);J=G.tagName.toLowerCase();B=Form.Element.Serializers[J](G);if(B&&B[0].length!=0){if(B[1].constructor!=Array){B[1]=[B[1]]}if(this[B[0]]){this[B[0]]=this[B[0]].concat(B[1])}else{this[B[0]]=B[1]}}return }var H=Form.getElements(DynaFaces.$(C));var J,B;for(var F=0;F<H.length;F++){if(Faces.ViewState.Ignore.indexOf(H[F].type)==-1){J=H[F].tagName.toLowerCase();B=Form.Element.Serializers[J](H[F]);if(B&&B[0].length!=0){if(B[1].constructor!=Array){B[1]=[B[1]]}if(this[B[0]]&&-1==DynaFaces.gViewState.indexOf(B[0])){this[B[0]]=this[B[0]].concat(B[1])}else{this[B[0]]=B[1]}}}}var A=this.options.source;var E=DynaFaces.$(A);if(E&&E.form){this[E.name]=E.value||"x"}else{this[A]=A}},toQueryString:function(){var F=new Array();var E,D,G,C;if(this.options.inputs){if(this[DynaFaces.gViewState]){G=encodeURIComponent(DynaFaces.gViewState);C=encodeURIComponent(this[DynaFaces.gViewState]);F.push(G+"="+C)}var A=this.options.inputs.split(",");if(A){for(E=0;E<A.length;E++){if(this[A[E]]){G=encodeURIComponent(A[E]);if(this[A[E]].constructor==Array){for(D=0;D<this[A[E]].length;D++){C=this[A[E]][D];if(null!=C){C=encodeURIComponent(C);F.push(G+"="+C)}}}else{C=encodeURIComponent(this[A[E]]);F.push(G+"="+C)}}else{var B=document.getElementById(A[E]);if(B){G=A[E];C=encodeURIComponent(B.value||"");F.push(G+"="+C)}}}}}else{for(property in this){if(this[property]){if(typeof this[property]=="function"){continue}G=encodeURIComponent(property);if(this[property].constructor==Array){for(D=0;D<this[property].length;D++){C=this[property][D];if(null!=C){C=encodeURIComponent(C);F.push(G+"="+C)}}}else{C=encodeURIComponent(this[property]);F.push(G+"="+C)}}}}if(this.options.parameters){F.push(this.options.parameters)}if(typeof this.options.collectPostData=="function"){this.options.collectPostData(this.options.ajaxZone,this.options.source,F)}else{if(typeof DynaFaces.gGlobalScope[this.options.collectPostData]=="function"){DynaFaces.gGlobalScope[this.options.collectPostData](this.options.ajaxZone,this.options.source,F)}}if(this.options.action){G=(this.options.ajaxZone)?this.options.ajaxZone.id:this.options.source.id||this.options.source.name;F.push(encodeURIComponent(G)+"="+encodeURIComponent(this.options.action))}return F.join("&")}};DynaFaces.ViewState.CommandType=["button","submit","reset"];DynaFaces.ViewState.Ignore=["button","submit","reset","image"];Faces.ViewState=Class.create();Faces.ViewState.CommandType=["button","submit","reset"];Faces.ViewState.Ignore=["button","submit","reset","image"];Faces.ViewState.prototype={setOptions:function(A){this.options={};Object.extend(this.options,A||{})},initialize:function(C,K){this.setOptions(K);var D=typeof this.options.collectPostData;var I=typeof this.options.inputs;if(("void"!=D&&"undefined"!=D)||("void"!=I&&"undefined"!=I)){var G=DynaFaces.$(DynaFaces.gViewState);J=G.tagName.toLowerCase();B=Form.Element.Serializers[J](G);if(B&&B[0].length!=0){if(B[1].constructor!=Array){B[1]=[B[1]]}if(this[B[0]]){this[B[0]]=this[B[0]].concat(B[1])}else{this[B[0]]=B[1]}}return }var H=Form.getElements(DynaFaces.$(C));var J,B;for(var F=0;F<H.length;F++){if(Faces.ViewState.Ignore.indexOf(H[F].type)==-1){J=H[F].tagName.toLowerCase();B=Form.Element.Serializers[J](H[F]);if(B&&B[0].length!=0){if(B[1].constructor!=Array){B[1]=[B[1]]}if(this[B[0]]&&-1==DynaFaces.gViewState.indexOf(B[0])){this[B[0]]=this[B[0]].concat(B[1])}else{this[B[0]]=B[1]}}}}var A=this.options.source;var E=DynaFaces.$(A);if(E&&E.form){this[E.name]=E.value||"x"}else{this[A]=A}},toQueryString:function(){var F=new Array();var E,D,G,C;if(this.options.inputs){if(this[DynaFaces.gViewState]){G=encodeURIComponent(DynaFaces.gViewState);C=encodeURIComponent(this[DynaFaces.gViewState]);F.push(G+"="+C)}var A=this.options.inputs.split(",");if(A){for(E=0;E<A.length;E++){if(this[A[E]]){G=encodeURIComponent(A[E]);if(this[A[E]].constructor==Array){for(D=0;D<this[A[E]].length;D++){C=this[A[E]][D];if(null!=C){C=encodeURIComponent(C);F.push(G+"="+C)}}}else{C=encodeURIComponent(this[A[E]]);F.push(G+"="+C)}}else{var B=document.getElementById(A[E]);if(B){G=A[E];C=encodeURIComponent(B.value||"");F.push(G+"="+C)}}}}}else{for(property in this){if(this[property]){if(typeof this[property]=="function"){continue}G=encodeURIComponent(property);if(this[property].constructor==Array){for(D=0;D<this[property].length;D++){C=this[property][D];if(null!=C){C=encodeURIComponent(C);F.push(G+"="+C)}}}else{C=encodeURIComponent(this[property]);F.push(G+"="+C)}}}}if(this.options.parameters){F.push(this.options.parameters)}if(typeof this.options.collectPostData=="function"){this.options.collectPostData(this.options.ajaxZone,this.options.source,F)}else{if(typeof DynaFaces.gGlobalScope[this.options.collectPostData]=="function"){DynaFaces.gGlobalScope[this.options.collectPostData](this.options.ajaxZone,this.options.source,F)}}if(this.options.action){G=(this.options.ajaxZone)?this.options.ajaxZone.id:this.options.source.id||this.options.source.name;F.push(encodeURIComponent(G)+"="+encodeURIComponent(this.options.action))}return F.join("&")}};Faces.Event=Class.create();Object.extend(Object.extend(Faces.Event.prototype,Ajax.Request.prototype),{initialize:function(A,I){this.transport=Ajax.getTransport();this.setOptions(I);this.options.method="post";this.form=DynaFaces.getForm(A);this.url=this.form.action;var C=null;var G=new Object();Object.extend(G,this.options);G.source=A;G.render=null;G.execute=null;G.asynchronous=null;G.contentType=null;G.method=null;C=new Faces.ViewState(this.form,G);C.options.parameters=this.options.parameters;this.options.requestHeaders=this.options.requestHeaders||[];this.options.requestHeaders.push(DynaFaces.gPartial);if(this.options.immediate){this.options.requestHeaders.push("immediate")}else{this.options.requestHeaders.push("true")}if(this.options.methodName){var F=DynaFaces.$(A).id||DynaFaces.$(A).name;F+=","+this.options.methodName;if(this.options.phaseId){F+=","+this.options.phaseId}this.options.requestHeaders.push(DynaFaces.gMethodName);this.options.requestHeaders.push(F)}if(this.options.execute){this.options.requestHeaders.push(DynaFaces.gExecute);this.options.requestHeaders.push(Faces.toArray(this.options.execute,",").join(","))}if(this.options.render){this.options.requestHeaders.push(DynaFaces.gRender);this.options.requestHeaders.push(Faces.toArray(this.options.render,",").join(","))}if(this.options.xjson){var E=DynaFaces.gJSON.object(this.options.xjson);this.options.requestHeaders.push("X-JSON");this.options.requestHeaders.push(E)}if(typeof DynaFaces!="undefined"){if(0<DynaFaces._eventQueue.length){this.options.requestHeaders.push(DynaFaces.gFacesEvent);var D=new Array();for(i=0;i<DynaFaces._eventQueue.length;i++){D.push(DynaFaces._eventQueue[i].toString())}var H=D.join(";");this.options.requestHeaders.push(H);DynaFaces._eventQueue=new Array()}}if(this.options.postBody){this.options.postBody=this.options.postBody+"&"+C.toQueryString()}else{this.options.postBody=C.toQueryString()}var B=this.options.onComplete;this.options.onComplete=(function(K,J){this.renderView(J);if(B){B(K,I)}else{if(this.doEvalResponse){this.evalResponse()}}}).bind(this);if(this.options.onException==null){this.options.onException=this.onException}this.request(this.url)},renderView:function(H){var G=this.transport.responseXML;var B,J,M,L;if(null==G||typeof G=="undefined"){M=this.transport.responseText;if(null!=M&&typeof M!="undefined"){M.evalScripts()}return }var I=G.getElementsByTagName("components")[0];var C=I.getElementsByTagName("render");for(var F=0;F<C.length;F++){B=C[F].getAttribute("id");M="";for(var E=0;E<C[F].firstChild.childNodes.length;E++){J=C[F].firstChild.childNodes[E];M+=J.text||J.data}L=M.stripScripts();this.doEvalResponse=false;if(this.options.replaceElement){var K=null;if((K=typeof this.options.replaceElement)!="undefined"){if(K=="function"){this.options.replaceElement(B,M,this.options.closure,H)}else{if(typeof DynaFaces.gGlobalScope[this.options.replaceElement]=="function"){DynaFaces.gGlobalScope[this.options.replaceElement](B,M,this.options.closure,H)}}}}else{DynaFaces.replace(B,L)}if(this.options.postReplace){var K=null;if((K=typeof this.options.postReplace)!="undefined"){if(K=="function"){this.options.postReplace(DynaFaces.$(B),M,this.options.closure,H)}else{if(typeof DynaFaces.gGlobalScope[this.options.postReplace]=="function"){DynaFaces.gGlobalScope[this.options.postReplace](DynaFaces.$(B),M,this.options.closure,H)}}}}else{M.evalScripts()}}var A=A||G.getElementsByTagName("state")[0].firstChild;if(A){var D=DynaFaces.$(DynaFaces.gViewState);if(D){D.value=A.text||A.data}}},evalResponse:function(){if(this.responseIsSuccess()){var B=this.transport.responseText;if(B){try{B.evalScripts()}catch(A){}}}},onException:function(B,A){throw A}});Faces.DeferredEvent=Faces.create();Faces.DeferredEvent.prototype={initialize:function(D,C,B){var C=(C)||"click";var B=B;var A=function(E){new Faces.Event(D,B);if(Faces.ViewState.CommandType.indexOf(D.type)!=-1){Event.stop(E)}return false};if(typeof D.facesObserver=="undefined"){D.facesObserver=A}else{Event.stopObserving(D,C,D.facesObserver,true)}Event.observe(D,C,A,true)}};Faces.Observer=Faces.create();Faces.Observer.prototype={initialize:function(C,I,J){this.options={};Object.extend(this.options,J||{});var A=this.options.source;var H=function(K){new Faces.Event((A||Event.element(K)),J);Event.stop(K);return false};var B=I||"click";var F=Faces.toArray(C);var G=Faces.toArray(I);for(var E=0;E<F.length;E++){for(var D=0;D<G.length;D++){Event.observe(DynaFaces.$(F[E]),G[D],H,true)}}}};DynaFaces._eventQueue=new Array();DynaFaces.fireAjaxTransaction=function(B,A){new Faces.Event(B,A);return false};DynaFaces.installDeferredAjaxTransaction=function(C,B,A){new Faces.DeferredEvent(C,B,A);return false};DynaFaces.PhaseId={ANY_PHASE:"ANY_PHASE",RESTORE_VIEW:"RESTORE_VIEW",APPLY_REQUEST_VALUES:"APPLY_REQUEST_VALUES",PROCESS_VALIDATIONS:"PROCESS_VALIDATIONS",UPDATE_MODEL_VALUES:"UPDATE_MODEL_VALUES",INVOKE_APPLICATION:"INVOKE_APPLICATION",RENDER_RESPONSE:"RENDER_RESPONSE"};DynaFaces.PhaseId.values=new Array();DynaFaces.PhaseId.values[0]=DynaFaces.PhaseId.ANY_PHASE;DynaFaces.PhaseId.values[1]=DynaFaces.PhaseId.RESTORE_VIEW;DynaFaces.PhaseId.values[2]=DynaFaces.PhaseId.APPLY_REQUEST_VALUES;DynaFaces.PhaseId.values[3]=DynaFaces.PhaseId.PROCESS_VALIDATIONS;DynaFaces.PhaseId.values[4]=DynaFaces.PhaseId.UPDATE_MODEL_VALUES;DynaFaces.PhaseId.values[5]=DynaFaces.PhaseId.INVOKE_APPLICATION;DynaFaces.PhaseId.values[6]=DynaFaces.PhaseId.RENDER_RESPONSE;DynaFaces.FacesEvent=function(C,A,B){this.eventId=C;this.clientId=A;this.phaseId=B};DynaFaces.FacesEvent.prototype.toString=function(){return this.eventId+","+this.clientId+","+this.phaseId+",source"};DynaFaces.ValueChangeEvent=function(A,C,B,D){this.base=DynaFaces.FacesEvent;this.base("ValueChangeEvent",A,C);this.oldValue=B;this.newValue=D};DynaFaces.ValueChangeEvent.prototype=new DynaFaces.FacesEvent;DynaFaces.ValueChangeEvent.prototype.toString=function(){return(this.eventId+","+this.clientId+","+this.phaseId+",source,"+this.oldValue+","+this.newValue)};DynaFaces.ActionEvent=function(A,B){this.base=DynaFaces.FacesEvent;this.base("ActionEvent",A,B)};DynaFaces.ActionEvent.prototype=new DynaFaces.FacesEvent;DynaFaces.queueFacesEvent=function(A){DynaFaces._eventQueue.push(A)};if(__existingDynaFaces__!=null){DynaFaces=__existingDynaFaces__;__existingDynaFaces__=null}if(__existingFaces__!=null){Faces=__existingFaces__;__existingFaces__=null}