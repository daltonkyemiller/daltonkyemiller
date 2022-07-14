import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/theme/themeContext';

type ThemeSwitcherProps = {};

const ThemeSwitcher = ({}: ThemeSwitcherProps) => {
    const theme = useContext(ThemeContext);
    return (
        <div className={`absolute right-0 z-50`}>
            <button onClick={() => theme.toggleTheme!()}>
                Switch to {theme.theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
        </div>
    );
};

export default ThemeSwitcher;
