import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CategoryItem.module.css";

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();

  const goToShopHandler = () => {
    navigate(`${category.url}`, { replace: true });
  };
  return (
    <div className={classes.container}>
      <div>
        <figure className={classes.imgContainer}>
          <img src={category.img} alt="category" />
        </figure>
        <div className={classes.infoContainer}>
          <h2>{category.title}</h2>
          <button
            type="button"
            className="custom-button"
            onClick={goToShopHandler}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
