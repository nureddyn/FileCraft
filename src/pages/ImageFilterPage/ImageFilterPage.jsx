import styles from './ImageFilterPage.module.css';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ImageFilterPage() {
  const location = useLocation();
  const title = location.state.title;
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);  

  const pageType = {
    fileSelector: "file-selector",
    fileEditor: "file-editor",
  };
  const [currentPage, setCurrentPage] = useState(pageType.fileSelector);
  const fileRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Use FileReader to read the selected file and set imagePreview state
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleChange = () => {
    currentPage === pageType.fileSelector && fileRef.current.value
      ? setCurrentPage(pageType.fileEditor)
      : setCurrentPage(pageType.fileSelector);
  };

  return (
    <>
      <h1>{title}</h1>
      <main className={styles.main}>
        {currentPage === pageType.fileSelector ? (
          <div className={styles.fileSelectorDiv}>
            <div className={styles.inputDiv}>
              <h3>Select a file or drop it here</h3>
              <input ref={fileRef} type="file" onChange={handleFileChange} />
              <p>{file && file.name}</p>
              <button onClick={handleChange}>Start</button>
            </div>
            <div className={styles.previewDiv}>
              {imagePreview &&
                <div className={styles.imagePreview}
                  style={{backgroundImage: `url('${imagePreview}')`}}
                />
              }
            </div>
          </div>
        ) : (
          <div className={styles.fileEditorDiv}>
            <div className={styles.imageDiv}>
              {imagePreview && (
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url('${imagePreview}')` }}
                />
              )}
            </div>
            <div className={styles.filtersDiv}>
              <button onClick={handleChange}>Select another image</button>
            </div>
          </div>
        )}

        <div className={styles.resultDiv}>
          {/* Display result based on the function result */}
          <h3></h3>
        </div>
      </main>
    </>
  );
}
