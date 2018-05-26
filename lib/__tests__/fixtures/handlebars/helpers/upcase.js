const _ = require('lodash');
const helpers = module.exports;

helpers.uppercase = function(str) {
  if (_.isObject(str) && str.fn) {
    return str.fn(this).toUpperCase();
  }
  if (!_.isString(str)) return '';
  return str.toUpperCase();
};

helpers.upcase = function() {
  return helpers.uppercase.apply(this, arguments);
};
