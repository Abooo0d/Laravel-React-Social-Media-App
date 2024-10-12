import axios from "axios";
// Add a request interceptor
const axiosClient = axios.create();
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
});
export default axiosClient;
