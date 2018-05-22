'use strict';

const Promise = require('bluebird');
const Inky = require('inky').Inky;
const cheerio = require('cheerio');

const utils = require('./utils');

const _renderInky = function(htmlContent) {
  return new Promise(resolve => {
    if (!utils.hasInkyCode(htmlContent)) return resolve(htmlContent);

    const i = new Inky();
    const html = cheerio.load(htmlContent, { xmlMode: true });
    const convertedHtml = i.releaseTheKraken(html);
    return resolve(convertedHtml);
  });
};

module.exports = {
  _renderInky
};
