const utils = require('../utils.js');
const _ = require('lodash');
const path = require('path');

describe('utils', () => {
  describe('loadFiles', () => {
    it('should display an empty array by not found files', () => {
      const files = utils.loadFiles(path.join(__dirname, 'fixtures/no-files'), '**/*.js');

      expect(_.isArray(files)).toBeTruthy();
      expect(files.length).toBe(0);
    });

    it('should display an array of locations of files', () => {
      const files = utils.loadFiles(path.join(__dirname, 'fixtures/js-files'), '**/*.js');

      expect(_.isArray(files)).toBeTruthy();
      expect(files.length).toBeGreaterThan(0);
    });

    it('should display an array of locations of files for multiple inputs', () => {
      const one = path.join(__dirname, 'fixtures/no-files');
      const two = path.join(__dirname, 'fixtures/js-files');

      const files = utils.loadFiles([one, two], '**/*.js');

      expect(_.isArray(files)).toBeTruthy();
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('hasInkyCode', () => {
    it('should not contain inky html code', () => {
      const hasInkyCode = utils.hasInkyCode('<h1>Hello World</h1>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeFalsy();
    });

    it('should return false if no string is used as input', () => {
      const number = utils.hasInkyCode(1);
      const array = utils.hasInkyCode(['Hello World', 1]);
      const func = utils.hasInkyCode(() => 'Hello World');
      const buffer = utils.hasInkyCode(Buffer.from('Hello World'));
      const nul = utils.hasInkyCode(null);
      const boolean = utils.hasInkyCode(true);

      expect(_.isBoolean(number)).toBeTruthy();
      expect(number).toBeFalsy();

      expect(_.isBoolean(array)).toBeTruthy();
      expect(array).toBeFalsy();

      expect(_.isBoolean(func)).toBeTruthy();
      expect(func).toBeFalsy();

      expect(_.isBoolean(buffer)).toBeTruthy();
      expect(buffer).toBeFalsy();

      expect(_.isBoolean(nul)).toBeTruthy();
      expect(nul).toBeFalsy();

      expect(_.isBoolean(boolean)).toBeTruthy();
      expect(boolean).toBeFalsy();
    });

    it('should contain <container> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<container>Hello World</container>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });

    it('should contain <row> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<row>Hello World</row>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });

    it('should contain <columns> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<columns>Hello World</columns>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });

    it('should contain <button> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<button>Hello World</button>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });

    it('should contain <callout> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<callout>Hello World</callout>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });

    it('should contain <menu> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<menu>Hello World</menu>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });

    it('should contain <item> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<item>Hello World</item>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });

    it('should contain <spacer> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<spacer>Hello World</spacer>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });

    it('should contain <wrapper> inky tag', () => {
      const hasInkyCode = utils.hasInkyCode('<wrapper>Hello World</wrapper>');

      expect(_.isBoolean(hasInkyCode)).toBeTruthy();
      expect(hasInkyCode).toBeTruthy();
    });
  });
});
