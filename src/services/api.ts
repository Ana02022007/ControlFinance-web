// api.ts
import axios from "axios";
import { baseUrl } from "../config/apiConfig";

export const api = axios.create({
  baseURL: baseUrl,
});