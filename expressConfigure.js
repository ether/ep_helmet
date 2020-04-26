const helmet = require('helmet');
const settings = require('../../src/node/utils/Settings');

exports.expressConfigure = function(hookName, app){

  // Check settings are set..
  if(!settings.ep_helmet || !settings.ep_helmet){
    console.warn('No helmet settings in settings.json, set with "ep_helmet":{} - We will use default helmet settings for now');
  }
  app.app.use(helmet(settings.ep_helmet || {}));

}

