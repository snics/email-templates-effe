const { loadFiles } = require('../utils.js');
const _ = require('lodash');
const path = require('path');

describe('utils', () => {
  describe('_loadFiles', () => {
    it('should display an empty array by not found files', () => {
      const files = loadFiles(path.join(__dirname, 'files/no-files'), '**/*.js');
      expect(_.isArray(files)).toBeTruthy();
      expect(files.length).toBe(0);
    });

    it('should display an array of files locations', () => {
      const files = loadFiles(path.join(__dirname, 'files/js-files'), '**/*.js');

      expect(_.isArray(files)).toBeTruthy();
      expect(files.length).toBeGreaterThan(0);
    });
  });
});
