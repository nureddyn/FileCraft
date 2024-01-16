import styles from './NavBar.module.css';
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../pages/App/App';
import DropDown from '../DropDown/DropDown';
import ThemeButton from '../ThemeButton/ThemeButton';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  // return (
  //   <nav>
  //     <h1>{user && user.name}</h1>
  //     <Link to="/orders">Order History</Link>
  //     &nbsp; | &nbsp;
  //     <Link to="/orders/new">New Order</Link>
  //     &nbsp;&nbsp;<span>Welcome, {user.name}</span>
  //     &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
  //   </nav>
  // )

  const [theme, setTheme] = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openModal = (event) => {
    setIsDropdownOpen(true);
  };
  const closeModal = (event) => {
    setIsDropdownOpen(false);
  };

  const [photoData, setPhotoData] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userPhotoData = decodedToken.user.photo.data;

    // Convert the binary image data to a Data URL
    const uint8Array = new Uint8Array(userPhotoData.data);
    const blob = new Blob([uint8Array], { type: userPhotoData.contentType });
    const dataUrl = URL.createObjectURL(blob);
    setPhotoData(dataUrl);
  }, [])

  return (
    <div className={theme === "light" ? styles.headerLight : styles.headerDark}>
      <ThemeButton />
      <div className={styles.headerLinks}>
        <Link className={theme === 'light' ? styles.headerLinkLight : styles.headerLinkDark} to={'/orders'}>Index</Link>
        <Link className={theme === 'light' ? styles.headerLinkLight : styles.headerLinkDark} to={'/orders/new'}>Profile</Link>
      </div>
      <div className={styles.dropdownContainer}>
        <DropDown user={user && user} isOpen={isDropdownOpen} open={openModal} close={closeModal}  />
        {isDropdownOpen
          ? <div className={styles.dropdown}>
            {/* Add Profile photo */}
              <div style={{backgroundImage: `url(${photoData})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} className={styles.dropdownPhoto}></div>
              <label className={styles.dropdownLabel} htmlFor="options">{user && user.name}</label>
              <button className={styles.dropdownButton}>Manage Account</button>
              <p className={styles.logoutButton} onClick={handleLogOut}>Log Out</p>
              <p></p>
            </div> 
          : ""}
      </div>
    </div>
  )
}
