import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/slices/cartSlice/CartActionCreators";
import { CartSliceActions } from "../../store/slices/cartSlice/CartSlice";
import Success from "../Auth/Info/Success";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const success = setTimeout(() => {
      dispatch(CartSliceActions.clearCart());
      dispatch(clearCart());
      navigate("/", { replace: true });
    }, 3000);

    return () => {
      clearTimeout(success);
    };
  }, [navigate, dispatch]);

  return (
    <Success
      title="Your order has been recieved."
      desc={`Please check your email ${(<br />)}
  for reciept and order details.`}
    />
  );
};

export default CheckoutSuccess;
