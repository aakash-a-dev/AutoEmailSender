import React from 'react';
import { useHistory } from 'react-router-dom';

const IndexPage = () => {

  const handleOAuthClick = () => {
    // Redirect the user to the OAuth page
    window.location.href = 'http://localhost:8000/oauth';
  };

  return (
    <div>
      <h1>OAuth with Gmail</h1>
      <button onClick={handleOAuthClick}>OAuth with Gmail</button>
    </div>
  );
};

export default IndexPage;
