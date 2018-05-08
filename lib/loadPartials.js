'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const stripBom = require('strip-bom');
const utils = require('./utils');

/**
 * Looks for partials with type .html, .hbs, or .handlebars and adds them as Handlebars partials matching the name of the file.
 * @param {string|string[]} dirs - Folder to check for partials.
 */
module.exports = function(dirs) {
  const partials = utils.loadFiles(dirs, '**/*.{html,hbs,handlebars}');

  _.forEach(partials, partial => {
    const ext = path.extname(partial);
    const file = stripBom(fs.readFileSync(partial).toString());
    const name = path.basename(partial, ext);

    this.Handlebars.registerPartial(name, file.toString());
  });
};
