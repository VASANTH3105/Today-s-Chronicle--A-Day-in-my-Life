import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Notification, Airdrop } from 'iconsax-react-native';
import AppHeader from '../../../components/common/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../../../components/common/HomeHeader';
import First3d from '../../../components/threejs/First3d';
import DashboardScreen from '../tasks/DashboardScreen';
import { StackNavigationProp } from '@react-navigation/stack'; // Import navigation prop type

// This RootStackParamList should be defined in a central navigation types file,
// but we'll define it here for this example to work.
type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  TaskForm: { taskId?: string };
};

// Define the type for the HomeScreen's navigation prop
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: any;
}

// ✅ FIX: Accept `navigation` as a prop
export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const handleSearch = () => console.log('Search icon pressed!');
  const handleNotifications = () => console.log('Notification icon pressed!');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader
        title="Today's Chronicle"
        showSearch={true}
        onSearchPress={handleSearch}
        pageIcon={<Airdrop size="28" color={colors.accent} />}
        optionalIcon={<Notification size="24" color={colors.text} />}
        onOptionalIconPress={handleNotifications}
      />
      <HomeHeader />

      {/* 👇 Remove the ThemedView wrapper and apply its style to First3d */}
      {/* <First3d style={styles.container} /> */}
      
      {/* ✅ FIX: Pass the received navigation prop down to DashboardScreen */}
      <DashboardScreen navigation={navigation} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // The background must be transparent to see the 3D scene
    backgroundColor: 'transparent', 
    flex: 1,
    // You can remove the border styles now
    // borderWidth: 5,
    // borderColor: '#ffffff',
  },
});
