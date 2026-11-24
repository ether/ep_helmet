'use strict';

const helmet = require('helmet');
const crypto = require('crypto');
const settings = require('ep_etherpad-lite/node/utils/Settings');

exports.expressConfigure = (hookName, app, cb) => {
  // Disable helmet's default Content-Security-Policy so the plugin
  // doesn't accidentally lock down a working Etherpad install. The
  // optional settings.ep_helmet.csp block below is the documented way
  // for operators to opt in. With the default in place, strict
  // 'script-src self' broke every page that relied on inline scripts
  // or runtime eval (notably Playwright's waitForFunction in tests).
  //
  // helmet's default X-Frame-Options: SAMEORIGIN stays on, so only pages on
  // the pad's own origin can embed it. Set settings.ep_helmet.frameguard to
  // false to allow embedding from other origins.
  const frameguard = settings.ep_helmet && settings.ep_helmet.frameguard;
  app.app.use(helmet({
    contentSecurityPolicy: false,
    ...(frameguard === false ? {xFrameOptions: false} : {}),
  }));

  if (settings.ep_helmet) {
    console.debug('Using config from Helmet. ', settings.ep_helmet);
  }

  // Check settings are set..
  if (settings.ep_helmet && settings.ep_helmet.csp) {
    const csp = require('helmet-csp');
    settings.nonce = {};
    // each page, this needs adding to if someone adds more inline JS
    const noncedPages = [
      'indexLicense',
      'index',
      'padLicense',
      'padErrorHandler',
      'padBootstrap',
      'importFrame',
      'timesliderLicense',
      'timesliderBootstrap',
    ];
    // array of each nonce
    const scriptSrc = [];
    scriptSrc.push("'unsafe-eval'");
    scriptSrc.push("'self'");
    scriptSrc.push("'nonce-aceTemporaryNonce'");
    noncedPages.forEach((item) => {
      // generate the nonce
      const nonce = crypto.randomBytes(8).toString('base64');
      // push the nonces to the array
      scriptSrc.push(`'nonce-${nonce}'`);
      // apply the nonce to the setting object...
      settings.nonce[item] = nonce;
    });

    if (settings.ep_helmet.csp.directives.scriptSrc) {
      settings.ep_helmet.csp.directives.scriptSrc = scriptSrc;
    }

    app.app.use(csp(settings.ep_helmet.csp));
  }

  // Frameguard is useful for x-frame-origin
  if (frameguard) {
    app.app.use(helmet.frameguard(frameguard));
  }

  cb();
};
