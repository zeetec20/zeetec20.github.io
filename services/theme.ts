import { setCookie, getCookie } from "cookies-next";
import { ThemeMode } from "@/types";

const setDarkMode = () => setCookie("theme", ThemeMode.dark)

const setLightMode = () => setCookie("theme", ThemeMode.light)

const getThemeMode = (): ThemeMode => {
  switch (getCookie("theme")?.toString()) {
    case "0":
      return ThemeMode.dark;
    case "1":
      return ThemeMode.light;
    default:
      return ThemeMode.light;
  }
}

const setThemeMode = (theme: ThemeMode) => {
  if (theme == ThemeMode.dark) {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
  }
  if (theme == ThemeMode.light) {
    document.body.classList.add("theme-light");
    document.body.classList.remove("theme-dark");
  }
}

export {
    setDarkMode,
    setLightMode,
    getThemeMode,
    setThemeMode
}
