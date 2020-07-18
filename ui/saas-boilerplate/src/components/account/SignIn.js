import React, { useState } from "react";
import SignInService from "../../services/shared/SignInService";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "../../App.css";
import "./account.css";

const SignIn = () => {
  const { register, errors, handleSubmit } = useForm({});
  const [isAuthenticationError, setIsAuthenticationError] = useState(false);
  const history = useHistory();

  function clearValidation() {
    setIsAuthenticationError(false);
  }

  async function onSubmit(signInModel) {
    let signInResponse = await SignInService.getSignInResponse(signInModel);
    if (signInResponse === 200) {
      history.push("/ConfirmEmail");
      return;
    }
    if (signInResponse === 401) {
      setIsAuthenticationError(true);
      return;
    }
    return alert("An unexpected error occurred, please try again later.");
  }

  return (
    <div className="columns is-centered">
      <div className="column">
        <div className="section">
          <div className="container">
            <div className="title">Sign In</div>
            <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
              {isAuthenticationError ? (
                <div className="notification is-danger">
                  <button
                    type="button"
                    className="delete"
                    onClick={clearValidation}
                  ></button>
                  Invalid username or password.
                </div>
              ) : (
                ""
              )}
              <div className="">
                <div className="field">
                  <label className="label" htmlFor="username">
                    Email
                  </label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="You@Example.org"
                      name="username"
                      type="email"
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <span className="validation-error">
                      {errors.username && errors.username.message}
                    </span>
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
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
                      autoComplete="password"
                      ref={register({
                        required: "Required",
                      })}
                    />
                    <span className="validation-error">
                      {errors.password && errors.password.message}
                    </span>
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faKey} />
                    </span>
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        className="button is-primary is-medium"
                        type="submit"
                      >
                        Sign In
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

export default SignIn;
