import styles from './DropDown.module.css';
import React from 'react';
import { useState, useEffect } from "react";
import { ThemeContext } from '../../pages/App/App';

export default function DropDown({ isOpen, open, close, user }) {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') close();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    };
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, close]);

  if (!open) return null;

  return (
    <div className={styles.showDropdown} onClick={isOpen ? close : open}>
      {user && user.name} ▾
    </div>
  )
}
