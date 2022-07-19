import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../Hooks/use-Http";
import useInput from "../../../Hooks/use-input";
import Alerts from "../../Ui/Alerts";

import Input from "../../Ui/Input";
import classes from "./EditProfile.module.css";

const UpdateAccount = () => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [accountUpdated, setAccountUpdated] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const { error, sendRequest } = useHttp();

  /* REGEX USED TO VERIFY INPUTTED EMAIL AND USE OF CUSTOM INPUT HOOKS TO CAPTURE DATA */
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    inputHandler: nameInputHandler,
    blurHandler: nameBlurHandler,
    clear: clearName,
  } = useInput(
    (value) => value.toLowerCase().trim() !== `` && value.trim().includes(` `)
  );
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    clear: clearEmail,
  } = useInput((value) => value.toLowerCase().match(re) !== []);

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredEmailIsValid || enteredNameIsValid) {
      setFormIsValid(true);
    }
  }, [enteredEmailIsValid, enteredNameIsValid]);

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
    };
  }, [error]);

  /* FETCH PATCH REQUEST TO UPADTE USER DETAILS*/
  const updateDetailsHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;
    const data = { email: enteredEmail, name: enteredName };

    const requestConfig = {
      url: "https://goldenshoe-api.herokuapp.com/api/v1/users/updateMe",
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

    clearEmail();
    clearName();
  };

  return (
    <React.Fragment>
      {accountUpdated && (
        <Alerts type="success" msg="Your Account Has Been Updated!" />
      )}
      {hasError && <Alerts type="error" msg="Account update failed" />}

      <div className={classes.account}>
        <h2 className=" ma-bt-md">Your account settings</h2>
        <form
          onSubmit={updateDetailsHandler}
          className={`${classes.form} ${classes["form-user-data"]}`}
        >
          <Input
            label="Name"
            id="name"
            type="text"
            // user?.name?.toUpperCase()
            placeholder={"Brunel Johnson"}
            value={enteredName}
            onBlur={nameBlurHandler}
            onChange={nameInputHandler}
          />

          <Input
            label="Email Address"
            id="email"
            className="ma-bt-md"
            type="email"
            // user?.email?.toUpperCase()
            placeholder={"brunel@mailsac.com"}
            value={enteredEmail}
            onBlur={emailBlurHandler}
            onChange={emailInputHandler}
          />

          <div className={`${classes["form__group"]} right`}>
            <button className="custom-button" type="submit">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UpdateAccount;
