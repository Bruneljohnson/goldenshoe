import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../Hooks/use-Http";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.auth.token);
  const total = useSelector((state) => state.cart.total);
  const items = useSelector((state) => state.cart.items);
  const { sendRequest } = useHttp();

  const totalAmount = new Intl.NumberFormat(navigator.language, {
    style: `currency`,
    currency: `GBP`,
  }).format(total.toFixed(2));

  const goToLoginHandler = () => {
    navigate("/login-signup", { replace: true });
  };

  const startCheckoutHandler = () => {
    const requestConfig = {
      url: "https://goldenshoe-api.herokuapp.com/api/v1/order/checkout-session",
      method: "POST",
      body: { shoes: items },
      headers: {
        Authorization: `Bearer ${token}`,
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      console.log(data);
      window.location.href = data.url;
    };

    sendRequest(requestConfig, dataGrabber);
  };

  return (
    <div className={classes.Cart}>
      {items.length > 0 && <h1>YOUR BAG</h1>}
      {items.length > 0 && (
        <ul className={classes[`cart-items`]}>
          {items.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </ul>
      )}

      {items.length > 0 && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      )}
      {!isAuth && items.length > 0 && (
        <button className="custom-button" onClick={goToLoginHandler}>
          Order
        </button>
      )}
      {isAuth && (
        <button className="custom-button" onClick={startCheckoutHandler}>
          Order
        </button>
      )}
      {items.length === 0 && (
        <div className={classes.empty}>
          <h1>Your Bag is Empty</h1>
        </div>
      )}
    </div>
  );
};

export default Cart;
