import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  //auth: { Authorization: "Bearer " + { token } },
});

const request = function (options) {
  console.log("options");
  console.log(options);
  const onSuccess = function (response) {
    console.log("Request Successful!", response);
    return response.data;
  };

  const onError = function (error) {
    console.log("Request Failed:", error.config);

    if (error.response) {
      // Request was made but server responded with something other than 2xx
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
    } else {
      // Error occurred while setting up the request
      console.log("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
