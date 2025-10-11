import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-paper"; // 👈 Import Switch
import { useTheme } from "../../../context/ThemeContext";
import AppHeader from "../../../components/common/AppHeader";
import ThemedView from "../../../components/themed/ThemedView";
import ThemedText from "../../../components/themed/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  // Get theme context
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader title="Settings" showGoBack={true} showSearch={true} />

      <ThemedView style={styles.container}>
        <View
          style={[
            styles.row,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <ThemedText style={styles.label}>Dark Mode</ThemedText>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            color={colors.primary}
          />
        </View>
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
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
  },
});
