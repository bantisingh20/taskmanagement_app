import React, { createContext, useState, useContext, useEffect } from 'react';

// Create ThemeContext
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('theme-teal'); // Default theme

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'theme-teal';
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  // Change theme and save it to localStorage
  const changeTheme = (newTheme) => {
    document.body.classList.remove(theme);  // Remove old theme
    document.body.classList.add(newTheme);  // Add new theme
    localStorage.setItem('theme', newTheme);  // Save theme in localStorage
    setTheme(newTheme);  // Update theme state
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);
