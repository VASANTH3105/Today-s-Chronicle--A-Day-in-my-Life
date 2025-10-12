import React from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import ThemedView from '../themed/ThemedView';
import ThemedText from '../themed/ThemedText';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ThemeColors } from '../../constants/colors';
import { useTheme } from '../../context/ThemeContext';

export default function HomeHeader() {
  const user = useSelector((state: RootState) => state.app.user);
  const formattedDate = moment().format('dddd, MMMM D, YYYY');
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <ThemedView style={[styles.headerContainer, { backgroundColor: colors.card }]}>
    
        <ThemedText style={styles.welcomeText}>
          Welcome, <ThemedText style={styles.usernameText}>Vasanth</ThemedText>
        </ThemedText>
        <ThemedText style={styles.dateText}>{formattedDate.toUpperCase()}</ThemedText>
    </ThemedView>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    headerContainer: {
      paddingHorizontal: 20,
      paddingBottom: '6%',
      paddingTop: '3%',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    dateText: {
      fontSize: 12,
      fontWeight: '400',
      opacity: 0.7,
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: '300',
    },
    usernameText: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.primary,
    },
  });
