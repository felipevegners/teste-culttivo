import axios from "axios";

const API = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public",
  params: {
    apikey: "13ce570bc84e76c954ef2fd871c128c7"
  }
});

export default API;
