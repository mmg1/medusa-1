Java.perform(function() {
 try { 
		
		    var splash = Java.use("com.medialight.alertanoo.SplashScreen");
		
		    var rootBeer = Java.use("com.scottyab.rootbeer.RootBeerNative");
		    var check1 = Java.use('f.d.a.b');
		    var check2 = Java.use('f.d.a.a');
		    var check3 = Java.use('f.a.a.a.a');
		    var check4 = Java.use('f.d.a.c.a');
		    var runtime = Java.use('java.lang.Runtime');
		
		    splash.onCreate.implementation = function(bandle){
		        console.log('splash on create');
		        this.onCreate(bandle);
		    }
		
		    rootBeer.$init.implementation = function(bool){
		        console.log('rootBeer constructor');
		        rootBeer.a = false
		    }
		
		    runtime.exec.overload('java.lang.String').implementation = function(cmd){
		        console.log("CMD:"+ cmd);
		        console.log("Result: "+this.exec(cmd))
		        return this.exec('ls');   
		    }
		
		    check4.a.overload().implementation = function(){
		        console.log ('check4 bypass');
		        return '';
		    }
		
		    check3.a.overload('java.lang.String','java.lang.String','java.lang.String').implementation = function(a,b,c){
		        console.log(a,b,c);
		        return '';
		    }
		
		    check1.a.overload('java.util.List').implementation = function(a){
		        console.log('Bypassing check1');
		        return false;
		    }
		
		    check1.a.overload('java.lang.String').implementation = function(a){
		        console.log('Bypassing check2 for '+a);
		        return false;
		    }
		
		    check2.a.implementation = function(){
		        console.log('Bypassing check3');
		        return this.a();
		    }
    } catch (err) {
                console.log('Error loading module modules/myModules/scratchpad.med');
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
