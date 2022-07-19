import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./OrderList.module.css";
import { images } from "../../constants/images";

const OrderList = (props) => {
  const navigate = useNavigate();

  const singleOrderHandler = () => {
    navigate(`/order/${props.id}`, { replace: true });
  };
  return (
    <li className={classes.orderlist}>
      <figure>
        {/* Image Source */}
        <img src={images.blackCon} alt="Black Converse" />
      </figure>
      <div className={classes["orderlist_deets"]}>
        {/* Title */}
        <h2 className={classes.bigScreen}>{props.title}</h2>
        <h2 className={classes.smallScreen}>
          {props.title?.length > 11
            ? `${props.title.slice(0, 11)}...`
            : props.title}
        </h2>
        {/* createdAt */}
        <span>ORDERED: {props.createdAt}</span>
      </div>
      <div className={classes.orderlist_price}>
        {/* Order Amount */}
        <span>£{props.amount}</span>
        <button type="button" onClick={singleOrderHandler}>
          Details
        </button>
      </div>
    </li>
  );
};

export default OrderList;
