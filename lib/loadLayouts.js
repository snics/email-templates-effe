'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const utils = require('./utils');

/**
 * Looks for files with .html, .hbs, or .handlebars extensions within the given directory, and adds them as layout.
 * @param {string} dirs - Folder to check for layouts.
 */
module.exports = function(dirs) {
  const layouts = utils.loadFiles(dirs, '**/*.{html,hbs,handlebars}');

  _.forEach(layouts, layout => {
    const ext = path.extname(layout);
    const name = path.basename(layout, ext);
    const file = fs.readFileSync(layout);

    this.layouts[name] = this.Handlebars.compile(file.toString());
  });
};
