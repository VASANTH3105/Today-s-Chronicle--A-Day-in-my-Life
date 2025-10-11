import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your stacks and screens
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import SettingsScreen from '../screens/app/settings/SettingsScreen';

// Import your param list types
import { AppTabParamList } from './types';
import { Home, Profile, Setting2 } from 'iconsax-react-native';

// 1. Import your theme hook
import { useTheme } from '../context/ThemeContext';

// 2. LinearGradient is no longer imported

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppTabs() {
  // 3. Get theme colors from the hook (isDark is no longer needed)
  const { colors } = useTheme();

  // 4. The gradientColors variable is removed

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          const variant: 'Bold' | 'Linear' = focused ? 'Bold' : 'Linear';

          if (route.name === 'HomeStack') {
            return <Home size={size} color={color} variant={variant} />;
          } else if (route.name === 'ProfileStack') {
            return <Profile size={size} color={color} variant={variant} />;
          } else if (route.name === 'Settings') {
            return <Setting2 size={size} color={color} variant={variant} />;
          }
          return null;
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,

        tabBarStyle: {
          
          backgroundColor: colors.card, // Use a theme color directly
          
        },

      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

