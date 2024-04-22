import styles from './NavBar.module.css';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../pages/App/App';
import DropDownButton from '../DropDown/DropDownButton';
import ThemeButton from '../ThemeButton/ThemeButton';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    localStorage.removeItem("userPhoto");
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  const [theme, setTheme] = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openModal = (event) => {
    setIsDropdownOpen(true);
  };
  const closeModal = (event) => {
    setIsDropdownOpen(false);
  };

  const [photoData, setPhotoData] = useState(localStorage.getItem('userPhoto'));

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/account');
  }

  const dropdownRef = useRef();
  return (
    <div className={theme === "light" ? styles.headerLight : styles.headerDark}>
      <div className={styles.logo}>
        <div className={theme === "light" ? styles.logoImageLight : styles.logoImageDark}></div>
        <p className={styles.logoName}>Filecraft</p>
      </div>
      <div className={styles.headerLinks}>
        <Link className={theme === 'light' ? styles.headerLinkLight : styles.headerLinkDark} to={'/functions'}>Start crafting</Link>
        <Link className={theme === 'light' ? styles.headerLinkLight : styles.headerLinkDark} to={'/saved'}>My crafts</Link>
        <Link className={theme === 'light' ? styles.headerLinkLight : styles.headerLinkDark} to={'/orders/new'}>Profile</Link>
      </div>
      <div ref={dropdownRef} className={styles.dropdownContainer}>
        <DropDownButton ref={dropdownRef} user={user && user} isOpen={isDropdownOpen} open={openModal} close={closeModal}  />
        {isDropdownOpen
          ? <div className={styles.dropdown}>
              <div
              style={{backgroundImage: photoData && `url(${photoData})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}
              className={styles.dropdownPhoto}></div>
              <label className={styles.dropdownLabel} htmlFor="options">{user && user.name}</label>
              <button onClick={handleNavigate} className={styles.dropdownButton}>Manage Account</button>
              <p className={styles.logoutButton} onClick={handleLogOut}>Log Out</p>
              <p>Change Mode</p>
              <ThemeButton theme={theme} setTheme={setTheme} />
            </div> 
          : ""}
      </div>
    </div>
  )
}
