import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/home/HomeScreen';
import PostDetailsScreen from '../screens/app/home/PostDetailsScreen';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      // Add the screenOptions prop here
      screenOptions={{
        headerShown: false,      // Hides the header for all screens in this stack
        animation: 'fade',       // Sets the animation to a cross-fade
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
    </Stack.Navigator>
  );
}