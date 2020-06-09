Java.perform(function() {
 try { 
		
		console.log('')
		console.log('===')
		console.log('* Injecting hooks into common certificate pinning methods *')
		console.log('===')
		
		var X509TrustManager = Java.use('javax.net.ssl.X509TrustManager');
		var SSLContext = Java.use('javax.net.ssl.SSLContext');
		
		// build fake trust manager
		var TrustManager = Java.registerClass({
		    name: 'com.sensepost.test.TrustManager',
		    implements: [X509TrustManager],
		    methods: {
		        checkClientTrusted: function (chain, authType) {
		        },
		        checkServerTrusted: function (chain, authType) {
		        },
		        getAcceptedIssuers: function () {
		            return [];
		        }
		    }
		});
		
		// pass our own custom trust manager through when requested
		var TrustManagers = [TrustManager.$new()];
		var SSLContext_init = SSLContext.init.overload(
		    '[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom'
		);
		SSLContext_init.implementation = function (keyManager, trustManager, secureRandom) {
		    
		
		    console.log('! Intercepted trustmanager request');
		    SSLContext_init.call(this, keyManager, TrustManagers, secureRandom);
		};
		
		console.log('* Setup custom trust manager');
		
		// okhttp3
		try {
		    var CertificatePinner = Java.use('okhttp3.CertificatePinner');
		    CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function (str) {
		        console.log('! Intercepted okhttp3: ' + str);
		        return;
		    };
		
		    console.log('* Setup okhttp3 pinning')
		} catch(err) {
		    console.log('* Unable to hook into okhttp3 pinner')
		}
		
		// trustkit
		try {
		    var Activity = Java.use("com.datatheorem.android.trustkit.pinning.OkHostnameVerifier");
		    Activity.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession').implementation = function (str) {
		        console.log('! Intercepted trustkit{1}: ' + str);
		        return true;
		    };
		
		    Activity.verify.overload('java.lang.String', 'java.security.cert.X509Certificate').implementation = function (str) {
		        console.log('! Intercepted trustkit{2}: ' + str);
		        return true;
		    };
		
		    console.log('* Setup trustkit pinning')
		} catch(err) {
		    console.log('* Unable to hook into trustkit pinner')
		}
		
		// TrustManagerImpl
		try {
		    var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');
		    TrustManagerImpl.verifyChain.implementation = function (untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {
		        console.log('! Intercepted TrustManagerImp: ' + host);
		        return untrustedChain;
		    }
		
		    console.log('* Setup TrustManagerImpl pinning')
		} catch (err) {
		    console.log('* Unable to hook into TrustManagerImpl')
		}
		
		// Appcelerator
		try {
		    var PinningTrustManager = Java.use('appcelerator.https.PinningTrustManager');
		    PinningTrustManager.checkServerTrusted.implementation = function () {
		        console.log('! Intercepted Appcelerator');
		    }
		
		    console.log('* Setup Appcelerator pinning')
		} catch (err) {
		    console.log('* Unable to hook into Appcelerator pinning')
		}
    } catch (err) {
                console.log('Error loading module modules/helpers/universalSSLpinningBypass.med');
        }
 try { 
		
		
		console.log('----Loading Webview Hook-----------');
		console.log('----gitHub: Ch0pin-----------------');
		console.log('----Hooking Webview API calls------');
		
		
		var motionEvent = Java.use('android.view.MotionEvent');
		
		
		motionEvent.obtain.overload().implementation = function(){
		    console.log("MotionEvent called without paremeters");
		    return this.obtain();
		}
		
		
		motionEvent.obtain.overload('android.view.MotionEvent').implementation = function(motionEv){
		
		    console.log('A new MotionEvent, copied from an existing one:' + motionEv.$className);
		    return this.obtain(motionEv);
		
		}
		
		
		
		
		motionEvent.obtain.overload('long', 'long', 'int', 'float', 'float', 'int').implementation = function(downTime,eventTime,action,x,y,metaState){
		    var actionType ='';
		    if(action == '0'){
		        actionType = 'ACTION_DOWN';
		    }
		    else if(action == '1'){
		        actionType = 'ACTION_UP'
		    }
		    else actionType = action.toString();
		    console.log('Motion event detected using the following parameters:'
		    + '\ndownTime: '+downTime
		    + '\neventTime: '+eventTime
		    + '\naction: '+actionType
		    + '\nx: '+x
		    + '\ny: '+y
		    + '\nmetaState: '+metastate);
		    return this.obtain(downTime, eventTime, action,x,y,metastate);
		}
		
		motionEvent.obtain.overload('long', 'long', 'int', 'float', 'float', 'float', 'float', 'int', 'float', 'float', 'int', 'int').implementation = function(downTime, eventTime, action,x,y,pressure,size,metastate,xPrecission,yPrecission,deviceId,edgeFlags){
		   // downTime, eventTime, action,x,y,pressure,size,metastate,xPrecission,yPrecission,deviceId,edgeFlags
		   var actionType ='';
		   if(action == '0'){
		       actionType = 'ACTION_DOWN';
		   }
		   else if(action == '1'){
		       actionType = 'ACTION_UP'
		   }
		   else actionType = action.toString();
		    console.log('Motion event detected using the following parameters:'
		    + '\ndownTime: '+downTime
		    + '\neventTime: '+eventTime
		    + '\naction: '+actionType
		    + '\nx: '+x
		    + '\ny: '+y
		    + '\npressure: '+pressure
		    + '\nsize: '+size
		    + '\nmetaState: '+metastate
		    + '\nxPrecission: '+xPrecission
		    + '\nyPrecission: '+yPrecission
		    + '\ndeviceId: '+deviceId
		    + '\nedgeFlags: ' + edgeFlags);
		    return this.obtain(downTime, eventTime, action,x,y,pressure,size,metastate,xPrecission,yPrecission,deviceId,edgeFlags);
		}
		
		motionEvent.obtain.overload('long', 'long', 'int', 'int', '[I', '[Landroid.view.MotionEvent$PointerCoords;', 'int', 'float', 'float', 'int', 'int', 'int', 'int').implementation = 
		function(downTime,eventTime,action,pointerCount,pointerIds,pointerCoords,metaState,xPrecission,yPrecission,deviceId,edgeFlags,source,flags){
		    console.log('[!] Motion event detected using obtain which was Deprecated in API level 15');
		    return this.obtain(downTime,eventTime,action,pointerCount,pointerIds,pointerCoords,metaState,xPrecission,yPrecission,deviceId,edgeFlags,source,flags);
		}
		
		motionEvent.obtain.overload('long', 'long', 'int', 'int', 'float', 'float', 'float', 'float', 'int', 'float', 'float', 'int', 'int').implementation = 
		function(downTime,eventTime,action,pointerCount,x,y,pressure,size,metaState,xPrecission,deviceId,edgeFlags){
		    var actionType ='';
		    if(action == '0'){
		        actionType = 'ACTION_DOWN';
		    }
		    else if(action == '1'){
		        actionType = 'ACTION_UP'
		    }
		    else actionType = action.toString();
		    console.log('Motion event detected using the following parameters:'
		    + '\ndownTime: '+downTime
		    + '\neventTime: '+eventTime
		    + '\naction: '+actionType
		    + '\nPointercount: ' + pointerCount
		    + '\nx: '+x
		    + '\ny: '+y
		    + '\npressure: '+pressure
		    + '\nsize: '+size
		    + '\nmetaState: '+metaState
		    + '\nxPrecission: '+xPrecission
		    + '\nyPrecission: '+yPrecission
		    + '\ndeviceId: '+deviceId
		    + '\nedgeFlags: ' + edgeFlags);
		    return this.obtain(downTime,eventTime,action,pointerCount,x,y,pressure,size,metaState,xPrecission,deviceId,edgeFlags);           
		}
		motionEvent.obtain.overload('long', 'long', 'int', 'float', 'float', 'float', 'float', 'int', 'float', 'float', 'int', 'int', 'int', 'int').implementation = function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){
		    console.log('[+] Motion Event detected');
		    return this.obtain(a,b,c,d,e,f,g,h,i,j,k,l,m,n);
		}
		
		motionEvent.obtain.overload('long', 'long', 'int', 'int', '[Landroid.view.MotionEvent$PointerProperties;', '[Landroid.view.MotionEvent$PointerCoords;', 'int', 'int', 'float', 'float', 'int', 'int', 'int', 'int').implementation = 
		function(downTime,eventTime,action,pointerCount,pointerProperties,pointerCoords,metaState,buttonState,xPrecission,yPrecission,deviceId,edgeFlags,source,flags){
		    var actionType ='';
		    if(action == '0'){
		        actionType = 'ACTION_DOWN';
		    }
		    else if(action == '1'){
		        actionType = 'ACTION_UP'
		    }
		    else actionType = action.toString();
		    console.log('Motion event detected using the following parameters:'
		    + '\ndownTime: '+downTime
		    + '\neventTime: '+eventTime
		    + '\naction: '+actionType
		    + '\npointerCount: ' + pointerCount
		    + '\npointerProperties: ' + pointerProperties
		    + '\npointerCoords: ' + pointerCoords
		    + '\nmetaState: '+metaState
		    + '\nbuttonState: '+buttonState
		    + '\nxPrecission: '+xPrecission
		    + '\nyPrecission: '+yPrecission
		    + '\ndeviceId: '+deviceId
		    + '\nedgeFlags: ' + edgeFlags
		    + '\nsource: ' + source
		    + '\nflags: '+flags);
		    return this.obtain(downTime,eventTime,action,pointerCount,pointerProperties,pointerCoords,metaState,buttonState,xPrecission,yPrecission,deviceId,edgeFlags,source,flags);
		}
		motionEvent.obtain.overload('long', 'long', 'int', 'int', '[Landroid.view.MotionEvent$PointerProperties;', '[Landroid.view.MotionEvent$PointerCoords;', 'int', 'int', 'float', 'float', 'int', 'int', 'int', 'int', 'int').implementation = 
		function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){
		    console.log('[+] Motion Event Detected');
		    return this.obtain(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
		}
    } catch (err) {
                console.log('Error loading module modules/click_fraud/motionEventDetect.med');
        }
 try { 
		
		
		
		var webView = Java.use('android.webkit.WebView');
		
		
		webView.addJavascriptInterface.implementation = function(object, name){
		    console.log('[i] Javascript interface detected:' + object.$className + ' instatiated as' + name);
		    this.addJavascriptInterface(object,name);
		}
		
		
		webView.evaluateJavascript.implementation = function(script, resultCallback){
		    console.log('[i] evaluateJavascript called with the following script: '+script);
		    this.evaluateJavascript(script,resultCallback);
		}
		
		webView.getOriginalUrl.implementation = function(){
		    console.log('[i] Original URL: ' + this.getOriginalUrl());
		    return this.getOriginalUrl();
		}
		
		webView.getUrl.implementation = function(){
		    console.log('[i] Current Loaded url:' + this.getUrl());
		    return this.getUrl();
		}
		
		webView.loadData.implementation = function(data,mimeType, encoding){
		    console.log('[i] Load data called with the following parameters:\n' + 'Data:' + data + '\nMime type: '+mimeType+'\nEncoding: '+ encoding);
		    this.loadData(data,mimeType,encoding);
		}
		
		webView.loadDataWithBaseURL.implementation = function(baseUrl,  data,  mimeType,  encoding,  historyUrl){
		    console.log('[i] loadDataWithBaseURL call detected, having the following parameters:'+
		    '\nBaseUrl: ' + baseUrl +
		    '\nData: ' + data+
		    '\nmimeType: ' + mimeType+
		    '\nhistory URL' + historyUrl);
		
		    this.loadDataWithBaseURL(baseUrl,data,mimeType,encoding,historyUrl);
		}
		
		webView.loadUrl.overload('java.lang.String', 'java.util.Map').implementation = function(url,additionalHttpHeaders){
		    console.log('[i] Loading URL: ' + url);
		    this.loadUrl(url,additionalHttpHeaders);
		}
		
		
		webView.loadUrl.overload('java.lang.String').implementation = function(url){
		    console.log('[i] Loading URL:' + url);
		    this.loadUrl(url);
		}
		
		webView.postUrl.implementation = function (url,postData){
		            
		    var buffer = Java.array('byte', postData);
		    var result = "";
		
		    for(var i = 0; i < buffer.length; ++i){
		        result+= (String.fromCharCode(buffer[i]));
		    }
		
		    console.log('[i] Post request using the webview detected ' + '\nURL: '+url+'Post data:'+result);
		    this.postUrl(url,postData);
		}
		
		webView.removeJavascriptInterface.implementation = function(name){
		    console.log('The ' + name + ' Javascript interface removed');
		    this.removeJavascriptInterface(name);
		}
		
		webView.setWebViewClient.implementation = function(client){
		    console.log('Webview client: ' + client.$className);
		    this.setWebViewClient(client);
		}
    } catch (err) {
                console.log('Error loading module modules/click_fraud/webviewHook.med');
        }
});
