import styles from './FunctionList.module.css';
import React from 'react'

export default function FunctionList() {
  return (
    <main className={styles.main}>
      <div className={styles.function}>
        <div className={styles.functionTitleDiv}>
          {/* TODO: Display title dynamically */}
          <h1 className={styles.h1}>Function title x</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className={styles.functionImageDiv}>Image</div>
        <div className={styles.functionPropertiesDiv}>Property list</div>
      </div>
      <div className={styles.options}>
        {/* TODO Display options dynamically */}
        <div className={styles.optionEach}>
          <div className={styles.optionTitle}><h3 className={styles.h3}>Option x</h3></div>
          <div className={styles.optionImage}>Image</div>
        </div>
        <div className={styles.optionEach}>
          <div className={styles.optionTitle}><h3 className={styles.h3}>Option x</h3></div>
          <div className={styles.optionImage}>Image</div>
        </div>
        <div className={styles.optionEach}>
          <div className={styles.optionTitle}><h3 className={styles.h3}>Option x</h3></div>
          <div className={styles.optionImage}>Image</div>
        </div>
      </div>
    </main>
  )
}
