import React from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";
import { images } from "../../constants/images";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <div onClick={props.onClick} className={classes[`modal-backdrop`]}></div>
  );
};

const Overlay = (props) => {
  return (
    <div className={`${classes[`modal-overlay`]} ${classes[`slide-down`]}`}>
      <div className={classes[`modal-overlay_content`]}>
        <MdClose
          className={classes.closeModal}
          size={30}
          onClick={props.onClick}
        />
        <figure className={classes.modalLogo}>
          <img src={images.SociallyLogo} alt="Socially Logo" />
        </figure>
        <main>{props.children}</main>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById(`backdrop-root`)
      )}
      {ReactDOM.createPortal(
        <Overlay onClick={props.onClick}>{props.children}</Overlay>,
        document.getElementById(`overlay-root`)
      )}
    </React.Fragment>
  );
};

export default Modal;
