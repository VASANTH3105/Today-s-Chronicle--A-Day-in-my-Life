import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    // Wrap your entire app with the ThemeProvider
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}