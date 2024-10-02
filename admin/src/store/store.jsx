import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import wMenuSlice from "./wMenuSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    wMenu: wMenuSlice,
  },
});
