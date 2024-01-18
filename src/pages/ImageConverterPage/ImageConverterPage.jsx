import styles from './ImageConverterPage.module.css';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import * as usersService from '../../utilities/users-service';

export default function FunctionPage() {
  const location = useLocation();
  const title = location.state.title;

  const [fileType, setFileType] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [inputFile, setInputFile] = useState(null);

  const handleChange = (event) => {
    setInputFile(event.target.files[0]);

    setFileType(event.target.files[0].name.slice(
      event.target.files[0].name.indexOf('.')
    ));
  };

  function arrayBufferToBase64(buffer) {
    const binary = new Uint8Array(buffer);
    const bytes = Array.from(binary);
    const binaryString = String.fromCharCode.apply(null, bytes);
    return btoa(binaryString);
  }

  const resultImageRef = useRef(null);

  async function handleFunction() {
    if (inputFile && convertTo && convertTo !== fileType) {
      const craftType = title.split(" ").join("");
      const response = await usersService.generateCraft(inputFile, craftType, convertTo);

      console.log(response.convertedImage.data);
      const responseData = response.convertedImage.data;
      const base64String = arrayBufferToBase64(responseData);

      resultImageRef.current.src = 'data:image/jpeg;base64,' + base64String;

    } else if (inputFile && convertTo && convertTo === fileType) {
      alert("Cannot convert to the same type of file");
    }
  }

  const options = [".jpg", ".png", ".webp", ".tiff", ".giff", ".svg", ".raw"];
  const selectedRef = useRef(null);
  
  const handleSelect = () => {
    setConvertTo(selectedRef.current.value)
  };

  return (
    <>
      <h1>{title}</h1>
      <main className={styles.main}>

        <div className={styles.fileSelectorDiv}>

              <h3>Select a file or drop it here</h3>
              <input type="file" onChange={handleChange} />

              <label htmlFor='select'>Select type to convert</label>
              <select ref={selectedRef} onClick={handleSelect}>
                {options.map((option, i) => {
                  return (
                    <option key={i} value={option}>{option}</option>
                  )
                })}
              </select>

              <button onClick={handleFunction}>Convert File</button>

        </div>

        <div className={styles.resultDiv}>
          {/* Display result based on the function result */}
          <img className={styles.resultImg} ref={resultImageRef} />
          <h3></h3>

          {/* <div className={styles.prevImage} style={{backgroundImage: `url("${inputRef && inputRef.current && inputRef.current.value}")`}}></div> */}
        </div>

      </main>
    </>
  )
}
