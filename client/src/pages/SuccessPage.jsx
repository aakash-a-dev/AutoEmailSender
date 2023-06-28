import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch the email of the authenticated user from the server
    fetch('http://localhost:8000/email', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setEmail(data.email))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Success</h1>
      {email && <p>Email: {email}</p>}
    </div>
  );
};

export default SuccessPage;
