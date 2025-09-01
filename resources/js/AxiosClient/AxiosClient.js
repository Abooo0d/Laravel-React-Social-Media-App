import axios from "axios";
// Add a request interceptor

const axiosClient = axios.create({
  baseURL: "https://192.168.1.106:8000",
  withCredentials: true, // send cookies (XSRF-TOKEN, session)
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
});
export default axiosClient;
