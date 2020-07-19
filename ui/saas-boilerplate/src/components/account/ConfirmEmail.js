import React, { useEffect, useState } from "react";
import PromptAndResponse from "../../services/api/PromptAndResponse";

const ConfirmEmail = () => {
  async function getResult() {
    let result = await PromptAndResponse.get();
    console.log(result);
  }

  useEffect(() => {
    getResult();
  }, []);

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
