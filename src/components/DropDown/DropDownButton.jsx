import styles from './DropDownButton.module.css';
import React from 'react';
import { useState, useEffect, forwardRef } from "react";

const DropDown = forwardRef(({ isOpen, open, close, user }, ref) => {
  useEffect(() => {
    const handleEscapeClick = (event) => {
      if (event.key === 'Escape') close();
    };

    const handleOutboundClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeClick);
      document.addEventListener('click', handleOutboundClick);
    };
    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
      document.removeEventListener('click', handleOutboundClick);
    };
  }, [isOpen, close]);

  if (!open) return null;

  return (
    <div className={styles.showDropdown} onClick={isOpen ? close : open}>
      {user && user.name} ▾
    </div>
  )
})

export default DropDown;