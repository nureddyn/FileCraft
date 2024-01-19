import styles from './Slider.module.css';
import React from 'react';

export default function Slider({ min, max, value, handleChange }) {
  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />        
    </div>
  )
}
