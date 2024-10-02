import { createSlice } from "@reduxjs/toolkit";

export const wMenuSlice = createSlice({
  name: "wMenu",
  initialState: {
    isShow: true,
  },
  reducers: {
    setWMenuSlice: (state, action) => {
      state.isShow = action.payload
    },
  },
});


export const { setWMenuSlice } = wMenuSlice.actions;

export default wMenuSlice.reducer;
