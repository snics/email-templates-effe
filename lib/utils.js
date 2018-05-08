'use strict';

const glob = require('glob');
const _ = require('lodash');
const path = require('path');

/**
 * Load a set of files
 * @param  {string|string[]} dirs
 * @param  {string} pattern
 * @return {array}
 */
const loadFiles = function(dirs, pattern) {
  let files = [];
  dirs = _.isArray(dirs) ? dirs : [dirs];

  _.forEach(dirs, row => {
    files = files.concat(glob.sync(path.join(row, pattern)));
  });
  return files;
};

/**
 * Checks if html has inky tags
 * @param {string} html - html string for checking
 * @return {boolean} - if has html inky tags
 */
const hasInkyCode = function(html) {
  if (_.isString(html)) {
    if (html.match(/<\s*\/?\s*container\s*.*?>/g)) return true;
    if (html.match(/<\s*\/?\s*row\s*.*?>/g)) return true;
    if (html.match(/<\s*\/?\s*columns\s*.*?>/g)) return true;
    if (html.match(/<\s*\/?\s*button\s*.*?>/g)) return true;
    if (html.match(/<\s*\/?\s*callout\s*.*?>/g)) return true;
    if (html.match(/<\s*\/?\s*menu\s*.*?>/g)) return true;
    if (html.match(/<\s*\/?\s*item\s*.*?>/g)) return true;
    if (html.match(/<\s*\/?\s*spacer\s*.*?>/g)) return true;
    if (html.match(/<\s*\/?\s*wrapper\s*.*?>/g)) return true;
  }
  return false;
};

module.exports = {
  loadFiles,
  hasInkyCode
};
