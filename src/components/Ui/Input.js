import React from "react";
import classes from "../Auth/Authentication/Auth.module.css";

const Input = (props, ref) => {
  return (
    <div className={`${classes["form__group"]} ${props.className}`}>
      <label className={classes["form__label"]} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        {...props.input}
        id={props.id}
        className={classes["form__input"]}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        minLength={props.type === "password" ? "8" : undefined}
      />
    </div>
  );
};

export default Input;
