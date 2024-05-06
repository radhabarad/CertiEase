import axios from "axios";

// console.log(process.env.REACT_APP_BASE_URL);
// console.log("INstance 1");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
// console.log("INstance 2");

console.log(process.env.REACT_APP_BASE_URL);

export default axiosInstance;
