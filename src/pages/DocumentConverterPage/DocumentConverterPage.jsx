import styles from './DocumentConverterPage.module.css';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import * as usersService from '../../utilities/users-service';

export default function DocumentConverterPage() {
  const location = useLocation();
  const title = location.state.title;

  const [fileType, setFileType] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [inputFile, setInputFile] = useState(null);

  const options = ["doc", "docx","pdf"];

  const handleChange = (event) => {
    // Get the file type
    let str = event.target.files[0].name;
    let index = str.indexOf('.');
    let subString = str.slice(index + 1);

    if (options.includes(subString)) {
      setInputFile(event.target.files[0]);

      // Get the file type
      let str = event.target.files[0].name;
      let index = str.indexOf('.');
      let subString = str.slice(index + 1);

      setFileType(subString);
    } else {
        event.target.value = '';
        alert("Document type not allowed");
      }
  };

  const resultImageRef = useRef(null);
  const messageRef = useRef(null);

  async function handleFunction() {
    if (inputFile && convertTo && convertTo !== fileType && options.includes(fileType)) {
      const craftType = title.split(" ").join("");

      // Send image to be converted in server side 
      const response = await usersService.generateCraft(inputFile, craftType, convertTo);

      messageRef.current.innerHTML = response.message;

      const responseData = response.convertedFile.content.data;

      const uint8Array = new Uint8Array(responseData);

      const link = document.createElement('a');
      
        
      if (response.convertedFile.type === 'docx') {

        const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        link.href = URL.createObjectURL(blob);

        link.download = 'converted.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (response.convertedFile.type === 'pdf') {
        
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        link.href = URL.createObjectURL(blob);
        
        link.download = 'converted.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      resultImageRef.current.innerHTML = '📄';

    } else if (inputFile && convertTo && convertTo === fileType) {
      alert("Cannot convert to the same type of file");

    }
  }

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
                <option></option>
                
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
          <h1 className={styles.resultImg} ref={resultImageRef}></h1>
          <h4 className={styles.message} ref={messageRef}></h4>
        </div>

      </main>
    </>
  )

}
