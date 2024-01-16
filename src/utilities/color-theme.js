import { useState } from "react";

export function useThemeHandler() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  
  if (theme === "dark") {
    document.querySelector("body").style.background = "linear-gradient(#5A585A, #090947)";
  } else document.querySelector("body").style.background = "white";
  return [theme, setTheme];
};


export function bodyColor(theme, setTheme) {
  if (theme === "dark") {
    setTheme("light")
    document.querySelector("body").style.background = "white";
  }
  else {
    setTheme("dark");
    document.querySelector("body").style.background = "linear-gradient(#5A585A, #090947)";
  };
};