'use strict';

const Promise = require('bluebird');
const Inky = require('inky').Inky;
const cheerio = require('cheerio');
const _ = require('lodash');
const stripBom = require('strip-bom');
const fm = require('front-matter');

const utils = require('./utils');

/**
 * Render all Inky HTML tags
 * @param {string} htmlContent
 * @private
 */
const _renderInky = function(htmlContent) {
  return new Promise(resolve => {
    if (!utils.hasInkyCode(htmlContent)) return resolve(htmlContent);

    const i = new Inky();
    const html = cheerio.load(htmlContent, { xmlMode: true });
    const convertedHtml = i.releaseTheKraken(html);
    return resolve(convertedHtml);
  });
};

/**
 * A final render function and combined Handlebars and Inky rendering
 * @param {string} html
 * @param {object} options
 * @return {PromiseLike<string>}
 */
const render = function(html, options = {}) {
  const engine = this.Handlebars;
  const page = fm(stripBom(_.toString(html)));
  const layout = page.attributes.layout || 'default';
  const layoutTemplate = this.layouts[layout];
  const date = _.merge(options, page.attributes);

  return Promise.resolve()
    .then(() => _renderInky(page.body))
    .then(content => {
      const pageTemplate = engine.compile(content + '\n');
      if (!_.isUndefined(layoutTemplate)) {
        engine.registerPartial('body', pageTemplate);
        return layoutTemplate(date);
      }
      return pageTemplate(date);
    });
};

module.exports = {
  _renderInky,
  render
};
