import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AuthSliceActions } from "../../store/slices/authSlice/AuthSlice";
import { storeToken } from "../../store/slices/authSlice/AuthActionCreators";
import useHttp from "../../Hooks/use-Http";

import Login from "../Auth/Authentication/Login";
import SignUp from "../Auth/Authentication/SignUp";
import Alerts from "../Ui/Alerts";

const LoginPage = () => {
  const [login, setLogin] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [LoggingIn, setLoggingIn] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, sendRequest } = useHttp();

  /* TAB STATE FUNCTION */
  const increaseFormStepsHandler = () => {
    setFormStep((prev) => prev + 1);
  };
  const decreaseFormStepsHandler = () => {
    setFormStep((prev) => prev - 1);
    console.log(formStep);
  };

  const switchAuthHandler = () => {
    setLogin((prev) => !prev);
  };

  /* ERROR HANDLING FOR FETCH REQUEST */
  useEffect(() => {
    let errorTimer;
    if (error) {
      setHasError(true);
      errorTimer = setTimeout(() => {
        setHasError(false);
      }, 2000);
    }

    return () => {
      clearTimeout(errorTimer);
      setFormStep(0);
    };
  }, [error]);

  /* FETCH (POST) REQUEST FOR SIGNING UP USERS */
  const signUpHandler = (data) => {
    const requestConfig = {
      url: "https://goldenshoe-api.herokuapp.com/api/v1/users/signup",
      method: "POST",
      body: data,
      headers: {
        "content-Type": "application/json",
      },
    };
    const dataGrabber = () => {
      setLoggingIn(true);

      setTimeout(() => {
        setLoggingIn(false);
        navigate(-1, { replace: true });
      }, 2000);
    };

    sendRequest(requestConfig, dataGrabber);
  };

  /* FETCH (POST) REQUEST FOR LOGIN USERS */
  const loginHandler = (data) => {
    const requestConfig = {
      url: "https://goldenshoe-api.herokuapp.com/api/v1/users/login",
      method: "POST",
      body: data,
      headers: {
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      if (data) {
        setLoggingIn(true);

        const id = data.data;
        const token = data.token;
        const expiryTime = new Date(
          new Date().getTime() + +jwtDecode(token).exp * 1000
        ).toISOString();

        setTimeout(() => {
          dispatch(AuthSliceActions.login(token));
          dispatch(AuthSliceActions.id(id));
          dispatch(storeToken(token, expiryTime, id));
          setLoggingIn(false);
          navigate(`/}`, { replace: true });
        }, 2000);
      }
    };

    sendRequest(requestConfig, dataGrabber);
  };

  return (
    <div className="grid">
      {login && (
        <Login onLogin={loginHandler} onSwitchAuth={switchAuthHandler} />
      )}
      {!login && (
        <SignUp
          onSignUp={signUpHandler}
          loggingIn={LoggingIn}
          formStep={formStep}
          onFormSteps={increaseFormStepsHandler}
          onGoBack={decreaseFormStepsHandler}
          onSwitchAuth={switchAuthHandler}
        />
      )}
      {LoggingIn && (
        <Alerts
          type="success"
          msg={login ? "Log in Successful!" : "Please Check Your Email!"}
        />
      )}
      {hasError && (
        <Alerts
          type="error"
          msg={login ? "Wrong Email or Password." : "Email Already Exists!"}
        />
      )}
    </div>
  );
};

export default LoginPage;
