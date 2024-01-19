import styles from './ImageFilterPage.module.css';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DEFAULT_OPTIONS from '../../models/filters';
import Slider from '../../components/Slider/Slider';

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

  const previewRef = useRef(null);
  const handleChange = () => {
    currentPage === pageType.fileSelector && fileRef.current.value
    ? setCurrentPage(pageType.fileEditor)
    : setCurrentPage(pageType.fileSelector);

    // Trying to delete previous reviewImage
    // if (currentPage === pageType.fileSelector && fileRef.current.value) {
    //   setCurrentPage(pageType.fileEditor)
    // } else {
    //   setCurrentPage(pageType.fileSelector);
    //   if (previewRef && previewRef.current && previewRef.current.style) {
    //     previewRef.current.style.backgroundImage = 'none';
    //   } 
    // }
  };

  // Functionality to add filters
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];

  const handleSliderChange = ({ target }) => {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      })
    })
  };

  const getImageStyle = () => {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    });
    return { filter: filters.join(' ') }
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
              {/* <p>{file && file.name}</p> */}

                <button
                  className={fileRef && fileRef.current && fileRef.current.value
                    ? styles.continueButtonEnabled
                    : styles.continueButtonDisabled
                  }
                  onClick={handleChange}
                >
                  Start crafting &#x2192;
                </button>

            </div>
            <div className={styles.previewDiv}>
              {imagePreview &&
                <div
                  ref={previewRef}
                  className={styles.imagePreview}
                  style={{backgroundImage: `url('${imagePreview}')`}}
                />
              }
            </div>
          </div>
        ) : (
          <div className={styles.fileEditorDiv}>
            <div className={styles.imageDiv}>
              <div className={styles.goBackDiv}>
                <button 
                  className={styles.goBackButton}
                  onClick={handleChange}
                >
                  &#x2190; Select another image
                </button>
              </div>
              {imagePreview && (
                <div
                  className={styles.image}
                  style={{backgroundImage: `url('${imagePreview}')`, ...getImageStyle()}}
                />
              )}
            </div>
            <div className={styles.filtersDiv}>
              <div className={styles.filtersList}>
                {options.map((option, i) => {
                  return (
                    <div
                      className={`${styles.filterButton} ${i === selectedOptionIndex ? styles.active : ''}`}
                      key={i}
                      onClick={() => setSelectedOptionIndex(i)}
                    >{option.name}</div>
                  )
                })}
              </div>
              <Slider 
              min={selectedOption.range.min}
              max={selectedOption.range.max}
              value={selectedOption.value}
              handleChange={handleSliderChange} />
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
