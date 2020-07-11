import request from "../shared/ApiService";

function create(registrationModel) {
  console.log(registrationModel);
  return request({
    url: "/account",
    method: "POST",
    data: registrationModel,
  });
}

const AccountService = {
  create,
};

export default AccountService;
