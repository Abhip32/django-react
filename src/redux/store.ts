import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice.ts';
import userReducer from './reducers/userSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
