import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchStocks } from "./asynqActions";
import { LoadingStatuses } from "../../const";
import { StockType } from "../../types/stocks";

export interface CounterState {
  stocks: StockType[];
  loadingStatus: LoadingStatuses;
}

const initialState: CounterState = {
  stocks: [],
  loadingStatus: LoadingStatuses.Loading,
};

export const quotesSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStocks.pending, (state) => {
      state.stocks = [];
      state.loadingStatus = LoadingStatuses.Loading;
    });
    builder.addCase(
      fetchStocks.fulfilled,
      (state, action: PayloadAction<StockType[]>) => {
        state.stocks = action.payload;
        state.loadingStatus = LoadingStatuses.Success;
      }
    );
    builder.addCase(fetchStocks.rejected, (state) => {
      state.stocks = [];
      state.loadingStatus = LoadingStatuses.Error;
    });
  },
});

export default quotesSlice.reducer;
