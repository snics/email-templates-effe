const _ = require('lodash');
const render = require('../render');

describe('render', () => {
  describe('loadFiles', () => {
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
});
