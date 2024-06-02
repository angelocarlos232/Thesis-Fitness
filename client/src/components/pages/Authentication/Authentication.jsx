import React, { useState } from 'react';
import '../css/Authentication.css';
import Login from './Login';
import Register from './Register';

const Authentication = () => {
  const [willLogin, setWillLogin] = useState(true);

  const toggleForm = () => {
    setWillLogin(!willLogin);
  };

  return (
    <div>
      {willLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
    </div>
  );
};

export default Authentication;
