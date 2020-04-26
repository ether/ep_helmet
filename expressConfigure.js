const helmet = require('helmet');
const settings = require('../../src/node/utils/Settings');

exports.expressConfigure = function(hookName, app){

  app.app.use(helmet());
  // Check settings are set..
  if(settings.ep_helmet && settings.ep_helmet.csp){
    const csp = require('helmet-csp')
    var scriptSrc = [
      "'unsafe-eval'",
      "'self'",
      "'sha256-ibNaIvmfNwDgwoWLRuzNqZ70N73f+h1vy5W+CIb0mYs='",
      "'sha256-428+JzVAjCsMgZnl45z9QF/vl/gV8cYmw6ECAomwbzg='",
      "'sha256-Ka9+GFLL5C2nb5noIeyZLrMf5dINEkPE/vvE5p0gwSc='",
      "'sha256-BdOZlu8ThnsrDyvG8O5phcbXQQfsf6sIF7j8NZ7PpKw='",
      "'sha256-KZVi2ucSvzF5CKcaBx4eZYxBx361dQPNVRuIHrN3zsA='"
    ]
    if(settings.ep_helmet.csp.directives.scriptSrc){
      settings.ep_helmet.csp.directives.scriptSrc = scriptSrc;
    }
    app.app.use(csp(settings.ep_helmet.csp))
    console.debug("Using CSP from Helmet. ", settings.ep_helmet.csp);
  }

}

