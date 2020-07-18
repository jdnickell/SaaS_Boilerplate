import Authentication from "../api/Authentication";
import Account from "../api/Account";
import AuthenticationTokenService from "./AuthenticationTokenService";

async function getRegisterResponse(registerModel) {
  try {
    let registerResponse = await Account.register(registerModel);
    let authenticateResponse = await Authentication.authenticate({
      username: registerModel.userEmail,
      password: registerModel.password,
    });

    await AuthenticationTokenService.createAuthenticationCookie(
      authenticateResponse
    );

    return registerResponse;
  } catch (error) {
    return error;
  }
}

const RegisterService = {
  getRegisterResponse,
};

export default RegisterService;
