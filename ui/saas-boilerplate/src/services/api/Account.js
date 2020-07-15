import ApiService from "../shared/ApiService";

export function register(registrationModel) {
  return ApiService.request({
    url: "/account",
    method: "POST",
    data: registrationModel,
  });
}

const AccountService = {
  register,
  get,
};

export default AccountService;
