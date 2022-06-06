import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8003",
});

export default instance;
