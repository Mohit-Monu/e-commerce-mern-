import React from 'react';

const EmptyOrderMessage = () => {
  const emptyCartStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '5px',
    margin: '100px auto',
    maxWidth: '400px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
  };

  const headerStyle = {
    color: '#333',
    fontSize: '24px',
  };

  const paragraphStyle = {
    color: '#666',
    fontSize: '16px',
    marginTop: '10px',
  };

  return (
    <div style={emptyCartStyle}>
      <h2 style={headerStyle}> Email Sent Successfully</h2>
      <p style={paragraphStyle}>An Email has been sent successfully click on that link and create new password Please dont Share it with anyone.</p>
    </div>
  );
};

export default EmptyOrderMessage;
