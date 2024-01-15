import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./reducerSlice";

export const store = configureStore({
  reducer: {
    notes: noteSlice,
  },
});
