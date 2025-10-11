import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS, { ThemeColors } from '../constants/colors';

// Define the key for storing the theme
const THEME_KEY = '@user_theme';

interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
  isThemeLoading: boolean; // Add a loading state
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceScheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light initially
  const [isThemeLoading, setIsThemeLoading] = useState(true); // Start in a loading state

  // Effect to load the theme from storage when the app starts
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme) {
          setTheme(savedTheme as 'light' | 'dark');
        } else {
          // If no theme is saved, use the device's preference
          setTheme(deviceScheme || 'light');
        }
      } catch (error) {
        // In case of an error, default to the device's theme
        console.error('Failed to load theme from async storage', error);
        setTheme(deviceScheme || 'light');
      } finally {
        setIsThemeLoading(false);
      }
    };

    loadTheme();
  }, [deviceScheme]); // Re-check if the device's theme preference changes

  // Function to toggle and save the theme
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme to async storage', error);
    }
  };

  const colors = COLORS[theme];
  const isDark = theme === 'dark';

  const value = {
    theme,
    colors,
    toggleTheme,
    isDark,
    isThemeLoading,
  };

  // While the theme is loading, you can return a loading indicator or null
  if (isThemeLoading) {
    return null; // Or <ActivityIndicator />, <SplashScreen />, etc.
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
