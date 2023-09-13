import React from 'react';

const PasswordChangedMessage = () => {
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
      <h2 style={headerStyle}> Password Changed Successfully</h2>
      <p style={paragraphStyle}>Password has been changed successfully now you can login again .</p>
    </div>
  );
};

export default PasswordChangedMessage;
