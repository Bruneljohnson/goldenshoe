import React from "react";
import { TbMinus, TbPlus } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { CartSliceActions } from "../../store/slices/cartSlice/CartSlice";
import classes from "./CartItem.module.css";

// deleteItem addItem clearCart
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(CartSliceActions.addItem({ ...item, quantity: 1 }));
  };
  const deleteItemHandler = () => {
    dispatch(CartSliceActions.deleteItem(item));
  };

  return (
    <li className={classes["cart-item"]}>
      <figure className={classes.imgContainer}>
        <img src={item?.image[0]} alt="sneakers" />
      </figure>
      <div className={classes.infoContainer}>
        <h2>{item.title.split("- ")[0]}</h2>
        <div className="flex-center">
          <div className={classes.summary}>
            <span className={classes.size}>{item.size}</span>
            <span className={classes.price}>£{item.price}.00</span>
            <span className={classes.amount}>x {item.quantity}</span>
          </div>
          <div className={classes.actions}>
            <button
              type="button"
              className={classes[`button--alt`]}
              onClick={deleteItemHandler}
            >
              <TbMinus size={30} />
            </button>
            <button onClick={addItemHandler}>
              <TbPlus size={30} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
