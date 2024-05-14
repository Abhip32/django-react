import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id:number;
  name: string;
  email:string;
  watchlists:Array<string>;
}

const initialState: User = {
  id:0,
  name: '',
  email:'',
  watchlists:[]
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state= action.payload; 
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
