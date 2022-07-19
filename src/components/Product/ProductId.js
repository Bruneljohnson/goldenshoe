import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TbMinus, TbPlus } from "react-icons/tb";

import classes from "./ProductId.module.css";
import { CartSliceActions } from "../../store/slices/cartSlice/CartSlice";

const ProductId = () => {
  let moreInfo;
  const params = useParams();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(null);
  const shoes = useSelector((state) => state.data.shoes);

  const shoe = shoes?.find((shoe) => shoe._id === params.id);

  const optionSelectHandler = (event) => {
    event.preventDefault();

    setSelected(event.target.value);
  };

  // LIMIT STOCK BY SIZE
  const selectedSizeQuantity =
    shoe?.sizes.find((size) => selected === size.size)?.quantity ?? 0;

  const amountHandler = (event) => {
    event.preventDefault();

    setAmount(event.target.value);
  };

  // LIMIT THE QUANTITY A USER CAN BUY DUE TO SIZE
  const increaseQuantity = () => {
    if (amount < selectedSizeQuantity) setAmount(amount + 1);
  };
  const decreaseQuantity = () => {
    if (amount > 0) setAmount(amount - 1);
  };

  // More Info Section
  if (shoe?.title.startsWith("Chuck 70 AT")) {
    moreInfo =
      "Transforming the best ever into a style icon of the future, the Chuck 70 AT-CX delivers elevation like never before. A cotton canvas upper and tongue get a lift from a chunky CX foam midsole and sockliner for exaggerated comfort.";
  }

  if (shoe?.title.startsWith("Chuck 70 Vintage")) {
    moreInfo =
      "By 1970, the Chuck Taylor All Star evolved into one of the best basketball sneakers, ever. The Chuck 70 celebrates that heritage by bringing together archival-inspired details with modern comfort updates.";
  }

  if (shoe?.title.startsWith("Chuck Taylor")) {
    moreInfo =
      "Take your summer look to the next level with fun, fruity prints on your favorite platforms. Classic Chuck Taylor design elements get lifted by a double-stacked sole and finished with a peach-printed liner and embroidered peach details.";
  }

  // ADD TO CART HANDLER
  const addToCartHandler = () => {
    dispatch(
      CartSliceActions.addItem({ ...shoe, size: selected, quantity: amount })
    );
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <figure className={classes.imgContainer}>
          <img src={shoe?.image[0]} alt={shoe?.title} />
        </figure>
        <div className={classes.infoContainer}>
          <h1>{shoe?.title.split("- ")[0]}</h1>
          <p>{shoe?.description}</p>
          <span>£{shoe?.price}.00</span>
          <div className={classes.chooseSize}>
            <h1>Size</h1>
            <select onChange={optionSelectHandler}>
              <option>UK SIZES</option>
              <option value="UK2">UK2</option>
              <option value="UK3">UK3</option>
              <option value="UK4">UK4</option>
              <option value="UK5">UK5</option>
              <option value="UK6">UK6</option>
              <option value="UK7">UK7</option>
              <option value="UK8">UK8</option>
              <option value="UK9">UK9</option>
              <option value="UK10">UK10</option>
              <option value="UK11">UK11</option>
            </select>
          </div>
          <div className={classes.addContainer}>
            <div className={classes.amountContainer}>
              <TbMinus size={30} onClick={decreaseQuantity} />
              <input
                className={classes["form__input"]}
                onChange={amountHandler}
                type={`number`}
                id={`amount` + shoe._id}
                value={amount}
                min={0}
                max={selectedSizeQuantity}
                step={1}
              />
              <TbPlus size={30} onClick={increaseQuantity} />
            </div>
            <button
              type="button"
              className="custom-button"
              onClick={addToCartHandler}
            >
              Add
            </button>
          </div>
          <p className={classes.moreInfo}> {moreInfo}</p>
        </div>
        <div className={classes.imgsContainer}>
          {shoe?.image
            .filter((_, i) => i > 0)
            .map((image, i) => (
              <figure key={i} className={classes.imagesSet}>
                <img src={image} alt="" />
              </figure>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductId;
