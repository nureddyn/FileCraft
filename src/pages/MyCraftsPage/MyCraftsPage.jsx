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
        // console.log(filesData);

        if (filesData) {
          // filesData.images.map((image) => {
          //   console.log(image.imageData.data.data);
          // })
          const processedImages = filesData.images.map((image) => ({
            ...image,
            imageData: `data:${image.imageData.contentType};base64,${usersService.arrayBufferToBase64(image.imageData.data.data)}`,
          }));
          // console.log(processedImages);

          setFiles([
            { groupName: 'Images', files: processedImages },
            { groupName: 'Documents', files: filesData.docs },
          ]);
        }
      } catch (error) {
        console.error('Error fetching files data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1>My Crafts</h1>
      <div className={styles.groupList}>
        {files.map((group, index1) => (
          <div key={index1} className={styles.group}>
            <h2>{group.groupName}</h2>
            <div className={styles.itemList}>
              {group.files.map((file, index2) => (
                <div className={styles.image} key={index2} style={{backgroundImage: `url('${file.imageData}')`}}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
