import styles from './ImageFilterPage.module.css';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DEFAULT_OPTIONS from '../../models/filters';
import Slider from '../../components/Slider/Slider';
import * as usersService from '../../utilities/users-service';

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
    if (event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Use FileReader to read the selected file and set imagePreview state
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const previewRef = useRef(null);
  const handleChange = () => {
    currentPage === pageType.fileSelector && fileRef.current.value
    ? setCurrentPage(pageType.fileEditor)
    : setCurrentPage(pageType.fileSelector);
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

  const [imageId, setImageId] = useState();
  // Save image in db
  async function handleSave() {
    if (imagePreview) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      if (previewRef && previewRef.current) {
        // Set canvas dimensions to match image
        canvas.width = previewRef.current.clientWidth;
        canvas.height = previewRef.current.clientHeight;
      }
  
      // Apply filters to the canvas
      const filters = options.map(option => `${option.property}(${option.value}${option.unit})`);
      context.filter = filters.join(' ');
  
      // Draw the original image on the canvas
      const img = new Image();
      img.src = imagePreview;
  
      // Wrap the image loading logic in a Promise
      const imageLoadPromise = new Promise(resolve => {
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve();
        };
      });
  
      // Wait for the image to load before proceeding
      await imageLoadPromise;
  
      // Get the base64 encoded data URL of the canvas
      const filteredImageData = canvas.toDataURL('image/jpeg');

      // Convert base64 data to a Blob
      const imageToSend = dataURItoBlob(filteredImageData);

      const userId = usersService.getUser()._id;
  
      let response;
      // Save or send the filteredImageData to database
      if (!imageId) { 
        response = await usersService.saveImage(imageToSend, userId);
        response && response.data && setImageId(response.data._id);
      } else {
        response = await usersService.saveImage(imageToSend, userId, imageId);
      }
      alert(response.message);
    }
  }

  // Function to convert data URI to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }


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
              <div className={styles.optionsDiv}>
                <h2>Options</h2>
                <button 
                  className={styles.goBackButton}
                  onClick={handleChange}
                >
                  &#x2190; Select another image
                </button>

                <button 
                  className={styles.saveButton}
                  onClick={handleSave}
                >
                  Save Changes
                </button>

              </div>
              {imagePreview && (
                <img src={imagePreview}
                  className={styles.image}
                  style={getImageStyle()}
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
