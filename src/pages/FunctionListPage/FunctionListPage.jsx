import styles from './FunctionListPage.module.css';
import React, { useState } from 'react';
import functionalities from '../../models/functionalies';

export default function FunctionListPage() {
  
  const [functionality, setFunctionality] = useState();

  let func;
  const handleChange = (e) => {
    setFunctionality(e.target.innerHTML);
    let title = e.target.innerText;
    let foundFunc = functionalities.find(element => element.title === title);
    setFunctionality(foundFunc)
    // func = showFunc(functionality);
  };

  // const showFunc = (func) => {
  //   return [func.title, func.description, func.smallImage];
  // };
  
  return (
    <main className={styles.main}>
      <div className={styles.function}>
        <div className={styles.functionTitleDiv}>
          {/* TODO: Display title dynamically */}
          <h1 className={styles.h1}>{functionality && functionality.title}</h1>
          <p>{functionality && functionality.description}</p>
        </div>
        <div className={styles.functionImageDiv} style={{backgroundImage: `url('${functionality && functionality.smallImage}')`}}></div>
        <div className={styles.functionPropertiesDiv}>Property list</div>
      </div>
      <div className={styles.options}>
        {/* TODO Display options dynamically */}
        {functionalities.map((func, i) => {
          return (
            <div key={i} onClick={(e) => handleChange(e)} className={styles.optionEach}>
              <div className={styles.optionTitle}><h3 className={styles.h3}>{func.title}</h3></div>
              <div className={styles.optionImage} style={{backgroundImage: `url('${func.smallImage}')`}}></div>
            </div>
          )  
        })}
      </div>
    </main>
  )
}
