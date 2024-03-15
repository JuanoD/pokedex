import axios from "axios";
import { BASE_URL } from "@/utils/constants";
const common_headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { ...common_headers },
});

export default instance;
