import ApiService from "../shared/ApiService";

export async function register(registrationModel) {
  return ApiService.request({
    url: "/account",
    method: "POST",
    data: registrationModel,
  });
}

const AccountService = {
  register,
};

export default AccountService;
