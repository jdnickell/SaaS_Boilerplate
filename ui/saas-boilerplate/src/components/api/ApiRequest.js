import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  // auth: { Authorization: "Bearer " + { token } },
});

const ApiRequest = function (options) {
  const onSuccess = function (response) {
    console.log("Request successful", response);
    return response.data;
  };

  const onError = function (error) {
    console.error("Request failed:", error.config);

    if (error.response) {
      // Successful request with something other than 2xx response
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      // Something errored setting up the request
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default ApiRequest;
