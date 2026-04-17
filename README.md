![Publish Status](https://github.com/ether/ep_helmet/workflows/Node.js%20Package/badge.svg) [![Backend Tests Status](https://github.com/ether/ep_helmet/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ether/ep_helmet/actions/workflows/test-and-release.yml)

Etherpad plugin to bring in helmet.  Helmet provides security for express.  See the Helmet docs for it's capabilities.  Helmet also brings iFrame embed capabilities into Etherpad.

# Usage
Basic usage is simple, just install the plugin.

# Advanced usage.
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

## Frameguard
Frameguard can be used to set X-Frame-Options which is useful if you embed Etherpad in an iFrame.
```
"ep_helmet":{
  "frameguard":{
    "action": "allow-from",
    "domain": "https://DOMAINIFRAMEWILLBEHOSTEDIN.com"
  }
}
```

# Todo
 - [ ] Provide a good CSP example for Etherpad
 - [ ] Provide improves security for Etherpad (using nonce example etc for inline)

# License
Apache 2

## Installation

Install from the Etherpad admin UI (**Admin → Manage Plugins**,
search for `ep_helmet` and click *Install*), or from the Etherpad
root directory:

```sh
pnpm run plugins install ep_helmet
```

> ⚠️ Don't run `npm i` / `npm install` yourself from the Etherpad
> source tree — Etherpad tracks installed plugins through its own
> plugin-manager, and hand-editing `package.json` can leave the
> server unable to start.

After installing, restart Etherpad.
