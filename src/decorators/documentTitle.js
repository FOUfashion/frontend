import React from 'react';
import DocumentTitle from 'react-document-title';

/**
 * Wrap the component with a HoC to specify the document title.
 */
function documentTitle(title) {
  return (ComposedComponent) => class DocumentTitleDecorator {

    render() {
      return (
        <DocumentTitle title={title}>
          <ComposedComponent {...this.props} />
        </DocumentTitle>
      );
    }

  };
}

export default documentTitle;
