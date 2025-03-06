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

fetch.interceptors.response.use(
  (response) => {
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  },
  (error) => {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return {
        success: false,
        data: { message: "Không kết nối được server" },
        status: null,
      };
    } else {
      return {
        success: false,
        data: { message: error.message },
        status: null,
      };
    }
  }
);

export { fetch };
