import { createSlice } from "@reduxjs/toolkit";

export interface ToggleState {
  value: boolean;
}

const initialState: ToggleState = {
  value: true,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleMenu } = toggleSlice.actions;

export default toggleSlice.reducer;
