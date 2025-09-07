import { configureStore } from "@reduxjs/toolkit";
import {accessReducer,appointmentReducer, consultationReducer, reviewsReducer } from "./accessSlice";

const store = configureStore({
  reducer: {
    access: accessReducer,
    appointment: appointmentReducer,
    consultation: consultationReducer,
    reviews: reviewsReducer,
  },
});

export default store;