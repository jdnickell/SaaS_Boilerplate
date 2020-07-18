import CookieService from "./CookieService";

const AUTHENTICATION_COOKIE_NAME = "saas_boilerplate_authentication";

async function getAuthenticationCookie() {
  return await CookieService.getCookie(AUTHENTICATION_COOKIE_NAME);
}

async function createAuthenticationCookie(response) {
  var authToken = {
    Token: response.data.token,
  };
  var authTokenString = JSON.stringify(authToken);
  await CookieService.createCookie(
    AUTHENTICATION_COOKIE_NAME,
    authTokenString,
    1
  );
}

const AuthTokenService = {
  getAuthenticationCookie,
  createAuthenticationCookie,
};

export default AuthTokenService;
