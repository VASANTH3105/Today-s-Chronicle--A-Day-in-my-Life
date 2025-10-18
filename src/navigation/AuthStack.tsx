import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

// ✅ Import your theme hooks and themed components
import { useTheme } from '../context/ThemeContext';
import ThemedView from '../components/themed/ThemedView';
import ThemedText from '../components/themed/ThemedText';

import { login } from '../redux/appSlice';
import { AppDispatch } from '../redux/store';

export default function AuthStack() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme(); // ✅ Get colors from your theme context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    // Basic validation
    if (name.trim() && email.trim()) {
      dispatch(login({ name: name.trim(), email: email.trim() }));
    } else {
      // Use the native Alert for a better user experience
      Alert.alert('Missing Information', 'Please enter your name and email.');
    }
  };

  return (
    // Use SafeAreaView to avoid notches and system UI
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Let's Get Started 🚀</ThemedText>

        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          // ✅ Apply theme colors to the TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholderTextColor={colors.border} // Use a subtle placeholder color
        />

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          // ✅ Apply theme colors to the TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          placeholderTextColor={colors.border}
        />

        {/* ✅ Use a styled TouchableOpacity for a themeable button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});