import styles from './FunctionListPage.module.css';
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App/App';
import { Link, useNavigate } from 'react-router-dom';
import functionalities from '../../models/functionalies';

export default function FunctionListPage() {

  const [theme, setTheme] = useContext(ThemeContext);
  const [functionality, setFunctionality] = useState();
  const navigate = useNavigate();


  const handleChange = (e, i) => {
    setSelectedOptionIndex(i);

    setFunctionality(e.target.innerHTML);
    let title = e.target.innerText;
    let foundFunc = functionalities.find(element => element.title === title);
    setFunctionality(foundFunc)
  };

  const toFunctionPage = () => {
    let route = functionality.title.split(' ').join('');
    navigate(`/functions/${route}`, {state: {title: functionality.title}})
  };


  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  return (
    <main className={theme === "light" ? styles.mainLight : styles.mainDark}>
      <div className={theme === "light" ? styles.functionLight : styles.functionDark}>
        <div className={styles.functionTitleDiv}>
          {/* TODO: Display title dynamically */}
          <h1 className={styles.h1}>{functionality && functionality.title}</h1>
          <p>{functionality && functionality.description}</p>
          {functionality &&
            <h3
            className={theme === "light" ? styles.startButtonLight : styles.startButtonDark}
            onClick={() => toFunctionPage()}>Start &#x2192;</h3>
          }  
        </div>
        <div
          className={styles.functionImageDiv}
          style={{backgroundImage: `url('${functionality && functionality.smallImage}')`}}></div>
        <div className={styles.functionPropertiesDiv}>
          <h3>{functionality && functionality.properties[0]}</h3>
          <ul className={styles.list}>
            {functionality && functionality.properties.map((elem, i) => {
              if (i > 0) {
                return (
                  <li key={i}>{elem}</li>
                )
              }
            })}
          </ul>
        </div>
      </div>
      <div className={styles.options}>
        {/* TODO Display options dynamically */}
        {functionalities.map((func, i) => {
          return (
            <div
              key={i}
              onClick={(e) => handleChange(e, i)}
              className={theme === "light"
                ? `${styles.optionEachLight} ${i === selectedOptionIndex ? styles.active : ''}`
                : `${styles.optionEachDark} ${i === selectedOptionIndex ? styles.active : ''}`}
            >
              <div className={styles.optionTitle}><h3 className={styles.h3}>{func.title}</h3></div>
              <div className={styles.optionImage} style={{backgroundImage: `url('${func.smallImage}')`}}></div>
            </div>
          )  
        })}
      </div>
    </main>
  )
}
