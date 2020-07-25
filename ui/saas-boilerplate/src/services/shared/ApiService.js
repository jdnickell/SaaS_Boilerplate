import axios from "axios";
import AuthenticationTokenService from "./AuthenticationTokenService";

function createClient() {
  const authCookie = AuthenticationTokenService.getAuthenticationCookie();
  if (authCookie) {
    let token = JSON.parse(authCookie).Token;
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  });

  return client;
}

async function request(options) {
  const onSuccess = function (response) {
    return response;
  };

  const onError = function (error) {
    if (error.response) {
      // Request was made but server responded with something other than 2xx
    } else {
      // Error occurred while setting up the request
    }

    return Promise.reject(error.response || error.message);
  };

  try {
    const client = createClient();
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

const ApiService = {
  request,
  createClient,
};

export default ApiService;
