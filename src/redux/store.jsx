// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import teacherReducer from "./slices/teacherSlice";
import studentReducer from "./slices/studentSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher:teacherReducer,
    student:studentReducer,
  },
});

export default store;
