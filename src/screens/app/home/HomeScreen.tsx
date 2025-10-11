import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Notification, Add, Airdrop } from 'iconsax-react-native'; // Import any icons you need

// Import your new components
import AppHeader from '../../../components/common/AppHeader';
import ThemedView from '../../../components/themed/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../../../components/common/HomeHeader';

export default function HomeScreen() {
  const { colors } = useTheme();

  const handleSearch = () => {
    console.log('Search icon pressed!');
    // Navigate to a search screen or open a search modal
  };

  const handleNotifications = () => {
    console.log('Notification icon pressed!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Example 1: Full-featured header */}
      <AppHeader
        title="Today's Chronicle"
        showGoBack={false}
        showSearch={true}
        onSearchPress={handleSearch}
        pageIcon={<Airdrop size="28" color={colors.accent} />}
        optionalIcon={<Notification size="24" color={colors.text} />}
        onOptionalIconPress={handleNotifications}
      />
      <HomeHeader />

      {/* Example 2: Simple header with just a title and back button */}
      {/* <AppHeader title="Settings" showGoBack={true} /> */}

      {/* Example 3: Header with only a title and a search button */}
      {/* <AppHeader title="Discover" showSearch={true} onSearchPress={handleSearch} /> */}

      <ThemedView style={styles.container}>
        {/* Your screen content goes here */}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});