import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../Hooks/use-Http";
import useInput from "../../Hooks/use-input";
import Alerts from "../Ui/Alerts";
import { BiArrowBack } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";

import Input from "../Ui/Input";
import classes from "./OrderItem.module.css";

const OrderItem = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [showTicket, setShowTicket] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);

  const { error, sendRequest } = useHttp();

  const user = useSelector((state) => state.auth.user);
  const orders = user?.orders;
  const detail = orders?.find((order) => order._id === params.id);
  const amount = detail?.amount / 100;

  const {
    value: enteredTicket,
    inputHandler: ticketInputHandler,
    blurHandler: ticketBlurHandler,
    clear: clearTicket,
  } = useInput(
    (value) => value.toLowerCase().trim() !== `` && value.trim().includes(` `)
  );

  const optionSelectHandler = (event) => {
    event.preventDefault();

    setSelected(event.target.value);
  };

  const showTicketHandler = () => {
    setShowTicket((prev) => !prev);
  };
  const goBackHandler = () => {
    navigate(`/user/${id}`, { replace: true });
  };

  // FETCH REQUEST
  const sendTicketHandler = (event) => {
    event.preventDefault();

    const data = {
      order: detail?._id,
      type: selected,
      description: enteredTicket,
    };

    console.log(data);
    const requestConfig = {
      url: "https://goldenshoe-api.herokuapp.com/api/v1/tickets",
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-Type": "application/json",
      },
    };
    const dataGrabber = () => {
      setTicketSent(true);

      setTimeout(() => {
        setTicketSent(false);
        navigate(`/user/${id}`, { replace: true });
      }, 2000);
    };

    sendRequest(requestConfig, dataGrabber);
    clearTicket();
    setSelected(null);
  };

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

  return (
    <div className={classes.orderItem}>
      {ticketSent && <Alerts type="success" msg="Ticket Sent Successful!" />}
      {hasError && <Alerts type="error" msg="Issue Sending Ticket" />}

      <h1>Order No. {detail?._id}</h1>
      <div className={classes.status}>
        <div className="flex-space-between">
          <strong>Status</strong>
          <div className="flex-center">
            <span>{detail?.status}</span>
            <TiTickOutline size={30} color="#dbca0f" />
          </div>
        </div>
        <div className="flex-space-between">
          <strong>Purchase Date</strong>

          <span>
            {new Intl.DateTimeFormat("en-UK", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }).format(new Date(detail?.createdAt))}
          </span>
        </div>
      </div>
      <ul className={classes.info}>
        <li className="flex-space-between">
          <strong>Amount</strong>

          <span>£{amount}</span>
        </li>
        <li className={classes.shipping}>
          <strong>Shipping Address</strong>
          <div>
            <ul>
              <li>{detail?.shipping?.address?.line1}</li>
              <li>{detail?.shipping?.address?.line2}</li>
              <li>{detail?.shipping?.address?.city}</li>
              <li>{detail?.shipping?.address?.postal_code}</li>
              <li>{detail?.shipping?.address?.country}</li>
            </ul>
          </div>
        </li>
      </ul>
      <ul>
        {detail?.shoes.map((shoe) => (
          <li className={classes.shoeslist} key={shoe._id}>
            <figure>
              <img src={shoe?.shoe.image[0]} alt="Shoe" />
            </figure>
            <div className={classes["shoeslist_deets"]}>
              <h2>{shoe?.shoe?.title.split("- ")[0]}</h2>

              <span>Size: {shoe?.size}</span>
            </div>
            <div className={classes.shoeslist_price}>
              <span>£{shoe?.shoe?.price}</span>

              <span>x {shoe?.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
      {showTicket && (
        <div className={classes.ticket}>
          <h2 className=" ma-bt-md">Change Order</h2>
          <form
            onSubmit={sendTicketHandler}
            className={`${classes.form} ${classes["form-user-data"]}`}
          >
            <select onChange={optionSelectHandler}>
              <option>Please Choose</option>
              <option value="refund">Refund</option>
              <option value="exchange">Exchange</option>
            </select>

            <Input
              id="name"
              type="text"
              // user?.name?.toUpperCase()
              placeholder={"Please provide more information."}
              value={enteredTicket}
              onBlur={ticketBlurHandler}
              onChange={ticketInputHandler}
            />

            <div className={`${classes["form__group"]} right`}>
              <button className="custom-button" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
      <button type="button" onClick={showTicketHandler}>
        {showTicket ? "Cancel" : "Would you like to change your order?"}
      </button>
      <button type="button" onClick={goBackHandler}>
        <BiArrowBack className={classes["react-icon"]} size={30} />
      </button>
    </div>
  );
};

export default OrderItem;
