import { create } from "zustand";

type Theme = "light" | "dark"

interface ThemeStore{
    theme: Theme
    toggleTheme: () => void
    initializeTheme: () => void
    tab: string

    // setter
    setTheme: (theme: Theme) => void
    setTab: (tab: ThemeStore['tab']) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: "light",
    toggleTheme: () => set(
        (state) => ({
            theme: state.theme === "light" ? "dark" : "light",
        })
    ),
    setTheme: (theme) => set({theme}),
    initializeTheme: () => {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        set({theme: systemPrefersDark ? "dark" : "light"});
    },
    tab: 'text',
    setTab: (tab) => set({tab}),
}));