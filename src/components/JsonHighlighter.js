import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const JsonHighlighter = ({ code }) => (
  <SyntaxHighlighter language="json" style={docco}>
    {code}
  </SyntaxHighlighter>
)

JsonHighlighter.propTypes = {
  code: PropTypes.string.isRequired,
};

export default JsonHighlighter;
