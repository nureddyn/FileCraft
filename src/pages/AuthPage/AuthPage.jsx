import styles from './AuthPage.module.css';
import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LogInForm/LoginForm'
import Presentation from '../../components/Presentation/Presentation';

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
          <h1>Convert your files easily with Filecraft</h1>
          <div className={styles.paragraph}>
            <p>
              With Filecraft you can convert document files, images, add filters, get photos
              from your Instagram account and much more!
            </p>
          </div>
          <h3 className={styles.learnMoreButton}
            onClick={handlePage}
          >Learn more &#x2192;</h3>
        </div>
      </>
      : <div className={styles.learnMore}>
        <div className={styles.learnMoreHeader}>
          {/* <h3
            className={styles.learnMoreButton}
            onClick={handlePage}
          >
            &#x2190; Done
          </h3> */}
          <div className={styles.presentation}>
            <h1 className={styles.h1}>What you can do with Filecraft</h1>
            <Presentation handlePage={handlePage}/>
          </div>
        </div>
        </div>
      }
    </main> 
  );
}