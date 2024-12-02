import React, { createContext, useContext } from 'react';
import { theme } from './index';
import { styles } from './styles';

interface ThemeContextType {
  theme: typeof theme;
  styles: typeof styles;
}

const ThemeContext = createContext<ThemeContextType>({ theme, styles });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme, styles }}>
      {children}
    </ThemeContext.Provider>
  );
};
