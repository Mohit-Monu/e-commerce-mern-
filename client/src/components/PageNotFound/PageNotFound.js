import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  link: {
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

function pagenotFound(){
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <p style={styles.message}>
        You can go back to the{' '}
        <span style={styles.link} onClick={() => window.history.back()}>
          previous page
        </span>{' '}
        or{' '}
        <NavLink to="/" style={styles.link}>
          return to the homepage
        </NavLink>
        .
      </p>
    </div>
  );
};

export default pagenotFound;