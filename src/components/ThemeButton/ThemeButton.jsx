import styles from './ThemeButton.module.css';
import { bodyColor } from "../../utilities/color-theme";

export default function ThemeButton({theme, setTheme}) {
  // const [theme, setTheme] = useContext(ThemeContext);

  return (
      <div className={styles.themeButtonContainer}>
        <p>Light</p>
        <div
        className={theme === "light"
        ? styles.switchButtonLeft
        : styles.switchButtonRight}
        >
          <div className={styles.switchLever}
            onClick={() => bodyColor(theme, setTheme)}
          ></div>
        </div>
        <p>Dark</p>
      </div>
  )
}
