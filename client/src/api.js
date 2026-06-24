import axios from "axios";

const API = axios.create({
  baseURL: "https://product-browser-fpgk.onrender.com"
});

export default API;