import styles from './MyCraftsPage.module.css';
import React, { useState, useEffect } from 'react';
import * as usersService from '../../utilities/users-service';

export default function MyCraftsPage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonString = atob(localStorage.getItem('token').split('.')[1]);
        const parsedData = JSON.parse(jsonString);
        const userId = parsedData.user._id;

        const filesData = await usersService.getFiles(userId);

        if (filesData) {
          const processedImages = filesData.images.map((image) => ({
            ...image,
            imageData: `data:${image.imageData.contentType};base64,${usersService.arrayBufferToBase64(image.imageData.data.data)}`,
          }));
          
          const processedDocuments = filesData.docs.map((doc) => ({
            ...doc,
            docImage: "📄",
            docName: doc.docFileName,
          }))

          setFiles([
            { groupName: 'Images', files: processedImages },
            { groupName: 'Documents', files: processedDocuments },
          ]);
        }
      } catch (error) {
        console.error('Error fetching files data:', error);
      }
    };

    fetchData();
  }, []);

  async function handleDelete (fileId) {
    const response = await usersService.deleteFile(fileId);
    alert(response.message);
    window.location.reload()
  };

  return (
    <div className={styles.pageContainer}>
      <h1>My Crafts</h1>
      <div className={styles.groupList}>
        {files.map((group, index1) => (
          <div key={index1} className={styles.group}>
            <h2>{group.groupName}</h2>
            <div className={styles.itemList}>
              {group.files.map((file, index2) => {
                if (group.groupName === 'Images') {
                  return (
                    <div className={styles.imageDiv}>
                      <div key={index2} className={styles.image} style={{backgroundImage: `url('${file.imageData}')`}}></div>
                      <div onClick={() => handleDelete(file._id)} className={styles.deleteButton}>Delete</div>
                      <div className={styles.continueButton}>Continue editing</div>

                    </div>
                  )
                } else {
                  return (
                    <div key={index2} >{file.docImage}</div>
                  )
                }

              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
