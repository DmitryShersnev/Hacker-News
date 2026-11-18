import newsReducer from "./slices/newsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { news: newsReducer },
});
