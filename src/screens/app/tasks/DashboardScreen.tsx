import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { loadTasks, Todo } from "../../../redux/tasksSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../../../components/themed/ThemedView";
import ThemedText from "../../../components/themed/ThemedText";
import COLORS from "../../../constants/colors";

type RootStackParamList = {
  Dashboard: undefined;
  TaskForm: { taskId?: string };
};
type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isLoading = useSelector((state: RootState) => state.tasks.isLoading);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const renderItem = ({ item }: { item: Todo }) => (
    <ThemedView>
    <TouchableOpacity
      style={styles.taskCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("TaskForm", { taskId: item.id })}
    >
      <View style={styles.taskTextContainer}>
        <ThemedText style={styles.taskTitle}>{item.taskName}</ThemedText>
        <ThemedText style={styles.taskMeta}>
          {item.priority} Priority • {item.status}
        </ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#B0B0B0" />
    </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.safeArea}>
      

      {isLoading && tasks.length === 0 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContainer,
            tasks.length === 0 && styles.emptyListContainer,
          ]}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks found. Add one!</Text>
          }
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("TaskForm", {})}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  listContainer: {
    padding: 16,
  },
  taskCard: {
    padding: 16,
    borderColor: COLORS.light.border,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  taskMeta: {
    fontSize: 14,
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#9CA3AF",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4F46E5",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default DashboardScreen;
