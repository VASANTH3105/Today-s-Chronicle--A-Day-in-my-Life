import type { NavigatorScreenParams } from '@react-navigation/native';

// Params for stacks within the main app tabs
export type HomeStackParamList = {
  Home: undefined;
  PostDetails: { postId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

// Params for the bottom tabs themselves
export type AppTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>; // Note: Nested navigator
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  Settings: undefined;
};

// Params for auth screens
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// Top-level params for the root navigator
export type RootStackParamList = {
  Onboarding: undefined; // Assuming it's a single screen or a simple stack
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
};