import React from "react";
import { categories } from "../../data";
import CategoryItem from "./CategoryItem";
import classes from "./Categories.module.css";

const Categories = () => {
  return (
    <ul className={classes.container}>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </ul>
  );
};

export default Categories;
