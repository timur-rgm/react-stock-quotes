import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from "./quotes/quotesSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();