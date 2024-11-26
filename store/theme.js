import { defineStore } from "pinia";
import themes from "@/common/theme/theme.js";
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useThemeStore = defineStore("theme", {
  state: () => {
    return {
        theme: uni.getStorageSync('theme') || 'light',
        tabAndBarTheme: themes[uni.getStorageSync('theme') || 'light']
    };
  },
  actions: {
    setTheme(theme) {
      this.theme = theme;
      this.tabAndBarTheme = themes[theme]
    },
  }
});
