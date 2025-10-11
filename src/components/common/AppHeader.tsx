import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft2, SearchNormal1 } from 'iconsax-react-native';

import { useTheme } from '../../context/ThemeContext';
import { ThemeColors } from '../../constants/colors';
import ThemedText from '../themed/ThemedText';

interface AppHeaderProps {
  title: string;
  showGoBack?: boolean;
  showSearch?: boolean;
  pageIcon?: React.ReactNode;
  optionalIcon?: React.ReactNode;
  onOptionalIconPress?: () => void;
  onSearchPress?: () => void;
}

export default function AppHeader({
  title,
  showGoBack = false,
  showSearch = false,
  pageIcon,
  optionalIcon,
  onOptionalIconPress,
  onSearchPress,
}: AppHeaderProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  // 1. Determine if there is any content on the left side
  const hasLeftContent = showGoBack || !!pageIcon; 
  
  // Pass both hasLeftContent and colors to the styles function
  const styles = getStyles(colors, hasLeftContent);

  return (
    <View style={styles.headerContainer}>
      {/* Left Section */}
      <View style={styles.leftContainer}>
        {showGoBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <ArrowLeft2 size="24" color={colors.text} />
          </TouchableOpacity>
        )}
        {pageIcon}
      </View>

      {/* Center/Left Section (Title) */}
      {/* 2. The style of this container is now dynamic */}
      <View style={styles.titleContainer}>
        <ThemedText style={styles.title} numberOfLines={1}>{title}</ThemedText>
      </View>

      {/* Right Section */}
      <View style={styles.rightContainer}>
        {optionalIcon && (
          <TouchableOpacity onPress={onOptionalIconPress} style={styles.iconButton}>
            {optionalIcon}
          </TouchableOpacity>
        )}
        {showSearch && (
          <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
            <SearchNormal1 size="24" color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// 3. The styles function now accepts a boolean to apply conditional styles
const getStyles = (colors: ThemeColors, hasLeftContent: boolean) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 5,
      // No flex property here, it will shrink to fit its content
    },
    titleContainer: {
      flex: 1, 
      alignItems: 'flex-start',
      marginHorizontal: '3%', // Add horizontal margin for spacing
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 16,
       // No flex property here, it will shrink to fit its content
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
    },
    iconButton: {
      padding: 4,
    },
  });