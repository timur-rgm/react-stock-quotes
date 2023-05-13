import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStockQuotes } from "../../api/getStockQuotes";

export const fetchStocks = createAsyncThunk(
  "quotes/fetchQuotes",

  async () => {
    const { data } = await getStockQuotes();
    return data;
  }
);
