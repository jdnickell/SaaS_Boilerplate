import ApiService from "../shared/ApiService";

export async function authenticate(authenticationModel) {
  return await ApiService.request({
    url: "/authentication",
    method: "POST",
    data: authenticationModel,
  });
}

const AuthenticationService = {
  authenticate,
};

export default AuthenticationService;
