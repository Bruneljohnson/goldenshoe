import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../Hooks/use-Http";
import useInput from "../../../Hooks/use-input";
import Alerts from "../../Ui/Alerts";

import Input from "../../Ui/Input";
import classes from "./EditProfile.module.css";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [accountUpdated, setAccountUpdated] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const { error, sendRequest } = useHttp();

  /* STORING AND VALIDATING FORM INPUTS USING CUSTOM INPUT HOOK */
  const {
    value: enteredCurrentPassword,
    isValid: enteredCurrentPasswordIsValid,
    inputHandler: currentPasswordInputHandler,
    blurHandler: currentPasswordBlurHandler,
    clear: clearCurrentPassword,
  } = useInput((value) => value.trim() !== `` && value.trim().length >= 8);

  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    inputHandler: newPasswordInputHandler,
    blurHandler: newPasswordBlurHandler,
    clear: clearNewPassword,
  } = useInput((value) => value.trim() !== `` && value.trim().length >= 8);

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    inputHandler: confirmPasswordInputHandler,
    blurHandler: confirmPasswordBlurHandler,
    clear: clearConfirmPassword,
  } = useInput((value) => value === enteredNewPassword);

  /* VERIFY FORM */
  useEffect(() => {
    if (
      enteredCurrentPasswordIsValid &&
      enteredNewPasswordIsValid &&
      enteredConfirmPasswordIsValid
    ) {
      setFormIsValid(true);
    }
  }, [
    enteredCurrentPasswordIsValid,
    enteredNewPasswordIsValid,
    enteredConfirmPasswordIsValid,
  ]);

  /* FETCH (PATCH) CALL TO UPDATE USER PASSWORD */
  const updatePasswordHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    const data = {
      currentPassword: enteredCurrentPassword,
      password: enteredNewPassword,
      confirmPassword: enteredConfirmPassword,
    };

    const requestConfig = {
      url: "https://goldenshoe-api.herokuapp.com/api/v1/users/updatePassword",
      method: "PATCH",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-Type": "application/json",
      },
    };

    const dataGrabber = (data) => {
      if (data) {
        setAccountUpdated(true);
        setTimeout(() => {
          setAccountUpdated(false);
          navigate(`/`, { replace: true });
        }, 2000);
      }
    };

    sendRequest(requestConfig, dataGrabber);
    clearCurrentPassword();
    clearNewPassword();
    clearConfirmPassword();
  };

  /* ERROR HANDLING FOR FETCH REQUESTS */
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
    };
  }, [error]);

  return (
    <React.Fragment>
      {accountUpdated && (
        <Alerts type="success" msg="Your Password Has Been Updated!" />
      )}
      {hasError && <Alerts type="error" msg="Account update failed" />}
      <div className={classes.account}>
        <h2 className={`ma-bt-md`}>Change Your Password</h2>
        <form
          onSubmit={updatePasswordHandler}
          className={`${classes.form} ${classes["form-user-settings"]}`}
        >
          <Input
            label="Current Password"
            id="password-current"
            type="password"
            placeholder="••••••••"
            value={enteredCurrentPassword}
            onBlur={currentPasswordBlurHandler}
            onChange={currentPasswordInputHandler}
          />

          <Input
            label="New Password"
            id="password-new"
            type="password"
            placeholder="••••••••"
            value={enteredNewPassword}
            onBlur={newPasswordBlurHandler}
            onChange={newPasswordInputHandler}
          />

          <Input
            label={"Confirm Password"}
            id="password-confirm"
            type="password"
            className="ma-bt-lg"
            placeholder="••••••••"
            value={enteredConfirmPassword}
            onBlur={confirmPasswordBlurHandler}
            onChange={confirmPasswordInputHandler}
          />
          {!enteredConfirmPasswordIsValid && (
            <div className={classes.invalid}>Passwords Don't Match</div>
          )}

          <div className={`${classes["form__group"]} right`}>
            <button
              className="custom-button"
              type="submit"
              disabled={!formIsValid}
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ChangePasswordForm;
