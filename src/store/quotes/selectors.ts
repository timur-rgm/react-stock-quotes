import { RootState } from "../store";
import { LoadingStatuses } from "../../const";
import { StocksType } from "../../types/stocks";

export const getItems = (state: RootState): StocksType => state.quotes.quotes;

export const getLoadingStatus = (state: RootState): LoadingStatuses =>
  state.quotes.loadingStatus;
