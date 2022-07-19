import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import classes from "./Products.module.css";

const Products = () => {
  const shoes = useSelector((state) => state.data.shoes);
  return (
    <ul className={classes.container}>
      {shoes
        .filter((_, i) => i < 4)
        .map((shoe, i) => (
          <ProductItem shoe={shoe} key={shoe._id} />
        ))}
    </ul>
  );
};

export default Products;
