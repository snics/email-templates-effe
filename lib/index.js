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

  if (this.options.layouts) {
    this._loadLayouts([path.join(__dirname, 'hbs/layouts'), this.options.layouts]);
  } else {
    this._loadLayouts(path.join(__dirname, 'hbs/layouts'));
  }
  if (this.options.partials) this._loadPartials(this.options.partials);
  if (this.options.helpers) this._loadHelpers(this.options.helpers);
}

Effe.prototype._loadLayouts = require('./loadLayouts');
Effe.prototype._loadPartials = require('./loadPartials');
Effe.prototype._loadHelpers = require('./loadHelpers');
Effe.prototype._render = require('./render').render;

/**
 * Make the object with the engines
 * @param {Object} effe
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
