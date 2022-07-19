import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProductItem.module.css";

const ProductItem = ({ shoe }) => {
  const navigate = useNavigate();
  const shoeTitle = shoe?.title.split("- ")[0];

  const goToItemHandler = () => {
    navigate(`/product/${shoe?._id}`, { replace: true });
  };

  return (
    <div className={classes.container} onClick={goToItemHandler}>
      <div>
        <figure className={classes.imgContainer}>
          <img src={shoe?.image[0]} alt="shoe" />
        </figure>
        <div className={classes.infoContainer}>
          <h2>{shoeTitle}</h2>
          <button
            type="button"
            className="custom-button"
            onClick={goToItemHandler}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
