import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImSwitch } from "react-icons/im";
import CSSTransition from "react-transition-group/CSSTransition";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { images } from "../../../constants/images";
import classes from "./MainNav.module.css";
import AuthNavLinks from "./AuthNavLinks";
import NavButton from "./NavButton";

const MainNav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const toggleHandler = () => {
    setToggleMenu((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div className={classes.delivery}>orders over £50 ship for free</div>
      <nav className={classes.navbar}>
        <div className={classes["navbar-actions"]}>
          <NavLink
            to="/mens"
            className={(navData) => (navData.isActive ? classes.active : ``)}
          >
            Men
          </NavLink>

          <NavLink
            to="/womens"
            className={(navData) => (navData.isActive ? classes.active : ``)}
          >
            Women
          </NavLink>
          <NavLink
            to="/kids"
            className={(navData) => (navData.isActive ? classes.active : ``)}
          >
            Kids
          </NavLink>
        </div>
        <div className={classes.navbarLogo}>
          <Link to="/">
            <img src={images.logo} alt="Golden Shoe Logo" />
          </Link>
        </div>
        {/* AUTHENTICATED MENU */}
        {isAuth && (
          <ul className={classes.navbarLinks}>
            <AuthNavLinks onToggle={toggleHandler} />
            <NavButton />
          </ul>
        )}
        {/* NOT AUTHENTICATED MENU */}
        <div className={classes[`navbar-login`]}>
          {!isAuth && (
            <NavLink
              to="/login-signup"
              className={(navData) => (navData.isActive ? classes.active : ``)}
            >
              <div className={`flex-center ${classes.profile}`}>
                <ImSwitch size={25} />
                <span>Login | Register</span>
              </div>
            </NavLink>
          )}

          {!isAuth && <NavButton />}
        </div>

        <div className={classes[`navbar-smallscreen`]}>
          <div className={classes["navbar-smallscreen-icons"]}>
            {!toggleMenu && (
              <GiHamburgerMenu
                style={{ cursor: `pointer` }}
                color="#000"
                fontSize={30}
                onClick={toggleHandler}
              />
            )}
            <div />
            <NavButton />
          </div>

          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={toggleMenu}
            timeout={500}
            classNames={{
              enter: ``,
              enterActive: `slide-bottom`,
              exit: ``,
              exitActive: `slide-out`,
            }}
          >
            <div className={classes["navbar-smallscreen-overlay"]}>
              <GrClose
                fontSize={30}
                className={classes["overlay-close"]}
                onClick={toggleHandler}
              />

              <ul className={classes[`navbar-smallscreen-links`]}>
                <NavLink
                  onClick={toggleHandler}
                  to="/mens"
                  className={(navData) =>
                    navData.isActive ? classes.active : ``
                  }
                >
                  Men
                </NavLink>

                <NavLink
                  onClick={toggleHandler}
                  to="/womens"
                  className={(navData) =>
                    navData.isActive ? classes.active : ``
                  }
                >
                  Women
                </NavLink>
                <NavLink
                  onClick={toggleHandler}
                  to="/kids"
                  className={(navData) =>
                    navData.isActive ? classes.active : ``
                  }
                >
                  Kids
                </NavLink>

                {isAuth && <AuthNavLinks onToggle={toggleHandler} />}
              </ul>

              <div className={classes[`navbar-smallscreen-login`]}>
                {!isAuth && (
                  <NavLink
                    onClick={toggleHandler}
                    to="/login-signup"
                    className={(navData) =>
                      navData.isActive ? classes.active : ``
                    }
                  >
                    Login | Register
                  </NavLink>
                )}
              </div>
            </div>
          </CSSTransition>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default MainNav;
