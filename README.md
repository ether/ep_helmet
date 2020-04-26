Etherpad plugin to bring in helmet 

# Usage
Basic usage is simple, just install the plugin

# Advanced usage
Just use the same settings Helmet exposes IE

## CSP
```
"ep_helmet":{
  "csp":{
    "directives": {
      "objectSrc": ["'none'"],
      "upgradeInsecureRequests": true,
      "workerSrc": false
    }
  }
}
```
The above CSP will need to be polished over time
https://ponyfoo.com/articles/content-security-policy-in-express-apps is a good write up that needs to be referred to and supported

# License
Apache 2
