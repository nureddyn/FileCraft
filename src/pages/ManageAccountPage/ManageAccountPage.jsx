import styles from './ManageAccountPage.module.css';
import React, { useState, useContext, useRef } from 'react';
import { ThemeContext } from '../App/App';
import * as usersService from '../../utilities/users-service';
import profileOptions from '../../models/profileOptions';

export default function ManageAccountPage() {
  async function handleCheckToken() {
    const expDate = await usersService.checkToken();
    alert(expDate);
  };

  
  const [theme, setTheme] = useContext(ThemeContext);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [currentOption, setCurrentOption] = useState(profileOptions[0]);

  const handleChange = (e, i) => {
    setSelectedOptionIndex(i);
    setCurrentOption(profileOptions[i]);
  };

  const inputRef = useRef(null);

  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('userPhoto'));

  async function handleSubmit() {
    // To change profile photo
    if (inputRef.current.type === 'file') {
      const userId = usersService.getUser()._id;
      const photo = inputRef.current.files[0];
      
      const response = await usersService.changePhoto(userId, photo);

      if (response) {
        try {
          const imageBase64 = usersService.arrayBufferToBase64(response.photo.data.data);
          console.log(response);
          setProfilePhoto(`data:${response.photo.contentType};base64,${imageBase64}`);
          localStorage.setItem('userPhoto', `data:${response.photo.contentType};base64,${imageBase64}`);
          window.location.reload()
        } catch (error) {
          console.error('Error converting image:', error);
        }
      }
    }
    // To change profile name
    else if (inputRef.current.type === 'text'){
      alert("changing profile name")
    }
  };
  // To delete profile photo
  async function handleDelete() {
    alert("deleting photo")
  }
  
  return (
    <div className={theme === 'light' ? styles.containerLight : styles.containerDark}>
      <h1>Manage Account</h1>
      <div className={styles.main}>
        <div className={styles.sideBar}>
          <div className={styles.options}>
          {profileOptions.map((option, i) => (
            <div key={i}
              onClick={(e) => handleChange(e, i)}
              className={theme === "light"
                ? `${styles.optionLight} ${i === selectedOptionIndex ? styles.active : ''}`
                : `${styles.optionDark} ${i === selectedOptionIndex ? styles.active : ''}`}
            >
              {option.name}
            </div>
          ))}
          <div className={theme === "light" ? styles.optionLight : styles.optionDark}
            onClick={handleCheckToken}
          >
            Check When My Login Expires
          </div>
          </div>
        </div>
        <div className={styles.showedOption}>
          <h2 className={styles.optionTitle}></h2>
            {currentOption && 
              <>
                <h3>{currentOption.name}</h3>
                <div>
                  {currentOption.actions.map((action, i) => (
                    <div key={i}>
                      <h4>{action.actionName}</h4>

                      { action.inputType === 'button'
                        ? <button onClick={handleDelete}>{action.actionName}</button>
                        : <>
                            <input ref={inputRef} type={action.inputType}/>
                            <button onClick={handleSubmit} type='submit'>Save Changes</button>
                          </> }
                    </div>
                    ))}
                    
                </div>
              </>
            }
        </div>
        <div className={styles.photoDiv}>
          <div className={styles.photo} style={{backgroundImage: `url('${profilePhoto}')`}}></div>
          <h3>{usersService.getUser().name}</h3>
        </div>
      </div>
    </div>
  )
}
