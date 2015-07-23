import React from 'react';
import DocumentTitle from 'react-document-title';

function documentTitle(title) {
  return (ComposedComponent) => class DocumentTitleDecorator {
    render() {
      return (
        <DocumentTitle title={title}>
          <ComposedComponent />
        </DocumentTitle>
      );
    }
  };
}

export default documentTitle;
