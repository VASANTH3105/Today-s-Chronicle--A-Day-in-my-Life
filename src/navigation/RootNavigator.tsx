import React, { useEffect } from 'react'; // 👈 Import useEffect
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux'; // 👈 Import useDispatch
import { RootState, AppDispatch } from '../redux/store'; // 👈 Import AppDispatch
import { loadAppState } from '../redux/appSlice'; // 👈 Import the action

import AppTabs from './AppTabs';
import AuthStack from './AuthStack';
import OnboardingStack from './OnboardingStack';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const dispatch = useDispatch<AppDispatch>(); // 👈 Get the dispatch function

  const { isAuthenticated, hasOnboarded, isLoading } = useSelector(
    (state: RootState) => state.app
  );

  // ✅ Dispatch the action to load app state when the component mounts
  useEffect(() => {
    dispatch(loadAppState());
  }, [dispatch]); // The effect runs once on mount

  // Show loading while the app state is being loaded from AsyncStorage
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={AppTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}