// SettingsScreen.tsx

import React from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native"; // 👈 Import TouchableOpacity and Alert
import { Switch } from "react-native-paper";
import { useDispatch } from "react-redux"; // 👈 Import useDispatch
import { useTheme } from "../../../context/ThemeContext";
import AppHeader from "../../../components/common/AppHeader";
import ThemedView from "../../../components/themed/ThemedView";
import ThemedText from "../../../components/themed/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

// 👇 Import your actions and AppDispatch type
import { logout, clearAllData } from "../../../redux/appSlice";
import { AppDispatch } from "../../../redux/store";
import { LogoutCurve } from "iconsax-react-native";

const SettingsScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>(); // 👈 Get the dispatch function

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClearData = () => {
    // Show a confirmation dialog before clearing data
    Alert.alert(
      "Clear All Data?",
      "This will log you out and you will have to start from the onboarding screen. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear Data",
          onPress: () => dispatch(clearAllData()),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader title="Settings" showGoBack={true} />

      <ThemedView style={styles.container}>
        {/* Dark Mode Toggle */}
        <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ThemedText style={styles.label}>Dark Mode</ThemedText>
          <Switch value={isDark} onValueChange={toggleTheme} color={colors.primary} />
        </View>

        {/* ✨ NEW: Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 20, justifyContent: 'center', gap: 12}]}
        > 
        <LogoutCurve size="24" color={styles.destructiveText.color}/>
          <ThemedText style={[styles.label, styles.destructiveText]}>Logout</ThemedText>
        </TouchableOpacity>

        {/* ✨ NEW: Clear All Data Button */}
        <TouchableOpacity
          onPress={handleClearData}
          style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 20, justifyContent: 'center' }]}
        >
          <ThemedText style={[styles.label, styles.destructiveText]}>Clear All Data</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0,
  },
  label: {
    fontSize: 16,
  },
  // 👇 Style for the destructive action text
  destructiveText: {
    color: "#ff3b30", // A standard destructive action color
  },
});