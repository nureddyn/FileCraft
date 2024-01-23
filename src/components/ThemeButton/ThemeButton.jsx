import styles from './ThemeButton.module.css';
import { bodyColor } from "../../utilities/color-theme";
import { useContext } from 'react';
import { ThemeContext } from '../../pages/App/App';
export default function ThemeButton({theme, setTheme}) {
  // const [theme, setTheme] = useContext(ThemeContext);

  return (
      <div className={styles.themeButtonContainer}>
        <p>Light</p>
        <div
        onClick={() => bodyColor(theme, setTheme)}
        className={theme === "light"
        ? styles.switchButtonLeft
        : styles.switchButtonRight}
        >
          <div className={styles.switchLever}></div>
        </div>
        <p>Dark</p>
      </div>
  )
}
