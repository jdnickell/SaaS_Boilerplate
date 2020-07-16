import ApiService from "../shared/ApiService";

export function authenticate(authenticationModel) {
  return ApiService.request({
    url: "/authentication",
    method: "POST",
    data: authenticationModel,
  });
}

const AuthenticationService = {
  authenticate,
};

export default AuthenticationService;
