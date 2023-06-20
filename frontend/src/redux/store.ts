import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./slices/student";

export const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});
export const dispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
