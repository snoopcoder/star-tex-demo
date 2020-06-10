import React from 'react';
// import './helper.css';

const DisplayFormikState = (props) => (
  <div style={{ margin: '1rem 0' }}>
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

export default DisplayFormikState;
