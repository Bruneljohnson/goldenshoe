import React, { useEffect, useState } from "react";
import Success from "../Auth/Info/Success";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../Hooks/use-Http";
import Alerts from "../Ui/Alerts";
import LoadingSpinner from "../Ui/LoadingSpinner";
import Failed from "../Auth/Info/Failed";

const VerifyEmailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const { token } = params;
  const { isLoading, error, sendRequest } = useHttp();

  /* ERROR HANDLING FOR FETCH REQUEST */
  useEffect(() => {
    let errorTimer;
    if (error) {
      setHasError(true);
      errorTimer = setTimeout(() => {
        setHasError(false);
        navigate("/login-signup", { replace: true });
      }, 2000);
    }

    return () => {
      clearTimeout(errorTimer);
    };
  }, [error, navigate]);

  useEffect(() => {
    const requestConfig = {
      url: `https://goldenshoe-api.herokuapp.com/api/v1/users/verify-email/${token}`,
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      setVerifiedEmail(true);
      setTimeout(() => {
        setVerifiedEmail(false);
        navigate("/login-signup", { replace: true });
      }, 2000);
    };

    sendRequest(requestConfig, dataGrabber);
  }, [sendRequest, token, navigate]);

  return (
    <React.Fragment>
      {verifiedEmail && (
        <Alerts type="success" msg="Your Email Has Been Verified." />
      )}
      {hasError && <Alerts type="error" msg="Incorrect Verify Token." />}
      {verifiedEmail && (
        <Success
          title="Your Email has been verified."
          desc={`Please login to continue.`}
        />
      )}
      {hasError && (
        <Failed
          title="Email verification failed.."
          desc={`Please re-login to continue.`}
        />
      )}
      {isLoading && (
        <div className="grid">
          <LoadingSpinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default VerifyEmailPage;
