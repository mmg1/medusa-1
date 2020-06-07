### Description:

Medusa is an extensible framework which uses **Frida** in order to trace API abuse during application runtime. 

### Modules:

A module (.med file) consists of two sections. The **Description** where the usage of the module is described, e.g. *Description: Use this module to perform the following action* . The **Code** is where the javascript code should be inserted in order to hook a specific API call. What follows is an example of an SSL pinning bypass module:

```js
Description: 'Use this module to bypass certificate pinning implementations based on TrustManagerImpl'
Code:

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

The user may navigate through the modules and pick the ones that wants to 'trace'. After selection a Frida session will be initiated where the API functions implemented in the 'med' files will be traced.  



