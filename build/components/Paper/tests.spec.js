'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

jest.dontMock('./index');

var TestUtils = _reactAddons2['default'].addons.TestUtils;
var Paper = require('./index');

describe('Paper', function () {

  it('should render its children', function () {
    var paper = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
      Paper,
      null,
      _reactAddons2['default'].createElement(
        'span',
        null,
        'Hello there'
      )
    ));

    var divNode = TestUtils.findRenderedDOMComponentWithTag(paper, 'div');
    var spanNode = TestUtils.findRenderedDOMComponentWithTag(paper, 'span');

    expect(divNode.props.children.type).toEqual('span');
    expect(spanNode.props.children).toEqual('Hello there');
  });
});