import Authentication from "../api/Authentication";
import AuthenticationTokenService from "./AuthenticationTokenService";

async function getSignInResponse(signInModel) {
  try {
    let response = await Authentication.authenticate(signInModel);
    await AuthenticationTokenService.createAuthenticationCookie(response);
    return response.status;
  } catch (error) {
    return error.status;
  }
}

const SignInService = {
  getSignInResponse,
};

export default SignInService;
