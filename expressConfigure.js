const helmet = require('helmet');
const settings = require('../../src/node/utils/Settings');

exports.expressConfigure = function(hookName, app){

  app.app.use(helmet());
  // Check settings are set..
  if(settings.ep_helmet && settings.ep_helmet.csp){
    const csp = require('helmet-csp')
    app.app.use(csp(settings.ep_helmet.csp))
    console.debug("Using CSP from Helmet. ", settings.ep_helmet.csp);
  }

}

