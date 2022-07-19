import React from "react";
import Slider from "./Slider";
import Categories from "./Categories";
import Products from "../Product/Products";

const Home = () => {
  return (
    <React.Fragment>
      <Slider />
      <Categories />
      <Products />
    </React.Fragment>
  );
};

export default Home;
