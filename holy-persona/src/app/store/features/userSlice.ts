import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    biblicalMatch?: string;
    matchPercentage?: number;
  } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateBiblicalMatch: (
      state,
      action: PayloadAction<{ character: string; percentage: number }>
    ) => {
      if (state.user) {
        state.user.biblicalMatch = action.payload.character;
        state.user.matchPercentage = action.payload.percentage;
      }
    },
  },
});

export const { setUser, clearUser, updateBiblicalMatch } = userSlice.actions;
export default userSlice.reducer; 