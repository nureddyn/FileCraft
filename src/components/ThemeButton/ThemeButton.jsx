import styles from './ThemeButton.module.css';
import { useContext } from "react";
import { ThemeContext } from '../../pages/App/App';
import { bodyColor } from "../../utilities/color-theme";

export default function ThemeButton() {
  const [theme, setTheme] = useContext(ThemeContext);

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
