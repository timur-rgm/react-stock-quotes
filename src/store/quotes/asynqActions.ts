import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../api/http";

export const getQuotes = createAsyncThunk(
  'quotes/fetchQuotes',

  async () => {
    const response = await http.get(`/`, {
      params: {
        collectionName: "Airlines",
        token: "pk_3934cbe140dc4250b8112d9a2ea01da9",
      },
    })
    return response.data
  }
)