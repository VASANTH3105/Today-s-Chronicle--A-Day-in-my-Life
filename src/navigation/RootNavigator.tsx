import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import { RootStackParamList } from './types';
import OnboardingStack from './OnboardingStack';
import AuthStack from './AuthStack';

// Assume you have hooks to check these states
const userIsAuthenticated = true; // Replace with logic from your state
const userHasOnboarded = true;  // Replace with logic from your state

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userHasOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        ) : !userIsAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={AppTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}