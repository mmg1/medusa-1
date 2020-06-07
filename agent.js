Java.perform(function() {
 try { 
		
		var array_list = Java.use("java.util.ArrayList");
		var ApiClient = Java.use('com.android.org.conscrypt.TrustManagerImpl');
		
		ApiClient.checkTrustedRecursive.implementation = function(a1, a2, a3, a4, a5, a6) {
		
		    console.log('Bypassing SSL Pinning');
		    var k = array_list.$new();
		    return k;
		}
    } catch (err) {
                console.log('Error loading module modules/helpers/sslUnpinning.med');
        }
});
