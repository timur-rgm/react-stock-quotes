import axios, { AxiosInstance } from "axios";

export const BASE_URL =
  "https://api.iex.cloud/v1/data/core/stock_collection/tag";

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const http = axiosClient;
