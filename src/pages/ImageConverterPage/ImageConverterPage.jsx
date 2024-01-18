import styles from './ImageConverterPage.module.css';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Compress from "browser-image-compression";

import * as usersService from '../../utilities/users-service';

export default function FunctionPage() {
  const location = useLocation();
  const title = location.state.title;

  const [file, setFile] = useState();
  const [compressedFile, setCompressedFile] = useState(null);

  const handleChange = (event) => {
    let fileToCompress = event.target.files[0];
    setCompressedFile(fileToCompress);
    // Compression config
    const options = {
      // As the key specify the maximum size
      // Leave blank for infinity
      maxSizeMB: 1,
      // Use webworker for faster compression with
      // the help of threads
      useWebWorker: true
    };

    // Initialize compression
    // First argument is the file object from the input
    // Second argument is the options object with the
    // config
    // Compress(fileToCompress, options)
    //   .then((compressedBlob) => {
    //     // Compressed file is of Blob type
    //     // You can drop off here if you want to work with a Blob file
    //     console.log(compressedBlob);
    //     setCompressedFile(compressedBlob);
    //     // setCompressedFile({
    //     //   imageUrl: URL.createObjectURL(compressedBlob)
    //     // });

    //     // // If you want to work with the File
    //     // // Let's convert it here, by adding a couple of attributes
    //     // compressedBlob.lastModifiedDate = new Date();

    //     // // Conver the blob to file
    //     // const convertedBlobFile = new File([compressedBlob], file.name, {
    //     //   type: file.type,
    //     //   lastModified: Date.now()
    //     // });

    //     // Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
    //   })
    //   .catch((e) => {
    //     // Show the user a toast message or notification that something went wrong while compressing file
    //     console.log('Errour');
    //   });
  };

  const inputRef = useRef(null);


  

  async function handleFunction() {
    if (compressedFile) {
      // const compressedFile = compress(inputRef.current.value);
      // console.log(inputRef.current.files[0]);
      const response = await usersService.generateCraft(compressedFile);

      console.log(response);
    }
  }

  return (
    <>
      <h1>{title}</h1>
      <main className={styles.main}>

        <div className={styles.fileSelectorDiv}>

              <h3>Select a file or drop it here</h3>
              <input ref={inputRef} type="file" onChange={handleChange} />

              <p>{file && file.name}</p>
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
