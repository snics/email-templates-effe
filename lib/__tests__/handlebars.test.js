const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const loadLayouts = require('../loadLayouts.js');

function Engine() {
  this.layouts = {};
  this.Handlebars = require('handlebars');
}

Engine.prototype._loadLayouts = loadLayouts;

describe('handlebars', () => {
  describe('loadLayouts', () => {
    it('should not have registered layouts', () => {
      const engine = new Engine();
      engine._loadLayouts(path.join(__dirname, 'fixtures/no-files'));

      expect(_.isObject(engine.layouts)).toBeTruthy();
      expect(engine.layouts).toEqual({});
    });

    it('should have registered a layout bast on type html', () => {
      const engine = new Engine();
      const filePath = path.join(__dirname, 'fixtures/layout-html');
      const fileContent = fs.readFileSync(path.join(filePath, 'html-file.html'));

      engine._loadLayouts(filePath);

      expect(_.isObject(engine.layouts)).toBeTruthy();
      expect(Object.keys(engine.layouts)).toEqual(['html-file']);
      expect(_.trim(engine.layouts['html-file']({}))).toEqual(
        _.trim(fileContent.toString())
      );
    });

    it('should have registered a layout bast on type hbs', () => {
      const engine = new Engine();
      const filePath = path.join(__dirname, 'fixtures/layout-hbs');
      const fileContent = fs.readFileSync(path.join(filePath, 'hbs-file.hbs'));

      engine._loadLayouts(filePath);

      expect(_.isObject(engine.layouts)).toBeTruthy();
      expect(Object.keys(engine.layouts)).toEqual(['hbs-file']);
      expect(_.trim(engine.layouts['hbs-file']({}))).toEqual(
        _.trim(fileContent.toString())
      );
    });

    it('should have registered a layout bast on type handlebars', () => {
      const engine = new Engine();
      const filePath = path.join(__dirname, 'fixtures/layout-handlebars');
      const fileContent = fs.readFileSync(
        path.join(filePath, 'handlebars-file.handlebars')
      );

      engine._loadLayouts(filePath);

      expect(_.isObject(engine.layouts)).toBeTruthy();
      expect(Object.keys(engine.layouts)).toEqual(['handlebars-file']);
      expect(_.trim(engine.layouts['handlebars-file']({}))).toEqual(
        _.trim(fileContent.toString())
      );
    });

    it('should have registered multiple layouts', () => {
      const engine = new Engine();

      const onePath = path.join(__dirname, 'fixtures/layout-html');
      const twoPath = path.join(__dirname, 'fixtures/layout-hbs');
      const threePath = path.join(__dirname, 'fixtures/layout-handlebars');

      const oneContent = fs.readFileSync(path.join(onePath, 'html-file.html'));
      const twoContent = fs.readFileSync(path.join(twoPath, 'hbs-file.hbs'));
      const threeContent = fs.readFileSync(
        path.join(threePath, 'handlebars-file.handlebars')
      );

      const LayoutsNames = ['html-file', 'hbs-file', 'handlebars-file'].sort();

      engine._loadLayouts([onePath, twoPath, threePath]);

      expect(_.isObject(engine.layouts)).toBeTruthy();
      expect(Object.keys(engine.layouts).sort()).toEqual(LayoutsNames);

      expect(_.trim(engine.layouts['html-file']({}))).toEqual(
        _.trim(oneContent.toString())
      );
      expect(_.trim(engine.layouts['hbs-file']({}))).toEqual(
        _.trim(twoContent.toString())
      );
      expect(_.trim(engine.layouts['handlebars-file']({}))).toEqual(
        _.trim(threeContent.toString())
      );
    });
  });
});
