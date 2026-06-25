import { create } from "zustand";

type ThemeState = {
  preferredTheme: "dark-premium";
  setPreferredTheme: (theme: "dark-premium") => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  preferredTheme: "dark-premium",
  setPreferredTheme: (theme) => set({ preferredTheme: theme }),
}));
