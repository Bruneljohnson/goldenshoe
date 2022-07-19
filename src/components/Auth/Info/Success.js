import React from "react";

import { TiTickOutline } from "react-icons/ti";
import classes from "./Info.module.css";
import { Link } from "react-router-dom";

const Success = (props) => {
  return (
    <div className={classes.notfound}>
      <div className={classes["notfound-info"]}>
        <div className={classes["notfound-info_header"]}>
          <p>{props.title}</p>
          <h2 className="flex-center">
            <TiTickOutline size={30} color="#dbca0f" />
            Success
          </h2>
        </div>
        <p style={{ marginBottom: "1rem" }}>{props.desc}</p>
        <p style={{ marginBottom: "1rem" }}>
          For help, please click{" "}
          <Link to="/contact" style={{ color: "#800020", cursor: "pointer" }}>
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
