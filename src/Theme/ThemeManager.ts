import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appThemeManager, DarkColors, LightColors } from "./Colors";

export interface ThemeManager {
  color: appThemeManager;
  isDark: boolean;
  onthemeChange: () => void;
  loadTheme: () => Promise<void>;
}

export const useAppTheme = create<ThemeManager>((set) => ({
  isDark: true,
  color: DarkColors,

  onthemeChange: () =>
    set((state) => {
      const newDark = !state.isDark;
      AsyncStorage.setItem("isDark", JSON.stringify(newDark));
      return {
        isDark: newDark,
        color: newDark ? DarkColors : LightColors,
      };
    }),

  loadTheme: async () => {
    const stored = await AsyncStorage.getItem("isDark");
    if (stored !== null) {
      const isDark = JSON.parse(stored);
      set({ isDark, color: isDark ? DarkColors : LightColors });
    }
  },
}));
