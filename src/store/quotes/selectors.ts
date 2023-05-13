import { RootState } from "../store";
import { LoadingStatuses } from "../../const";
import { StockType } from "../../types/stocks";

export const getItems = (state: RootState): StockType[] => state.stocks.stocks;

export const getLoadingStatus = (state: RootState): LoadingStatuses =>
  state.stocks.loadingStatus;
