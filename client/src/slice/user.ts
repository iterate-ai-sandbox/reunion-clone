import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  fname: string;
  lname: string;
  email: string;
}

export interface UserState {
  data: UserData | null;
}

// Set the initial state
const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<UserData | null>) => {
      state.data = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
