import React, { useRef, useState } from "react";
import Account from "../../services/api/Account";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import "../../App.css";
import "./account.css";

const Register = () => {
  const { register, errors, handleSubmit, watch } = useForm({});
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState(
    null
  );
  const history = useHistory();
  const password = useRef({});
  password.current = watch("password", "");

  function onSubmit(registrationModel) {
    setRegistrationErrorMessage(null);
    Account.register(registrationModel)
      .then((response) => {
        //Service.ValidationServices.Enums.ValidateRegistrationResultType
        switch (response.data) {
          case 2:
            setRegistrationErrorMessage(
              "An account has already been registered with this email."
            );
            return;
          case 3:
            setRegistrationErrorMessage(
              "Invalid activation code, please try again."
            );
            return;
          case 4:
            setRegistrationErrorMessage(
              "This activation code has already been used."
            );
            return;
          default:
            history.push("/ConfirmEmail");
        }
      })
      .catch((error) => alert("An error occurred, please try again later."));
  }

  return (
    <div className="columns is-centered">
      <div className="column">
        <div className="section">
          <div className="container">
            <div className="media is-pulled-right">
              <div className="media-content">
                <Link to="/signin">
                  <button className="button is-link is-outlined githubSignin">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
            <div className="title">Register</div>
            {registrationErrorMessage ? (
              <div className="notification is-danger m-top-45 column">
                <div>
                  <p>{registrationErrorMessage}</p>
                </div>
              </div>
            ) : (
              <div className="notification is-primary m-top-45 column">
                <div>
                  <p>
                    Create an account with your activation code to get started.
                  </p>
                </div>
              </div>
            )}

            <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="field">
                  <label className="label" htmlFor="activationcode">
                    Activation Code
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="ABCD-1234-DEFG"
                      name="activationcode"
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /(?:^[A-Za-z]{4})[- ]?\d{4}[- ]?([A-Za-z]{4}|\d{4})/,
                          message: "Invalid activation code",
                        },
                      })}
                    />
                    <span className="validation-error">
                      {errors.activationcode && errors.activationcode.message}
                    </span>
                  </div>

                  <label className="label" htmlFor="userEmail">
                    Email
                  </label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="You@Example.org"
                      name="userEmail"
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <span className="validation-error">
                      {errors.userEmail && errors.userEmail.message}
                    </span>
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="John"
                      name="firstName"
                      ref={register({
                        required: "Required",
                      })}
                    />
                    <span className="validation-error">
                      {errors.firstName && errors.firstName.message}
                    </span>
                  </div>
                  <div className="control">
                    <label className="label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Doe"
                      name="lastName"
                      ref={register({
                        required: "Required",
                      })}
                    />
                    <span className="validation-error">
                      {errors.lastName && errors.lastName.message}
                    </span>
                  </div>
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()]).{8,}$/,
                          message:
                            "Password must contain upper case, lower case, special character and be at least 8 characters long",
                        },
                      })}
                    />
                    <span className="validation-error">
                      {errors.password && errors.password.message}
                    </span>
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faKey} />
                    </span>
                  </div>
                  <div className="control">
                    <label className="label" htmlFor="retypePassword">
                      Confirm Password
                    </label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        placeholder="Confirm Password"
                        name="retypePassword"
                        ref={register({
                          validate: (value) =>
                            value === password.current ||
                            "The passwords do not match",
                        })}
                      />
                      <span className="validation-error">
                        {errors.retypePassword && errors.retypePassword.message}
                      </span>
                      <span className="icon is-left">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        className="button is-primary is-medium"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
