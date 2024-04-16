import axios from "axios";
import RefreshToken from "./RefreshToken";
import secureLocalStorage from "react-secure-storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

api.interceptors.response.use(
  (response) => response, // returns response if no error
  async (error) => {
    const originalRequest = error.config;

    // If the original request 401 (unauthorized) and the original request not retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await RefreshToken();

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${secureLocalStorage.getItem("accessToken")}`;

        return api(originalRequest);
      } catch (error) {
        console.log("Error refreshing token: ", error);
        throw error;
      }
    }

    // return error if not 401 or the original request is retry
    throw error;
  }
);

export default api;
