(function(){var window=this;var d=this,aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b};var N=function(a){N[" "](a);return a};N[" "]=function(){};var e=function(a,b){if(!(1E-4>Math.random())){var c=Math.random();if(c<b){try{var O=new Uint32Array(1);d.crypto.getRandomValues(O);c=O[0]/65536/65536}catch(Y){c=Math.random()}return a[Math.floor(c*a.length)]}}return null};var g=function(){return d.googletag||(d.googletag={})};var f={1:"pagead2.googlesyndication.com",2:"pubads.g.doubleclick.net",3:"securepubads.g.doubleclick.net",7:.02,10:0,13:1500,16:.01,17:1,20:0,23:.001,24:200,27:.01,28:0,29:.01,33:"pagead2.googlesyndication.com",34:1,37:.01,38:.001,47:1E-4,53:"",54:0,57:.05,58:1,60:0,63:0,65:.01,66:1E-5,67:0,68:0,69:.99,71:.05,73:.001,74:.05,75:"",76:"",77:.001,78:.01,88:1,79:.95,81:.001,83:1E-4,84:.001,85:.01,87:.2,89:.995,90:.01,91:.01,92:.01,93:.05,94:.01,95:.05,96:.995,97:.001,98:.05,99:.01,101:.001,103:.01,104:"/pagead/js/rum.js",105:0,106:"1-0-10",107:"1-0-10",110:.001,112:0,113:1,114:.01,115:.01,116:.001,117:.01,118:.05,123:.01,120:.05,121:.001,124:.01,122:.001,125:.01,126:.01,127:.001,128:1,129:.01,130:1,131:"",132:.01,133:.01,134:.01,135:0,136:1,137:0,139:"21060621",140:"21060622",149:"21060713",138:"",143:.001,144:.001,141:.95,142:.01,145:.001,151:.001,146:.005,147:.01,150:""};f[6]=function(a,b){try{for(var c=null;c!=a;c=a,a=a.parent)switch(a.location.protocol){case "https:":return!0;case "file:":return!!b;case "http:":return!1}}catch(O){}return!0}(window);f[49]=(new Date).getTime();f[36]=/^true$/.test(!1);f[46]=/^true$/.test(!1);f[148]=/^true$/.test(!1);var q=function(){var a={},b;for(b in f)a[b]=f[b];this.a=a};q.prototype.get=function(a){return this.a[a]};q.prototype.set=function(a,b){this.a[a]=b};q.a=void 0;q.getInstance=function(){return q.a?q.a:q.a=new q};var r=q.getInstance().a,t=g(),u=t._vars_,m;for(m in u)r[m]=u[m];t._vars_=r;var ca=function(){return"145"},h=g();h.hasOwnProperty("getVersion")||(h.getVersion=ca);var k=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}};var l=/^\.google\.(?:com?\.)?[a-z]{2,3}$/,n=function(){var a=d.googleToken=d.googleToken||{},b=+new Date;a[1]&&a[3]>b&&0<a[2]||(a[1]="",a[2]=-1,a[3]=-1,a[4]="")},p=function(){n();return d.googleToken[1]},z=function(){n();n();return d.googleToken[3]>=+new Date},A=function(){var a=d.googleIMState=d.googleIMState||{};l.test(a[1])||(a[1]=".google.com");0!=a[2]&&(a[2]=1);"boolean"==typeof a[3]||(a[3]=!0);"boolean"==typeof a[4]||(a[4]=!1);"array"==aa(a[5])||(a[5]=[])},B=function(){A();return d.googleIMState[1]},E=function(){A();if(!d.googleIMState[4]){A();d.googleIMState[4]=!0;var a=d.document;A();if(0!=d.googleIMState[2]||"complete"==a.readyState||"loaded"==a.readyState||d.currentScript&&d.currentScript.async){var b=a.createElement("script");b.type="text/javascript";b.a=function(){return d.processGoogleToken({})};b.src=D();try{(a.head||a.body||a.documentElement).appendChild(b)}catch(O){}}else{b=D().replace(/[\W]/g,function(a){return"&#"+a.charCodeAt()+";"});var c=N("script");a.write("<"+c+' src="'+b+'" onerror="processGoogleToken({})"'+("></"+c+">"))}d.setTimeout(function(){return d.processGoogleToken({})},1E3)}},K=function(){d.processGoogleToken||(d.processGoogleToken=function(a){var b=a;b=void 0===b?{}:b;a=b.token||"";var O=b.altDomain||"",Y=parseInt(b.freshLifetimeSecs||"",10)||3600,T=parseInt(b.validLifetimeSecs||"",10)||86400;b=b["1p_jar"]||"";A();d.googleIMState[4]=!1;if(!a&&O&&l.test(O)&&2>=++da)A(),l.test(O)&&(d.googleIMState[1]=O),E();else{if(a&&"string"==typeof a&&0<Y&&0<T&&"string"==typeof b){O=+new Date;var C=d.googleToken=d.googleToken||{};C[1]=a;C[2]=O+1E3*Y;C[3]=O+1E3*T;C[4]=b;n()}A();a=d.googleIMState[5];for(Y=0;Y<a.length;Y++)try{(0,a[Y])()}catch(oa){}A();d.googleIMState[5]=[]}});var a;if(a=z())n(),a=d.googleToken[2]>=+new Date;a||E()},da=0,D=function(){A();var a="https://"+(d.googleIMState[3]?"www"+B()+"/generate_204":"adservice"+B()+"/adsid/integrator.js"),b=["domain="+d.location.hostname];z()&&b.push("adsid="+p());return a+"?"+encodeURIComponent(b.join("&"))};var ba=N("partner.googleadservices.com");N("www.googletagservices.com");var w="",x="",F=function(a,b){return k(function(){return b?e(a,a.length*b):""})},v=F(["21060815","21060816","21060817","21060818","21060819"],q.getInstance().get(146)),y=F(["21060813","21060814"],q.getInstance().get(147)),G=q.getInstance().get(46)&&!q.getInstance().get(6);w=G?"http:":"https:";x=q.getInstance().get(G?2:3);var H=g(),I=H.fifWin||window,J=I.document,ea=[],M=g();M.hasOwnProperty("cmd")||(M.cmd=ea);if(H.evalScripts)H.evalScripts();else{var L=J.currentScript,P;var Q=q.getInstance(),R=Q.get(76);if(R)P=R;else{var fa=!!Q.get(131),S="",U,ha=x,ia=w;if(fa)S="?sf=1",U="145";else if(v()){var X=v();Q.set(75,X);S="?eid="+X;U="21060815"==X?"142":"104";Q.set(37,.1);"21060816"==X&&Q.set(67,1);"21060816"!=X&&"21060817"!=X&&"21060818"!=X||Q.set(68,1);if("21060818"==X||"21060819"==X)ia=Q.get(6)?"https:":"http:",ha=ba}else if(y()){var ma=y();Q.set(75,ma);S="?v=144";U="21060813"==ma?"142":"144";Q.set(23,0);Q.set(29,0);Q.set(37,0);Q.set(38,0);Q.set(10,0);Q.set(81,0);Q.set(103,0);Q.set(113,0);Q.set(121,0);Q.set(122,0);Q.set(134,0);Q.set(135,0);Q.set(143,0);Q.set(58,0);Q.set(66,0);Q.set(73,0)}R=ia+"//"+ha+"/gpt/pubads_impl_"+(U||"145")+".js"+S;q.getInstance().set(76,R);P=R}var ja=P;-1!=(window.navigator&&window.navigator.userAgent||"").indexOf("iPhone")&&q.getInstance().set(79,0);var V=!1;if(!v())try{var ka=q.getInstance().get(150);ka&&(A(),l.test(ka)&&(d.googleIMState[1]=ka));var la=[q.getInstance().get(139),q.getInstance().get(140),q.getInstance().get(149)],W=e(la,la.length*q.getInstance().get(137));W&&q.getInstance().set(138,W);switch(W){case q.getInstance().get(140):V=!0;A();d.googleIMState[3]=!0;break;case q.getInstance().get(149):V=!0,A(),d.googleIMState[3]=!1}}catch(a){}if(!y()){var ra=I.performance;if(ra&&ra.now){var sa=ra.now();(I.google_js_reporting_queue=I.google_js_reporting_queue||[]).push({label:"1",type:9,value:sa,uniqueId:"rt."+Math.random()})}}if(!("complete"==J.readyState||"loaded"==J.readyState||L&&L.async)){var na="gpt-impl-"+Math.random();try{V&&(A(),d.googleIMState[2]=0,K()),J.write('<script id="'+na+'" src="'+ja+'">\x3c/script>'),H._syncTagged_=!0}catch(a){}J.getElementById(na)&&(H._loadStarted_=!0)}if(!H._loadStarted_){V&&(A(),d.googleIMState[2]=1,K());var Z=J.createElement("script");Z.src=ja;Z.async=!0;(J.head||J.body||J.documentElement).appendChild(Z);H._loadStarted_=!0}};}).call(this.googletag&&googletag.fifWin?googletag.fifWin.parent:this)