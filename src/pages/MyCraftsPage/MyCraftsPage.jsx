import styles from './MyCraftsPage.module.css';
import React, { useState, useEffect } from 'react';
import * as userService from '../../utilities/users-service';

export default function MyCraftsPage() {


  const [data, setData] = useState();
  useEffect(()=> {

    const fetchData = async () => {
      try {
        const jsonString = atob(localStorage.getItem('token').split('.')[1]);
        const parsedData = JSON.parse(jsonString);
        const userId = parsedData.user._id;

        const filesData = await userService.getFiles(userId);
        setData(filesData);
      } catch (error) {
        console.error('Error fetching files data:', error);
      }
    };

    fetchData();

  }, []);

  console.log(data);
  const savedFiles = [
    {
      groupName: 'a',
      files: [
        {
          name: 'name1.1',
          image: 'img1.1'
        },
        {
          name: 'name1.2',
          image: 'img1.2'
        }
      ]
    },
    {
      groupName: 'b',
      files: [
        {
          name: 'name2.1',
          image: 'img2.1'
        },
        {
          name: 'name2.2',
          image: 'img2.2'
        }
      ]
    }
  ];

  return (
    <div>
      <h1>My Crafts</h1>
      <div className={styles.groupList}>
        { savedFiles && savedFiles.map((group, index1) => {
          return (
            <div key={index1} className={styles.group}>
              <h2>{group.groupName}</h2>
              <div className={styles.itemList}>
                {group.files.map((file, index2) => {
                  return (
                    <div key={index2} className={styles.item}>
                      <div className={styles.itemImage}>{file.image}</div>
                      <div className={styles.itemName}>{file.name}</div>
                    </div>
                  )
                })}

              </div>
            </div>
          )})
        }
      </div>
    </div>
  )
}
