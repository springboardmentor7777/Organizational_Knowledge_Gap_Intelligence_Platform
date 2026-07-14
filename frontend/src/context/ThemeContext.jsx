import { createContext, useContext, useState, useCallback } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('purple');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const changeAccent = useCallback((color) => {
    setAccentColor(color);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, changeAccent }}>
      <div data-theme={theme} data-accent={accentColor} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
};

export default ThemeContext;
