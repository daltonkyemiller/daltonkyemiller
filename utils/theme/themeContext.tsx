import {
    createContext,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from 'react';

type Theme = {
    theme: string | null;
    setTheme?: (theme: Theme['theme']) => void;
    toggleTheme?: () => void;
};

export const ThemeContext = createContext<Theme>({
    theme: 'light',
});

type ThemeProviderProps = {};
export const ThemeProvider = ({
    children,
}: PropsWithChildren<ThemeProviderProps>) => {
    const [theme, setTheme] = useState<Theme['theme']>(null);
    let userSetTheme = useRef<string | null>();
    useEffect(() => {
        const userTheme = localStorage.getItem('theme');
        userSetTheme.current = userTheme;
        if (userTheme) setTheme(userTheme);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const _setTheme = (theme: string) => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    };

    useEffect(() => {
        _setTheme(theme ?? userSetTheme.current ?? 'dark');
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
