import React from 'react';
// 1. Import TextStyle
import { Text, type TextProps, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export type ThemedTextProps = TextProps;

export default function ThemedText({ style, ...rest }: ThemedTextProps) {
  const { colors } = useTheme();

  // 2. Apply the TextStyle type to your object
  const defaultStyle: TextStyle = {
    fontSize: 14,
    fontWeight: '400', // Now TypeScript knows '400' is a valid fontWeight
    color: colors.text,
  };

  return (
    <Text
      // This line will now work without errors
      style={[defaultStyle, style]}
      {...rest}
    />
  );
}