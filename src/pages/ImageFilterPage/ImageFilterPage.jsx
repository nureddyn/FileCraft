import styles from './ImageFilterPage.module.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ImageFilterPage() {
  const location = useLocation();
  const title = location.state.title;
  const [file, setFile] = useState();
  
  return (
    <>
      <h1>{title}</h1>
      <main className={styles.main}>

        <div className={styles.fileSelectorDiv}>

              <h3>Select a file or drop it here</h3>
              <input type="file" />

              <p>{file && file.name}</p>
              <button>Convert File</button>

        </div>

        <div className={styles.resultDiv}>
          {/* Display result based on the function result */}
          <h3></h3>
        </div>

      </main>
    </>
  )
}
