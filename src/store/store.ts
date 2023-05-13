import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stocks/stocksSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();