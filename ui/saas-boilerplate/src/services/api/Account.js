import ApiService from "../shared/ApiService";

export function register(registrationModel) {
  console.log(registrationModel);
  return ApiService.request({
    url: "/account",
    method: "POST",
    data: registrationModel,
  });
}

export function get() {
  return ApiService.request({
    url: "/account",
    method: "GET",
  });
}

const AccountService = {
  register,
  get,
};

export default AccountService;
