'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

jest.dontMock('./index');

var TestUtils = _reactAddons2['default'].addons.TestUtils;
var Button = require('./index');

describe('Button', function () {

  it('should render its children', function () {
    var paper = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
      Button,
      null,
      'Follow'
    ));

    var buttonNode = TestUtils.findRenderedDOMComponentWithTag(paper, 'button');
    expect(buttonNode.props.children).toEqual('Follow');
  });

  it('should render as <button> when link=false', function () {
    var button = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
      Button,
      { link: false },
      'Follow'
    ));

    TestUtils.findRenderedDOMComponentWithTag(button, 'button');
  });

  it('should render as <a> when link=true', function () {
    var button = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
      Button,
      { link: true, external: true },
      'Follow'
    ));

    TestUtils.findRenderedDOMComponentWithTag(button, 'a');
  });

  it('should be able to provide a className', function () {
    var button = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
      Button,
      { className: "test-me" },
      'Follow'
    ));

    var buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.props.className).toContain('test-me');
  });

  it('should be able to bind onClick', function () {
    var wasClicked = false;

    // Render a button with an onClick handler
    var button = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
      Button,
      { onClick: function () {
          return wasClicked = true;
        } },
      'Follow'
    ));

    // Simulate a click
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));
    expect(wasClicked).toBeTruthy();
  });

  it('should be able to change the type to submit or reset', function () {
    var submitButton = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
      Button,
      { type: "submit" },
      'Submit'
    ));

    var submitButtonNode = TestUtils.findRenderedDOMComponentWithTag(submitButton, 'button');
    expect(submitButtonNode.props.type).toBe('submit');

    var resetButton = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
      Button,
      { type: "reset" },
      'Submit'
    ));
    var resetButtonNode = TestUtils.findRenderedDOMComponentWithTag(resetButton, 'button');
    expect(resetButtonNode.props.type).toBe('reset');
  });
});