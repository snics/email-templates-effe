'use strict';

const path = require('path');
const _ = require('lodash');
const fs = require('fs');

/**
 * Initializes an instance of Effe.
 * @constructor
 * @param {object} options - Configuration options to use.
 */
function Effe(options = {}) {
  this.options = options;
  this.Handlebars = require('handlebars');
  this.layouts = {};

  const layoutsPath = [path.join(__dirname, 'hbs/layouts')];
  const partialsPath = [];
  const helpersPath = [];

  if (this.options.root) {
    const basePath = this.options.root;
    layoutsPath.push(path.join(basePath, 'layouts'));
    partialsPath.push(path.join(basePath, 'partials'));
    helpersPath.push(path.join(basePath, 'helpers'));
  } else {
    if (this.options.layouts) layoutsPath.push(this.options.layouts);
    if (this.options.partials) partialsPath.push(this.options.partials);
    if (this.options.helpers) helpersPath.push(this.options.helpers);
  }

  this._loadLayouts(layoutsPath);
  if (!_.isEmpty(partialsPath)) this._loadPartials(partialsPath);
  if (!_.isEmpty(helpersPath)) this._loadHelpers(helpersPath);
}

Effe.prototype._loadLayouts = require('./loadLayouts');
Effe.prototype._loadPartials = require('./loadPartials');
Effe.prototype._loadHelpers = require('./loadHelpers');
Effe.prototype._render = require('./render').render;

/**
 * Make the object with the engines
 * @param {object} effe
 * @return {Function}
 */
function makeRenderer(effe) {
  return function(path, options, cb) {
    options.filename = path;
    exports.handlebars = {};

    fs.readFile(path, function() {
      exports.handlebars.render = effe
        ._render(_.toString(arguments[1]), options)
        .then(html => cb(null, html));
    });
  };
}

module.exports = function(options) {
  const effe = new Effe(options);
  const handlebars = makeRenderer(effe);

  return { handlebars };
};
