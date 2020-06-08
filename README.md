### Description:

Medusa is an extensible framework which uses **Frida** in order to trace API abuse during application runtime. 

### Modules:

A module (.med file) consists of two sections. The **Description** where the usage of the module is described, e.g. *Description: Use this module to perform the following action* . The **Code** is where the javascript code should be inserted in order to hook a specific API call. What follows is an example of an SSL pinning bypass module:

```js
#Description: 'Use this module to bypass certificate pinning implementations based on TrustManagerImpl'
#Help: 'The script will display the message: Bypassing SSL Pinning in case of successful bypass'
#Code:

var array_list = Java.use("java.util.ArrayList");
var ApiClient = Java.use('com.android.org.conscrypt.TrustManagerImpl');

ApiClient.checkTrustedRecursive.implementation = function(a1, a2, a3, a4, a5, a6) {

    console.log('Bypassing SSL Pinning');
    var k = array_list.$new();

    return k;
}
```

### Usage:

The **main controller script is the medusa.py** which can be inititiated by issuing the following command:

> $python3 medusa.med



Available commands:

​                    \- show categories           		:Displays the availlable module categories (start here)

​                    \- show modules [category]   :Displays the availlable modules for the selected category

​                    \- show mods                			:Shows loaded modules

​                    \- use [module name]         	:Selects a module which will be added to the final script

​                    \- help [module name]        	:Displays help for the 

​                    \- reset                   					 :Unselects all modules

​                    \- compile script            			:Compiles the script 

​                    \- run       [package name]  	 :Initiates a Frida session and attaches to the sellected package

​                    \- run -f   [package name]  	 :Initiates a Frida session and spawns the sellected package

​                    

Use the **/modules/myModules/scratchpad.med** to write your own hooks and include them to the agent.js using the 'compile script' command.

#### Features:

The user may navigate through the modules and pick the ones that wants to 'trace'. After selection a Frida session will be initiated where the API functions implemented in the 'med' files will be traced.  The modules can be dynamically added or removed during runtime. 



