import { create } from "zustand";
import { appThemeManager, DarkColors, LightColors } from "./Colors";

export interface ThemeManager{
  color:appThemeManager,
  isDark:boolean,
  onthemeChange: () => void
}

  export const useAppTheme = create<ThemeManager>((set)=>({
    isDark : true,
    color:DarkColors,
    onthemeChange: ()=> set((state)=>{

      const newDark = !state.isDark

      return {
          isDark:newDark,
          color: newDark ? DarkColors:LightColors
      }
    })
  }))

