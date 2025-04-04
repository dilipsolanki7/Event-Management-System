import React from 'react';

const Alert = ({ message, type = 'info' }) => (
  <div className={`alert alert-${type} p-2 border rounded`}>
    {message}
  </div>
);

export default Alert;
