import CookieService from "./CookieService";

function getAuthenticationCookie() {
  return CookieService.getCookie(
    process.env.REACT_APP_AUTHENTICATION_COOKIE_NAME
  );
}

function createAuthenticationCookie(response) {
  var authToken = {
    Token: response.data.token,
  };
  var authTokenString = JSON.stringify(authToken);
  CookieService.createCookie(
    process.env.REACT_APP_AUTHENTICATION_COOKIE_NAME,
    authTokenString,
    1
  );
}

const AuthTokenService = {
  getAuthenticationCookie,
  createAuthenticationCookie,
};

export default AuthTokenService;
