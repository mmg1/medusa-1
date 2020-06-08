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
 try { 
		
		    
		    var window = Java.use('android.view.Window');
		 
		    window.setFlags.implementation = function(a,b)
		    {
		        console.log("Cancelling Flag Secure");
		        
		    }
		
		   
    } catch (err) {
                console.log('Error loading module modules/helpers/flagSecure.med');
        }
 try { 
		
		
		var abstractCursor = Java.use('android.database.AbstractCursor');
		
		abstractCursor.getString.implementation = function(column){
		        console.log(this.getString(column));
		        return this.getString(column);
		
		}
		
		abstractCursor.getColumnIndex.implementation = function(columnName){
		        
		        console.log("\n[+] DB Query for:" + columnName + " ,Result:" + this.getString(this.getColumnIndex(columnName)));
		        return this.getColumnIndex(columnName);
		}
    } catch (err) {
                console.log('Error loading module modules/spyware/contentProvider.med');
        }
});
