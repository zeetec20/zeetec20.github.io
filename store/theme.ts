import { getThemeMode, setThemeMode } from "@/services/theme";
import { atom } from "recoil";

export const theme = atom({
  key: `theme_${(new Date()).getTime()}`,
  default: getThemeMode(),
  effects_UNSTABLE: [],
  effects: [
    ({ onSet }) => {
      onSet((newValue) => setThemeMode(newValue));
    },
  ],
});
