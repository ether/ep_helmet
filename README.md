Etherpad plugin to bring in helmet.  Helmet provides security for express.  See the Helmet docs for it's capabilities.

# Usage
Basic usage is simple, just install the plugin.

# Advanced usage (currently on supports CSP).
Just use the same settings Helmet exposes for CSP.

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
