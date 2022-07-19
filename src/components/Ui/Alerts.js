import React from "react";
import { BsPatchCheck } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import classes from "./Alert.module.css";

const Alerts = (props) => {
  const { type, msg } = props;
  return (
    <div className={`${classes.alert} ${classes[`alert--${type}`]}`}>
      {type === "error" && <BiErrorCircle size={30} />}
      {type === "success" && <BsPatchCheck size={30} />}
      {msg}
    </div>
  );
};

export default Alerts;
