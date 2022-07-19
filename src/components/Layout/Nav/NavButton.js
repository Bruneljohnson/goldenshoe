import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import classes from "./NavButton.module.css";

import { useNavigate } from "react-router-dom";

const NavButton = () => {
  const [bumpActive, setBumpActive] = useState(false);
  const items = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const numberOfCartItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const btnClasses = `${classes.button} ${bumpActive ? classes.bump : ``}`;

  const showCartHandler = () => {
    navigate("/cart", { replace: true });
  };

  useEffect(() => {
    if (!items) return;
    setBumpActive(true);
    const timer = setTimeout(() => {
      setBumpActive(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={showCartHandler}>
      <AiOutlineShoppingCart fontSize={25} className={classes.icon} />
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default NavButton;
