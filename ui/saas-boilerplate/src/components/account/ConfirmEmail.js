import React from "react";
import Account from "../../services/api/Account";
import Authentication from "../../services/api/Authentication";
import CookieService from "../../services/shared/CookieService";

//Testing Auth
// let token = "";

// const creds = {
//   username: "jdnickell@gmail.com",
//   password: "TestPassword123!",
// };
// Authentication.authenticate(creds)
//   .then((response) => {
//     token = response.token;
//     console.log("response token: ");
//     console.log(token);
//     CookieService.createCookie("AuthToken", token, 1);
//   })
//   .catch((error) => alert("An error occurred, please try again later."));

// Account.get()
//   .then((response) => {
//     console.log("response" + response);
//   })
//   .catch((error) => alert("An error occurred, please try again later."));

const ConfirmEmail = () => {
  return (
    <div>
      <div className="section">
        <div className="container center-text">
          <div className="title is-1 p-top-45 is-primary">Thank you!</div>
          <hr />
          <div className="subtitle is-4">
            <p>A confirmation has been sent to your email.</p>
            <p>
              Please click the link in your email to complete your registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmEmail;
