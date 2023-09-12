import React from "react";
import Spinner from 'react-bootstrap/Spinner';
const Spin = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };
  return (
    <div style={containerStyle}>
      <Spinner animation="border" role="status">
      </Spinner>
    </div>
  );
}

export default Spin;
