import axios from "axios";
// Add a request interceptor
const axiosClient = axios.create();
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
});

axiosClient.defaults.baseURL = "http://192.168.1.106:8000";

const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  axiosClient.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
  console.error("CSRF token not found");
}
axiosClient.defaults.withCredentials = true;
axiosClient.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default axiosClient;
