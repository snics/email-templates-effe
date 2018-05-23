const _ = require('lodash');
const handlebars = require('handlebars');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const render = require('../render');
const loadLayouts = require('../loadLayouts');

function Engine() {
  this.layouts = {};
  this.Handlebars = handlebars;
}

Engine.prototype.render = render.render;

describe('render', () => {
  describe('_renderInky', () => {
    it('should display an empty array by not found files', () => {
      const content = '<h1>Hello Wold</h1>';
      const buildContent = render._renderInky(content);

      expect.assertions(1);
      return expect(buildContent).resolves.toBe(content);
    });

    it('should render inky tags', () => {
      const input = '<button href="#">Button</button>';
      const output =
        '<table class="button"><tr><td><table><tr><td><a href="#">Button</a></td></tr></table></td></tr></table>'; // eslint-disable-line
      const buildContent = render._renderInky(input);

      expect.assertions(1);
      return expect(buildContent).resolves.toEqual(_.trim(output));
    });
  });

  describe('render', () => {
    it('should render with out of data', () => {
      const engine = new Engine();
      const input = '<h1>Hallo!</h1>';

      const _render = engine.render(input);

      return expect(
        _render.then(html => {
          const $ = cheerio.load(html);
          return $('h1').html();
        })
      ).resolves.toEqual('Hallo!');
    });

    it('should render with hbs data', () => {
      const engine = new Engine();
      const input = '<h1>Hallo {{name}}</h1>';
      const data = { name: 'John' };

      const _render = engine.render(input, data);

      return expect(
        _render.then(html => {
          const $ = cheerio.load(html);
          return $('h1').html();
        })
      ).resolves.toEqual('Hallo John');
    });

    it('should render with data from file header', () => {
      const engine = new Engine();
      const input = fs.readFileSync(
        path.join(__dirname, 'fixtures/render/data-header.html')
      );
      const data = { name: 'John' };

      const _render = engine.render(input, data);

      return expect(
        _render.then(html => {
          const $ = cheerio.load(html);
          return $('h1').html();
        })
      ).resolves.toEqual('Hallo John doe');
    });

    it('should render with Inky html tag', () => {
      const engine = new Engine();
      const input = '<button href="#">Click Me</button>';
      const data = { name: 'John' };

      const _render = engine.render(input, data);

      return expect(
        _render.then(html => {
          console.log(html);
          const $ = cheerio.load(html);
          return $('a').html();
        })
      ).resolves.toEqual('Click Me');
    });

    it('should render with default', () => {
      function Engine() {
        this.layouts = {};
        this.Handlebars = handlebars;

        this.loadLayouts(path.join(__dirname, 'fixtures/render/layouts'));
      }

      Engine.prototype.render = render.render;
      Engine.prototype.loadLayouts = loadLayouts;

      const engine = new Engine();
      const input = '<h1>Hallo {{name}}</h1>';
      const data = {
        name: 'John',
        title: 'This is a page title',
        layout: 'default'
      };

      const _render = engine.render(input, data);

      expect(
        _render.then(html => {
          const $ = cheerio.load(html);
          console.log();
          return $('title').html();
        })
      ).resolves.toEqual('This is a page title');

      expect(
        _render.then(html => {
          const $ = cheerio.load(html);
          console.log();
          return $('html').length;
        })
      ).resolves.toEqual(1);

      return expect(
        _render.then(html => {
          const $ = cheerio.load(html);
          return $('body h1').html();
        })
      ).resolves.toEqual('Hallo John');
    });
  });
});
