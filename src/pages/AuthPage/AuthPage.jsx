import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LoginForm';

export default function AuthPage({ setUser }) {
  const [authType, setAuthType] = useState('sign-up');

  const handleAuthType = () => {
    authType === 'sign-up' ? setAuthType('log-in') : setAuthType('sign-up');
  };
  return (
    <main>
      {authType === 'sign-up' 
        ? 
          <>
            <h1>Sign Up</h1>
            <SignUpForm setUser={setUser} />
          </>
        : 
        <>
          <h1>Log In</h1>
          <LoginForm setUser={setUser} />
        </>
      }
      <button onClick={handleAuthType}>
        {authType === 'sign-up' ? "Log In" : "Sign Up"}
      </button>
    </main>
  );
}