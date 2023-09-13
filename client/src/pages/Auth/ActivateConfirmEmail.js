
import React from 'react';

const ActivateConfirmEmail = () => {
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
      <h2 style={headerStyle}> Confirm Your Email</h2>
      <p style={paragraphStyle}>Please click on the link on your email to confirm email.</p>
    </div>
  );
};

export default ActivateConfirmEmail;
