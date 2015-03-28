## Ionic Webpack starter app

What's included:
  
* __jade__ as templating language (or use html, if don't care)  
* __sass__ for style management (with ready-to-go Ionic styles override)  
* __js-data__ for data management (let's give it a try instead of Restangular, which is great too)  
* __imgcache.js__ and wrapper service to cache loaded images (Google Chrome or Cordova only)  
* __environment management__ (check env app/env dir)
* __font preloading__

Plugins you will need to run app on device:
 
* com.ionic.keyboard
* org.apache.cordova.console
* org.apache.cordova.device
* org.apache.cordova.file
* org.apache.cordova.file-transfer
* org.apache.cordova.inappbrowser

To get started run  
```bash
$ npm install      
$ ./dev-server  
```

Will start development server with live reload on localhost:5000  

To build app run   
```bash
gulp webpack:build
```

App will be built into www folder, then you can package ionic app.  
   
### Environment management   
You can choose environment to build using --env key  
```bash
gulp webpack:build --env=production
```  

Environment other than __development__ will build minified project using ngAnnotate.  
Fonts preloading also enables in __non-development__ environments.
