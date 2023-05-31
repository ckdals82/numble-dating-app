import axios from "axios";

const api = axios.create({
  baseURL: "http://52.79.226.246/",
});

export default api;
