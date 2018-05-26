const Email = require('email-templates');
const path = require('path');
const cheerio = require('cheerio');
const _ = require('lodash');

const engine = require('../index');

const email = new Email({
  views: {
    root: path.join(__dirname, 'fixtures/effe'),
    options: {
      extension: 'hbs',
      engineSource: engine({
        layouts: path.join(__dirname, 'fixtures/handlebars/layouts'),
        partials: path.join(__dirname, 'fixtures/handlebars/partials'),
        helpers: path.join(__dirname, 'fixtures/handlebars/helpers')
      })
    }
  }
});

describe('Effe', () => {
  it('should be render a single file', () => {
    expect(
      email.render('hbs', { name: 'John' }).then(html => {
        const $ = cheerio.load(html, { xmlMode: true });
        return $('html').length;
      })
    ).resolves.toEqual(0);

    return expect(
      email.render('hbs', { name: 'John' }).then(html => {
        return _.trim(html);
      })
    ).resolves.toEqual('Hello John!');
  });

  it('should be render all', () => {
    const _renderAll = email.renderAll('all', { name: 'John' });

    expect(_renderAll.then(o => _.isObject(o))).resolves.toBe(true);
    expect(_renderAll.then(o => Object.keys(o))).resolves.toEqual(
      expect.arrayContaining(['subject', 'html', 'text'])
    );
    expect(_renderAll.then(o => _.trim(o.subject))).resolves.toBe('Hello John!');
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('html').length;
      })
    ).resolves.toBe(1);
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('body p').html();
      })
    ).resolves.toBe('Hello John!');
    return expect(_renderAll.then(o => _.trim(o.text))).resolves.toBe('Hello John!');
  });

  it('should be render with Inky html tag', () => {
    const _renderAll = email.renderAll('inky', { name: 'John' });

    expect(_renderAll.then(o => _.isObject(o))).resolves.toBe(true);
    expect(_renderAll.then(o => Object.keys(o))).resolves.toEqual(
      expect.arrayContaining(['subject', 'html', 'text'])
    );
    expect(_renderAll.then(o => _.trim(o.subject))).resolves.toBe('Hello John!');
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('body table.wrapper').length;
      })
    ).resolves.toBe(1);
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('table.button').text();
      })
    ).resolves.toBe('Click Me!');
    return expect(_renderAll.then(o => _.trim(o.text))).resolves.toBe('Hello John!');
  });

  it('should be render with header data options', () => {
    const _renderAll = email.renderAll('withHeaderData', { name: 'John' });

    expect(_renderAll.then(o => _.isObject(o))).resolves.toBe(true);
    expect(_renderAll.then(o => Object.keys(o))).resolves.toEqual(
      expect.arrayContaining(['subject', 'html', 'text'])
    );
    expect(_renderAll.then(o => _.trim(o.subject))).resolves.toBe('Hello John!');
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('body table.wrapper').length;
      })
    ).resolves.toBe(1);
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('body table.wrapper p').text();
      })
    ).resolves.toBe('Hello Tim!');
    return expect(_renderAll.then(o => _.trim(o.text))).resolves.toBe('Hello John!');
  });

  it('should be render with helper', () => {
    const _renderAll = email.renderAll('withHelpers', { name: 'John' });

    expect(_renderAll.then(o => _.isObject(o))).resolves.toBe(true);
    expect(_renderAll.then(o => Object.keys(o))).resolves.toEqual(
      expect.arrayContaining(['subject', 'html', 'text'])
    );
    expect(_renderAll.then(o => _.trim(o.subject))).resolves.toBe('Hello John!');
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('body').length;
      })
    ).resolves.toBe(1);
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('body p').html();
      })
    ).resolves.toBe('Hello JOHN!');
    return expect(_renderAll.then(o => _.trim(o.text))).resolves.toBe('Hello John!');
  });

  it('should be render with other layout', () => {
    const _renderAll = email.renderAll('withOtherLayout', {
      layout: 'test',
      name: 'John'
    });

    expect(_renderAll.then(o => _.isObject(o))).resolves.toBe(true);
    expect(_renderAll.then(o => Object.keys(o))).resolves.toEqual(
      expect.arrayContaining(['subject', 'html', 'text'])
    );
    expect(_renderAll.then(o => _.trim(o.subject))).resolves.toBe('Hello John!');
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('body').length;
      })
    ).resolves.toBe(0);
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('div h1').html();
      })
    ).resolves.toBe('This is a other layout');
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('div p').html();
      })
    ).resolves.toBe('Hello John!');
    return expect(_renderAll.then(o => _.trim(o.text))).resolves.toBe('Hello John!');
  });

  it('should be render with other partial', () => {
    const _renderAll = email.renderAll('withPartials', { name: 'John' });

    expect(_renderAll.then(o => _.isObject(o))).resolves.toBe(true);
    expect(_renderAll.then(o => Object.keys(o))).resolves.toEqual(
      expect.arrayContaining(['subject', 'html', 'text'])
    );
    expect(_renderAll.then(o => _.trim(o.subject))).resolves.toBe('Hello John!');
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('body').length;
      })
    ).resolves.toBe(1);
    expect(
      _renderAll.then(o => {
        const $ = cheerio.load(o.html, { xmlMode: true });
        return $('p').html();
      })
    ).resolves.toBe('This is a hbs partial');
    return expect(_renderAll.then(o => _.trim(o.text))).resolves.toBe('Hello John!');
  });

  it('should be have no engine options', function() {
    const email = new Email({
      views: {
        root: path.join(__dirname, 'fixtures/effe'),
        options: {
          extension: 'hbs',
          engineSource: engine()
        }
      }
    });

    expect(
      email.render('hbs', { name: 'John' }).then(html => {
        const $ = cheerio.load(html, { xmlMode: true });
        return $('html').length;
      })
    ).resolves.toEqual(0);

    return expect(
      email.render('hbs', { name: 'John' }).then(html => _.trim(html))
    ).resolves.toEqual('Hello John!');
  });
});