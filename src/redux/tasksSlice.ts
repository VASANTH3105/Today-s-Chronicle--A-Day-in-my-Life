import { createSlice, createAsyncThunk, PayloadAction, nanoid } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// ✅ FIX: Use a type-only import to break the circular dependency.
import type { RootState } from './store';

// --- 1. Define Task Data Types ---

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'partially done' | 'on hold' | 'postponed' | 'done';

export interface Todo {
  id: string;
  taskName: string;
  priority: Priority;
  status: Status;
  createdOn: string; // ISO 8601 Date string
  modifiedOn: string; // ISO 8601 Date string
  deadlineDate?: string | null; // Optional deadline date
  deadlineTime?: string | null; // Optional deadline time
  postponedUntil?: string | null; // Optional date/time if status is 'postponed'
}

// This is the data we need to create a *new* task
export type NewTaskData = {
  taskName: string;
  priority: Priority;
  deadlineDate?: string | null;
  deadlineTime?: string | null;
};

interface TasksState {
  tasks: Todo[];
  isLoading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
};

const TASKS_STORAGE_KEY = '@tasksData';

// --- 2. Define Async Thunks for Storage ---

export const loadTasks = createAsyncThunk('tasks/loadTasks', async () => {
  const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
  return storedTasks ? (JSON.parse(storedTasks) as Todo[]) : [];
});

export const addTask = createAsyncThunk<
  Todo, // Return type
  NewTaskData, // Argument type
  { state: RootState } // ThunkAPI config
>('tasks/addTask', async (taskData, { getState }) => {
  const newTask: Todo = {
    ...taskData,
    id: nanoid(),
    createdOn: new Date().toISOString(),
    modifiedOn: new Date().toISOString(),
    status: 'pending', // Default status for new tasks
  };

  const currentTasks = selectAllTasks(getState());
  const newTasks = [...currentTasks, newTask];
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
  return newTask;
});

export const updateTask = createAsyncThunk<
  Todo, // Return type
  Todo, // Argument: the *entire* updated task object
  { state: RootState }
>('tasks/updateTask', async (updatedTask, { getState }) => {
  const modifiedTask = {
    ...updatedTask,
    modifiedOn: new Date().toISOString(), // Auto-update modifiedOn
  };

  const currentTasks = selectAllTasks(getState());
  const newTasks = currentTasks.map((task: Todo) =>
    task.id === modifiedTask.id ? modifiedTask : task
  );
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
  return modifiedTask;
});

export const deleteTask = createAsyncThunk<
  string, // Return type: the ID of the deleted task
  string, // Argument type: the task ID to delete
  { state: RootState }
>('tasks/deleteTask', async (taskId, { getState }) => {
  const currentTasks = selectAllTasks(getState());
  const newTasks = currentTasks.filter((task: Todo) => task.id !== taskId);
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
  return taskId;
});

// --- 3. Create the Slice ---

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {}, // We use thunks for all operations
  extraReducers: (builder) => {
    builder
      // Load Tasks
      .addCase(loadTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadTasks.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(loadTasks.rejected, (state) => {
        state.isLoading = false;
      })
      // Add Task
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.tasks.push(action.payload);
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

// FIX: Export a selector to safely access tasks from the state
// Added a type assertion `as TasksState` to fix the 'unknown' type error.
export const selectAllTasks = (state: RootState) => (state.tasks as TasksState).tasks;

export default tasksSlice.reducer;

