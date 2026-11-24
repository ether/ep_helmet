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

## Frameguard (embedding in an iframe)
By default helmet sends `X-Frame-Options: SAMEORIGIN`, so browsers only show a
pad in an iframe when the embedding page is on the pad's own origin. Embedding
from another origin or another site (for example a pad iframed into a wiki,
an LMS or Nextcloud) is blocked until you change the `frameguard` setting.

Allow embedding from any origin:
```
"ep_helmet":{
  "frameguard": false
}
```

To allow only some origins, turn frameguard off and restrict framing with a
CSP `frameAncestors` directive in the `csp` block above instead, e.g.
`"frameAncestors": ["'self'", "https://wiki.example.com"]`. X-Frame-Options
can't list allowed origins; helmet 8 only accepts these values:
```
"ep_helmet":{
  "frameguard":{
    "action": "deny"
  }
}
```
`"action"` is `"deny"` or `"sameorigin"`.

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
