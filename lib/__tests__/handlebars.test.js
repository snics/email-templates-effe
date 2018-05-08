const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const loadLayouts = require('../loadLayouts.js');
const loadPartials = require('../loadPartials.js');
const loadHelpers = require('../loadHelpers.js');

function Engine() {
  this.layouts = {};
  this.Handlebars = require('handlebars');
}

Engine.prototype._loadLayouts = loadLayouts;
Engine.prototype._loadPartials = loadPartials;
Engine.prototype._loadHelpers = loadHelpers;

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

  describe('loadPartials', () => {
    it('should not have registered handlebars partials', () => {
      const engine = new Engine();
      const hbsPartials = engine.Handlebars.partials;
      engine._loadPartials(path.join(__dirname, 'fixtures/no-files'));

      expect(_.isObject(hbsPartials)).toBeTruthy();
      expect(hbsPartials).toEqual({});
    });

    it('should have registered a handlebars partial bast on type html', () => {
      const engine = new Engine();
      const filePath = path.join(__dirname, 'fixtures/layout-html');
      const fileContent = fs.readFileSync(path.join(filePath, 'html-file.html'));

      engine._loadPartials(filePath);
      const hbsPartials = engine.Handlebars.partials;

      expect(_.isObject(hbsPartials)).toBeTruthy();
      expect(Object.keys(hbsPartials)).toEqual(['html-file']);
      expect(_.trim(hbsPartials['html-file'])).toEqual(_.trim(fileContent.toString()));

      engine.Handlebars.unregisterPartial('html-file');
    });

    it('should have registered a handlebars partial bast on type hbs', () => {
      const engine = new Engine();
      const filePath = path.join(__dirname, 'fixtures/layout-hbs');
      const fileContent = fs.readFileSync(path.join(filePath, 'hbs-file.hbs'));

      engine._loadPartials(filePath);
      const hbsPartials = engine.Handlebars.partials;

      expect(_.isObject(hbsPartials)).toBeTruthy();
      expect(Object.keys(hbsPartials)).toEqual(['hbs-file']);
      expect(_.trim(hbsPartials['hbs-file'])).toEqual(_.trim(fileContent.toString()));

      engine.Handlebars.unregisterPartial('hbs-file');
    });

    it('should have registered a handlebars partial bast on type handlebars', () => {
      const engine = new Engine();
      const filePath = path.join(__dirname, 'fixtures/layout-handlebars');
      const fileContent = fs.readFileSync(
        path.join(filePath, 'handlebars-file.handlebars')
      );

      engine._loadPartials(filePath);
      const hbsPartials = engine.Handlebars.partials;

      expect(_.isObject(hbsPartials)).toBeTruthy();
      expect(Object.keys(hbsPartials)).toEqual(['handlebars-file']);
      expect(_.trim(hbsPartials['handlebars-file'])).toEqual(
        _.trim(fileContent.toString())
      );

      engine.Handlebars.unregisterPartial('handlebars-file');
    });

    it('should have registered multiple partials', () => {
      const engine = new Engine();

      const onePath = path.join(__dirname, 'fixtures/layout-html');
      const twoPath = path.join(__dirname, 'fixtures/layout-hbs');
      const threePath = path.join(__dirname, 'fixtures/layout-handlebars');

      const oneContent = fs.readFileSync(path.join(onePath, 'html-file.html'));
      const twoContent = fs.readFileSync(path.join(twoPath, 'hbs-file.hbs'));
      const threeContent = fs.readFileSync(
        path.join(threePath, 'handlebars-file.handlebars')
      );

      engine._loadPartials([onePath, twoPath, threePath]);
      const hbsPartials = engine.Handlebars.partials;

      expect(_.isObject(hbsPartials)).toBeTruthy();
      expect(Object.keys(hbsPartials).sort()).toEqual(
        ['html-file', 'hbs-file', 'handlebars-file'].sort()
      );

      expect(_.trim(hbsPartials['html-file'])).toEqual(_.trim(oneContent.toString()));
      expect(_.trim(hbsPartials['hbs-file'])).toEqual(_.trim(twoContent.toString()));
      expect(_.trim(hbsPartials['handlebars-file'])).toEqual(
        _.trim(threeContent.toString())
      );

      engine.Handlebars.unregisterPartial('html-file');
      engine.Handlebars.unregisterPartial('hbs-file');
      engine.Handlebars.unregisterPartial('handlebars-file');
    });
  });

  describe('loadHelpers', () => {
    it('should not have registered handlebars helpers', () => {
      const engine = new Engine();
      const hbsHelpers = engine.Handlebars.helpers;
      const hbsHelperNames = Object.keys(hbsHelpers).sort();
      engine._loadHelpers(path.join(__dirname, 'fixtures/no-files'));

      expect(_.isObject(hbsHelpers)).toBeTruthy();
      expect(Object.keys(hbsHelpers).sort()).toEqual(hbsHelperNames);
    });

    it('should have registered handlebars helpers from a exported function', () => {
      const engine = new Engine();
      const hbsHelpers = engine.Handlebars.helpers;
      const hbsHelperNames = Object.keys(hbsHelpers);

      engine._loadHelpers(path.join(__dirname, 'fixtures/helper-function'));

      expect(_.isObject(hbsHelpers)).toBeTruthy();
      expect(Object.keys(hbsHelpers).sort()).toEqual(
        hbsHelperNames.concat(['join']).sort()
      );

      engine.Handlebars.unregisterHelper('join');
    });

    it('should only registered handlebars helpers with the same name', () => {
      const engine = new Engine();
      const hbsHelpers = engine.Handlebars.helpers;
      const hbsHelperNames = Object.keys(hbsHelpers);
      const helperPath = path.join(__dirname, 'fixtures/helper-function');

      engine._loadHelpers([helperPath, helperPath]);

      const newHbsHelperNames = Object.keys(hbsHelpers);

      expect(_.isObject(hbsHelpers)).toBeTruthy();
      expect(newHbsHelperNames.length).toEqual(hbsHelperNames.length + 1);

      engine.Handlebars.unregisterHelper('join');
    });
  });

  it('should have registered handlebars helpers from a exported object', () => {
    const engine = new Engine();
    const hbsHelpers = engine.Handlebars.helpers;
    const hbsHelperNames = Object.keys(hbsHelpers);

    engine._loadHelpers(path.join(__dirname, 'fixtures/helper-object'));

    const newHbsHelperNames = Object.keys(hbsHelpers);
    const expectedNames = ['before', 'after'];

    expect(_.isObject(hbsHelpers)).toBeTruthy();
    expect(newHbsHelperNames.indexOf('array')).toBe(-1);
    expect(newHbsHelperNames).toEqual(expect.arrayContaining(expectedNames));
    expect(Object.keys(hbsHelpers).sort()).toEqual(
      hbsHelperNames.concat(expectedNames).sort()
    );

    engine.Handlebars.unregisterHelper('before');
    engine.Handlebars.unregisterHelper('after');
  });

  it('should errors be caught', () => {
    const engine = new Engine();
    const hbsHelpers = engine.Handlebars.helpers;
    engine._loadHelpers(path.join(__dirname, 'fixtures/helper-error'));

    expect(_.isObject(hbsHelpers)).toBeTruthy();
    expect(Object.keys(hbsHelpers).indexOf('error')).toBe(-1);
  });
});
