import axios from "axios";
import CookieService from "./CookieService";

let token = CookieService.getCookie("AuthToken").toString();
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

function request(options) {
  const onSuccess = function (response) {
    return response;
  };

  const onError = function (error) {
    if (error.response) {
      // Request was made but server responded with something other than 2xx
    } else {
      // Error occurred while setting up the request
      console.log("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
}

const ApiService = {
  request,
};

export default ApiService;
