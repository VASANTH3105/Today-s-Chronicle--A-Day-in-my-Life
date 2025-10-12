import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  name: string;
  email: string;
}

interface AppState {
  hasOnboarded: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
}

// Initial state
const initialState: AppState = {
  hasOnboarded: false,
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// ✅ Async Thunks for loading/saving data
export const loadAppState = createAsyncThunk('app/loadAppState', async () => {
  const onboarded = await AsyncStorage.getItem('@hasOnboarded');
  const storedUser = await AsyncStorage.getItem('@userData');

  return {
    hasOnboarded: onboarded === 'true',
    user: storedUser ? JSON.parse(storedUser) : null,
  };
});

export const completeOnboarding = createAsyncThunk('app/completeOnboarding', async () => {
  await AsyncStorage.setItem('@hasOnboarded', 'true');
  return true;
});

export const login = createAsyncThunk('app/login', async (userData: UserData) => {
  await AsyncStorage.setItem('@userData', JSON.stringify(userData));
  return userData;
});

export const logout = createAsyncThunk('app/logout', async () => {
  await AsyncStorage.removeItem('@userData');
  return null;
});

export const clearAllData = createAsyncThunk('app/clearAllData', async () => {
    await AsyncStorage.multiRemove(['@userData', '@hasOnboarded']);
    return null;
})

// ✅ Slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAppState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadAppState.fulfilled, (state, action) => {
        state.hasOnboarded = action.payload.hasOnboarded;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.user;
        state.isLoading = false;
      })
      .addCase(completeOnboarding.fulfilled, (state) => {
        state.hasOnboarded = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(clearAllData.fulfilled, (state) => {
        state.hasOnboarded = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});


export default appSlice.reducer;
