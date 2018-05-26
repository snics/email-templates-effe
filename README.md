# email-templates-effe

[![npm version](https://badge.fury.io/js/email-templates-effe.svg)](https://badge.fury.io/js/email-templates-effe)
[![Build Status](https://travis-ci.org/snics/email-templates-effe.svg?branch=master)](https://travis-ci.org/snics/email-templates-effe)
[![Coverage Status](https://coveralls.io/repos/github/snics/email-templates-effe/badge.svg?branch=master)](https://coveralls.io/github/snics/email-templates-effe?branch=master)
[![dependencies Status](https://david-dm.org/snics/email-templates-effe/status.svg)](https://david-dm.org/snics/email-templates-effe)
[![devDependencies Status](https://david-dm.org/snics/email-templates-effe/dev-status.svg)](https://david-dm.org/snics/email-templates-effe?type=dev)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/snics/email-templates-effe/blob/master/LICENSE)

> Email-templates-effe is an alternative engine for [email-templates](https://github.com/niftylettuce/email-templates) and add support for Foundation for Emails

### Dependencies
- [Node.js](https://nodejs.org/en/) (requires Angular 6 or higher, tested with v6, v8, v9 and v10)

### Installing

install `email-templates-effe` via npm:

```shell
npm install email-templates-effe --save
```

Or via yarn

```shell
yarn add email-templates-effe
```

### Usage

Once installed you need to import the module:
```javascript
const Email = require('email-templates');
const path = require('path');
const engine = require('email-templates-effe');

// Setup
const email = new Email({
  views: {
    root: path.join(__dirname, 'root/directory/to/all/email/files'),
    options: {
      extension: 'hbs',
      engineSource: engine({
        layouts: path.join(__dirname, 'handlebars/layouts'),
        partials: path.join(__dirname, 'handlebars/partials'),
        helpers: path.join(__dirname, 'handlebars/helpers')
      })
    }
  }
});

// Using email engine:
email
  .send({
    template: 'hallo',
    message: {
      to: 'mail@domain.com'
    },
    locals: {
      name: 'John'
    }
  })
  .then(res => {
    console.log('res.originalMessage', res.originalMessage)
  });
  .catch(console.error);
```

## Development

For the development you need Node.js v6 or higher. If you have Node.js installed you can use the following commands to run the test

Using npm:
```shell
npm install
npm run test:lint // Run lint test in watch
npm run test:watch // Run unit test in watch mode
```
or use yarn (yarn must be installed since it is not part of node.js.):
```shell
yarn install
yarn run test:lint // Run lint test in watch
yarn run test:watch // Run unit test in watch mode
```
### Built With
- [bluebird](https://www.npmjs.com/package/bluebird) - Good and fast promise library
- [cheerio](https://www.npmjs.com/package/cheerio) - It's like jQuery for Server
- [front-matter](https://www.npmjs.com/package/front-matter) - Extract meta data from documents.
- [glob](https://www.npmjs.com/package/glob) - Match files using the patterns used by the shell
- [handlebars](https://www.npmjs.com/package/handlebars) - Handlebars is a template engine
- [inky](https://www.npmjs.com/package/inky) - Inky is a template engine for Foundation for Emails tags
- [lodash](https://www.npmjs.com/package/lodash) - A helper library
- [strip-bom](https://www.npmjs.com/package/strip-bom) - Strip UTF-8 byte order mark (BOM) from a string

## Versioning

We use [Semantic Versioning](hhttp://semver.org/spec/v2.0.0.html) for versioning. For the versions available, see the [tags on this repository](https://github.com/snics/email-templates-effe/tags). 

## Authors

* **Nico Swiatecki** - *Initial work* - [Snics](https://github.com/snics)

See also the list of [contributors](https://github.com/snics/email-templates-effe/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
