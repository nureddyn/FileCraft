import styles from './ImageConverterPage.module.css';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import * as usersService from '../../utilities/users-service';

export default function FunctionPage() {
  const location = useLocation();
  const title = location.state.title;

  const [fileType, setFileType] = useState("");
  const [toConvert, setToConvert] = useState("");
  const [inputFile, setInputFile] = useState(null);

  const handleChange = (event) => {
    setInputFile(event.target.files[0]);

    setFileType(event.target.files[0].name.slice(
      event.target.files[0].name.indexOf('.')
    ));
  };

  async function handleFunction() {
    if (inputFile && toConvert && toConvert !== fileType) {
      const craftType = title.split(" ").join("");
      const response = await usersService.generateCraft(inputFile, craftType);

      console.log(response);
    } else alert("Cannot convert to the same type of file");
  }

  const options = [".jpg", ".png", ".webp", ".tiff", ".giff", ".svg", ".raw"];
  const selectedRef = useRef(null);
  
  const handleSelect = () => {
    setToConvert(selectedRef.current.value)
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
          <h3></h3>

          {/* <div className={styles.prevImage} style={{backgroundImage: `url("${inputRef && inputRef.current && inputRef.current.value}")`}}></div> */}
        </div>

      </main>
    </>
  )
}
