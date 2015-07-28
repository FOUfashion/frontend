jest.dontMock('./index');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
const Button = require('./index');

describe('Button', () => {

  it('should render its children', () => {
    const paper = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(paper, 'button');
    expect(buttonNode.props.children).toEqual('Follow');
  });

  it('should render as <button> when link=false', () => {
    const button = TestUtils.renderIntoDocument(
      <Button link={false}>Follow</Button>
    );

    TestUtils.findRenderedDOMComponentWithTag(button, 'button');
  });

  it('should render as <a> when link=true', () => {
    const button = TestUtils.renderIntoDocument(
      <Button link={true} external>Follow</Button>
    );

    TestUtils.findRenderedDOMComponentWithTag(button, 'a');
  });

  it('should be able to provide a className', () => {
    const button = TestUtils.renderIntoDocument(
      <Button className="test-me">Follow</Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.props.className).toContain('test-me');
  });

  it('should be able to bind onClick', () => {
    let wasClicked = false;

    // Render a button with an onClick handler
    const button = TestUtils.renderIntoDocument(
      <Button onClick={() => wasClicked = true}>Follow</Button>
    );

    // Simulate a click
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));
    expect(wasClicked).toBeTruthy();
  });

  it('should be able to change the type to submit or reset', () => {
    const submitButton = TestUtils.renderIntoDocument(
      <Button type="submit">Submit</Button>
    );

    const submitButtonNode = TestUtils.findRenderedDOMComponentWithTag(submitButton, 'button');
    expect(submitButtonNode.props.type).toBe('submit');

    const resetButton = TestUtils.renderIntoDocument(
      <Button type="reset">Submit</Button>
    );
    const resetButtonNode = TestUtils.findRenderedDOMComponentWithTag(resetButton, 'button');
    expect(resetButtonNode.props.type).toBe('reset');
  });

});
