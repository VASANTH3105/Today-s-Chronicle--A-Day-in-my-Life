import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Use the standard ViewProps to accept all default props
export type ThemedViewProps = ViewProps;

export default function ThemedView({ style, ...rest }: ThemedViewProps) {
  const { colors } = useTheme();

  // The themed style that will be applied first
  const themeStyle = {
    backgroundColor: colors.background, // Default background color
  };

  return (
    <View
      // The user's style is applied last, allowing overrides
      style={[themeStyle, style]}
      {...rest}
    />
  );
}