import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import RootNavigation from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
      <RootNavigation />
      </ThemeProvider>
    </Provider>
  );
}
