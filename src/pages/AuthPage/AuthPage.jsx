import styles from './AuthPage.module.css';
import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LogInForm/LoginForm'

export default function AuthPage({ setUser }) {
  const [authType, setAuthType] = useState('sign-up');

  const handleAuthType = () => {
    authType === 'sign-up' ? setAuthType('log-in') : setAuthType('sign-up');
  };

  const [welcomePage, setWelcomePage] = useState('log');

  const handlePage = () => {
    welcomePage === 'log' ? setWelcomePage('learn-more') : setWelcomePage('log');
  }

  return (
    <main className={styles.main}>
      {welcomePage === 'log'
        ?
        <>
          <div className={styles.authDiv}>
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
        </div>
        <div className={styles.welcomeDiv}>
          <h1>Convert your files easly with Filecraft</h1>
          <div className={styles.paragraph}>
            <p>
              With Filecraft you can convert document files, images, add filters, get photos
              from your Instagram account and much more!
            </p>
          </div>
          <h3 className={styles.learnMore}
            onClick={handlePage}
          >Learn more &#x2192;</h3>
        </div>
      </>
      : <div>
          <h1>Learning more</h1>
          <h3 className={styles.learnMore}
            onClick={handlePage}
          >
            &#x2190; Done
          </h3>
        </div>
      }
    </main> 
  );
}