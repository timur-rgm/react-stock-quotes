import { AxiosResponse } from "axios";
import { http } from "./http";
import { StockType } from "../types/stocks";

export const getStockQuotes = async (): Promise<AxiosResponse<StockType[]>> => {
  return await http.get("/", {
    params: {
      collectionName: "Airlines",
      token: "pk_3934cbe140dc4250b8112d9a2ea01da9",
    },
  });
};
