import axios from "axios";
import { appConfig } from "../config";

console.log("appConfig.apiURL", appConfig.apiURL);
const axiosInstance = axios.create({
  baseURL: appConfig.apiURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
