'use strict';

const _ = require('lodash');
const path = require('path');
const utils = require('./utils');

/**
 * Looks for files with type .js and attempts to add them as Handlebars helpers.
 * @param {string|string[]} dirs - Folder to check for helpers.
 */
module.exports = function(dirs) {
  const helpers = utils.loadFiles(dirs, '**/*.js');

  _.forEach(helpers, helper => {
    const name = path.basename(helper, '.js');

    try {
      if (this.Handlebars.helpers[name]) {
        delete require.cache[require.resolve(path.join(helper))];
        this.Handlebars.unregisterHelper(name);
      }

      helper = require(path.join(helper));
      if (_.isFunction(helper)) {
        this.Handlebars.registerHelper(name, helper);
      } else {
        _.forEach(helper, (func, key) => {
          this.Handlebars.registerHelper(key, func);
        });
      }
    } catch (e) {
      console.warn('Error when loading ' + name + '.js as a Handlebars helper.'); // eslint-disable-line
      delete require.cache[require.resolve(path.join(helper))];
      this.Handlebars.unregisterHelper(name);
    }
  });
};
