import { useState } from "react";

export function useThemeHandler() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  localStorage.setItem("theme", theme === "light" ? "light" : "dark");
  
  if (theme === "dark") {
    document.querySelector("body").style.backgroundImage = "#00303F";
  } else document.querySelector("body").style.background = "linear-gradient(#f9f8fd, #9df9ef)";
  return [theme, setTheme];
};


export function bodyColor(theme, setTheme) {
  if (theme === "dark") {
    setTheme("light")
    document.querySelector("body").style.background = "white";
  }
  else {
    setTheme("dark");
    document.querySelector("body").style.background = "#00303F";
  };
};