// Define the structure for a single theme's colors
export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  primary: string;
  accent: string;
  border: string;
  tabInactive: string;
}

// Define the structure for all available themes
export interface AppTheme {
  light: ThemeColors;
  dark: ThemeColors;
}

const COLORS: AppTheme = {
  light: {
    background: '#F9F9F9', // Slightly off-white, easier on the eyes
    card: '#FFFFFF',       // Pure white cards stand out
    text: '#1C1C1E',       // Dark text for high contrast
    primary: '#4A69FF',    // A more vibrant, engaging blue
    accent: '#34C759',     // Good for success states
    border: '#E5E5EA',     // Subtle border color
    tabInactive: '#1C1C1E',// A neutral gray for inactive tabs
  },
  dark: {
    background: '#121212', // Standard dark background (prevents pure black eye strain)
    card: '#1E1E1E',       // Card is slightly lighter than the background
    text: '#EAEAEA',       // Slightly off-white text, softer than pure white
    primary: '#5C85FF',    // A brighter blue that pops on a dark background
    accent: '#9db6ffff',     // Consistent accent green
    border: '#2C2C2E',     // Subtle border for dark mode
    tabInactive: '#777777',// A muted gray that's visible but not distracting
  },
};

export default COLORS;