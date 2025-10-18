import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  addTask,
  NewTaskData,
  Priority,
  Status,
  Todo,
  updateTask,
} from "../../../redux/tasksSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "../../../components/themed/ThemedView";
import AppHeader from "../../../components/common/AppHeader";

// From your navigation file
type RootStackParamList = {
  Dashboard: undefined;
  TaskForm: { taskId?: string };
};
type TaskFormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TaskForm"
>;
type TaskFormScreenRouteProp = RouteProp<RootStackParamList, "TaskForm">;

interface Props {
  navigation: TaskFormScreenNavigationProp;
  route: TaskFormScreenRouteProp;
}

const TaskFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const { taskId } = route.params || {};
  const isEditMode = !!taskId;

  const existingTask = useSelector((state: RootState) =>
    taskId ? state.tasks.tasks.find((task) => task.id === taskId) : undefined
  );

  const dispatch = useDispatch<AppDispatch>();

  // --- Form State ---
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<Status>("pending");

  // Date/Time
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [deadlineTime, setDeadlineTime] = useState<Date | null>(null);
  const [postponedUntil, setPostponedUntil] = useState<Date | null>(null);

  // Date/Time Picker Visibility
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPostponedPicker, setShowPostponedPicker] = useState(false);

  // --- Logic ---

  useEffect(() => {
    // If it's edit mode and we found a task, populate the form
    console.log("EditData", JSON.stringify(existingTask, null, 2))
    if (isEditMode && existingTask) {
      setTaskName(existingTask.taskName);
      setPriority(existingTask.priority);
      setStatus(existingTask.status);
      setDeadlineDate(
        existingTask.deadlineDate ? new Date(existingTask.deadlineDate) : null
      );
      setDeadlineTime(
        existingTask.deadlineTime
          ? new Date(`1970-01-01T${existingTask.deadlineTime}Z`)
          : null
      );
      setPostponedUntil(
        existingTask.postponedUntil
          ? new Date(existingTask.postponedUntil)
          : null
      );
    }
  }, [isEditMode, existingTask]);

  const handleSave = () => {
    if (taskName.trim().length === 0) {
      // Add alert or validation
      return;
    }

    if (isEditMode && existingTask) {
      // --- Update Logic ---
      const updatedTodo: Todo = {
        ...existingTask,
        taskName,
        priority,
        status,
        deadlineDate: deadlineDate
          ? deadlineDate.toISOString().split("T")[0]
          : null,
        deadlineTime: deadlineTime
          ? deadlineTime.toISOString().split("T")[1].substring(0, 5)
          : null,
        postponedUntil:
          status === "postponed" && postponedUntil
            ? postponedUntil.toISOString()
            : null,
        // modifiedOn is set automatically by the thunk
      };
      dispatch(updateTask(updatedTodo));
    } else {
      // --- Create Logic ---
      const newTask: NewTaskData = {
        taskName,
        priority,
        deadlineDate: deadlineDate
          ? deadlineDate.toISOString().split("T")[0]
          : null,
        deadlineTime: deadlineTime
          ? deadlineTime.toISOString().split("T")[1].substring(0, 5)
          : null,
        // createdOn, modifiedOn, id, and status are set by the thunk
      };
      dispatch(addTask(newTask));
    }
    navigation.goBack();
  };

  // --- DateTime Picker Handlers ---

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
        console.log(JSON.stringify(selectedDate, null, 2))
      setDeadlineDate(selectedDate);
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
        console.log(JSON.stringify(selectedTime, null, 2))
      setDeadlineTime(selectedTime);
    }
  };

  const onPostponedChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowPostponedPicker(Platform.OS === "ios");
    if (selectedDate) {
      setPostponedUntil(selectedDate);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader title="Task" showGoBack={true} />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView style={styles.formContainer}>
          <Text style={styles.label}>Task Name</Text>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="e.g., Finish Redux slice"
          />

          <Text style={styles.label}>Priority</Text>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}
          >
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>

          <Text style={styles.label}>Status</Text>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Partially Done" value="partially done" />
            <Picker.Item label="On Hold" value="on hold" />
            <Picker.Item label="Postponed" value="postponed" />
            <Picker.Item label="Done" value="done" />
          </Picker>

          {/* --- Conditional Fields --- */}

          {status === "postponed" && (
            <>
              <Text style={styles.label}>Postponed Until</Text>
              <TouchableOpacity onPress={() => setShowPostponedPicker(true)}>
                <Text style={styles.dateText}>
                  {postponedUntil
                    ? postponedUntil.toLocaleString()
                    : "Select Date & Time"}
                </Text>
              </TouchableOpacity>
              {showPostponedPicker && (
                <DateTimePicker
                  value={postponedUntil || new Date()}
                  mode="datetime"
                  display="default"
                  onChange={onPostponedChange}
                />
              )}
            </>
          )}

          <Text style={styles.label}>Task Deadline (Optional)</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>
              {deadlineDate ? deadlineDate.toLocaleDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={deadlineDate || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.dateText}>
              {deadlineTime
                ? deadlineTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Select Time"}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={deadlineTime || new Date()}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}

          <Button
            title={isEditMode ? "Update Task" : "Create Task"}
            onPress={handleSave}
          />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "white",
  },
  dateText: {
    fontSize: 16,
    color: "#007AFF",
    paddingVertical: 12,
  },
});

export default TaskFormScreen;
