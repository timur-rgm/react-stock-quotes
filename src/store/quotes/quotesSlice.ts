import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getQuotes } from './asynqActions'
import { LoadingStatuses } from "../../const";
import { StocksType } from "../../types/stocks";

export interface CounterState {
  quotes: StocksType;
  loadingStatus: LoadingStatuses
}

const initialState: CounterState = {
  quotes: [],
  loadingStatus: LoadingStatuses.Loading
};

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getQuotes.pending, (state) => {
      state.quotes = [];
      state.loadingStatus = LoadingStatuses.Loading;
    });
    builder.addCase(
      getQuotes.fulfilled,
      (state, action: PayloadAction<StocksType>) => {
        state.quotes = action.payload;
        state.loadingStatus = LoadingStatuses.Success;
      }
    );
    builder.addCase(getQuotes.rejected, (state) => {
      state.quotes = [];
      state.loadingStatus = LoadingStatuses.Error;
    });
  },
});

export default quotesSlice.reducer;