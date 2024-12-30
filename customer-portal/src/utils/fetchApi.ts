import axios from "axios";

const fetch = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

fetch.interceptors.request.use(
  (requestConfig) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      requestConfig.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { fetch };
