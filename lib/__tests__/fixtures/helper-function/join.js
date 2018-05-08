const _ = require('lodash');

module.exports = function(array, separator) {
  if (typeof array === 'string') return array;
  if (!Array.isArray(array)) return '';
  separator = _.isString(separator) ? separator : ', ';
  return array.join(separator);
};
