import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Info.module.css";

const NotFound = (props) => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={classes.notfound}>
      <div className={classes["notfound-info"]}>
        <div className={classes["notfound-info_header"]}>
          <p>This page is currently under</p>
          <h2>Construction</h2>
        </div>
        <p className={`${classes["heading-secondary"]}`}>
          Apologies for the inconvenience, <br />
          we're working hard to continously improve our site.
        </p>
        <button
          className={classes["custom-button"]}
          type="button"
          onClick={goBackHandler}
        >
          <span>
            <strong>Return Home</strong>
          </span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
