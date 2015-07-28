jest.dontMock('./index');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
const Paper = require('./index');

describe('Paper', () => {

  it('should render its children', () => {
    const paper = TestUtils.renderIntoDocument(
      <Paper>
        <span>Hello there</span>
      </Paper>
    );

    const divNode = TestUtils.findRenderedDOMComponentWithTag(paper, 'div');
    const spanNode = TestUtils.findRenderedDOMComponentWithTag(paper, 'span');

    expect(divNode.props.children.type).toEqual('span');
    expect(spanNode.props.children).toEqual('Hello there');
  });

});
