import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UI {
  isLoading: boolean;
}

const initialState: UI = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateLoading(state: UI, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { updateLoading } = uiSlice.actions;

export default uiSlice.reducer;
