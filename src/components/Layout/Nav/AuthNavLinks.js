import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthSliceActions } from "../../../store/slices/authSlice/AuthSlice";
import { clearToken } from "../../../store/slices/authSlice/AuthActionCreators";
import { clearCart } from "../../../store/slices/cartSlice/CartActionCreators";
import classes from "./AuthNavLinks.module.css";
import { clearData } from "../../../store/slices/dataSlice/DataActionCreators";

// import { UserDataActions } from "../../../store/slices/userDataSlice/UserDataSlice";
// import { clearData } from "../../../store/slices/userDataSlice/UserDataActionCreators";
// import { ErrorSliceActions } from "../../../store/slices/errorSlice/ErrorSlice";

const AuthNavLinks = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.id);

  /* LOG OUT HANDLER TO CLEAR USERS LOCAL STORAGE AND STATE */
  const logoutHandler = () => {
    dispatch(clearToken());
    dispatch(clearCart());
    dispatch(clearData());
    dispatch(AuthSliceActions.logout());
    navigate(`/`, { replace: true });
    props.onToggle();
  };

  return (
    <React.Fragment>
      <div className={classes.logout}>
        <p className="line" style={{ margin: "0" }} />
        <li className={`p-opensans ${classes.li}`}>
          <NavLink
            to={`/user/${id}`}
            onClick={props.onToggle}
            className={(navData) => (navData.isActive ? classes.active : ``)}
          >
            Account
          </NavLink>
        </li>
        <div className="lineV" style={{ margin: "0" }} />
        <li className="p-opensans">
          <button
            onClick={logoutHandler}
            type="button"
            className={classes[`logout-button`]}
          >
            Logout
          </button>
        </li>
      </div>
    </React.Fragment>
  );
};
export default AuthNavLinks;
