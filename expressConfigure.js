const helmet = require('helmet');
const settings = require('../../src/node/utils/Settings');
const crypto = require('crypto');
/*
app.use((req, res, next) => {
  res.locals.nonce = uuid.v4()
  next()
})
*/

exports.expressConfigure = function(hookName, app){
  app.app.use(helmet());

  if(settings.ep_helmet){
    console.debug("Using config from Helmet. ", settings.ep_helmet);
  }

  // Check settings are set..
  if(settings.ep_helmet && settings.ep_helmet.csp){
    const csp = require('helmet-csp')
    settings.nonce = {};
    // each page, this needs adding to if someone adds more inline JS
    var noncedPages = [
      'indexLicense', 'index',
      'padLicense', 'padErrorHandler', 'padBootstrap', 'importFrame',
      'timesliderLicense', 'timesliderBootstrap'
    ];
    var scriptSrc = []; // array of each nonce
    scriptSrc.push("'unsafe-eval'");
    scriptSrc.push("'self'");
    scriptSrc.push("'nonce-aceTemporaryNonce'");
    noncedPages.forEach(function(item){
      let nonce = crypto.randomBytes(8).toString('base64'); // generate the nonce
      scriptSrc.push(`\'nonce-${nonce}\'`); // push the nonces to the array
      settings.nonce[item] = nonce; // apply the nonce to the setting object...
    });

    if(settings.ep_helmet.csp.directives.scriptSrc){
      settings.ep_helmet.csp.directives.scriptSrc = scriptSrc;
    }
    app.app.use(csp(settings.ep_helmet.csp))
  }

  // Frameguard is useful for x-frame-origin
  if(settings.ep_helmet && settings.ep_helmet.frameguard){
    app.app.use(helmet.frameguard(settings.ep_helmet.frameguard));
  }
  
}
