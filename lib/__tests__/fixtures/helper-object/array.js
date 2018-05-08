'use strict';

const _ = require('lodash');
const helpers = module.exports;

helpers.after = function(array, n) {
  if (_.isUndefined(array)) return '';
  return array.slice(n);
};

helpers.before = function(array, n) {
  if (_.isUndefined(array)) return '';
  return array.slice(0, -n);
};
