import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import tasksReducer from './tasksSlice'; // 1. Import the new reducer

export const store = configureStore({
  reducer: {
    app: appReducer,
    tasks: tasksReducer, // 2. Add it to the store
  },
});

// ✅ Types for TypeScript (these will update automatically)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;