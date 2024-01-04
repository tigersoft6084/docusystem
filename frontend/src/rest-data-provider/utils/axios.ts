import { HttpError } from "@refinedev/core";
import axios from "axios";
import {TOKEN_KEY} from "../../authProvider";
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        const auth = JSON.parse(token);
        const accessToken = auth.tokens.access.token;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };
    if (error.response.status == 401) {//Authorization needed
      localStorage.removeItem(TOKEN_KEY);
      window.location.reload();
    }
    return Promise.reject(customError);
  }
);

export { axiosInstance };
