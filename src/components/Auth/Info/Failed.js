import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineReportProblem } from "react-icons/md";
import classes from "./Info.module.css";
import { Link } from "react-router-dom";

const Failed = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fail = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => {
      clearTimeout(fail);
    };
  }, [navigate]);

  return (
    <div className={classes.notfound}>
      <div className={classes["notfound-info"]}>
        <div className={classes["notfound-info_header"]}>
          <p>{props.title}</p>
          <h2 className="flex-center">
            <MdOutlineReportProblem size={30} color="#dbca0f" />
            Failed
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

export default Failed;
