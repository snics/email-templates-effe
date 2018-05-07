'use strict';

const glob = require('glob');
const _ = require('lodash');
const path = require('path');

/**
 * Load a set of files
 * @param  {string|array} dirs
 * @param  {string} pattern
 * @return {array}
 * @private
 */
const loadFiles = function(dirs, pattern) {
  let files = [];
  dirs = _.isArray(dirs) ? dirs : [dirs];

  _.forEach(dirs, row => {
    files = files.concat(glob.sync(path.join(row, pattern)));
  });
  return files;
};

module.exports = {
  loadFiles
};
