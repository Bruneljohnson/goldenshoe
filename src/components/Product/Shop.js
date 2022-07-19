import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DataSliceActions } from "../../store/slices/dataSlice/DataSlice";
import useHttp from "../../Hooks/use-Http";
import classes from "./Shop.module.css";
import ProductItem from "./ProductItem";
import { storeData } from "../../store/slices/dataSlice/DataActionCreators";

let initialLoad = true;

const Shop = ({ title }) => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [colour, setColour] = useState("");
  const [type, setType] = useState("");
  const { sendRequest } = useHttp();
  const shoes = useSelector((state) => state.data.shoes);

  /* FETCH (GET) CALL FOR PRODUCTS */
  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    const requestConfig = {
      url: "https://goldenshoe-api.herokuapp.com/api/v1/shoes",
      headers: { "content-Type": "application/json" },
    };
    const dataGrabber = (data) => {
      const shoes = data.data;

      dispatch(storeData(shoes));
      dispatch(DataSliceActions.storeShoes(shoes));
    };

    sendRequest(requestConfig, dataGrabber);
  }, [sendRequest, dispatch]);

  // Filter API

  // Clear Filter when Show Filter === false
  useEffect(() => {
    if (showFilter === false) {
      const requestConfig = {
        url: "https://goldenshoe-api.herokuapp.com/api/v1/shoes",
        headers: { "content-Type": "application/json" },
      };
      const dataGrabber = (data) => {
        const shoes = data.data;

        dispatch(storeData(shoes));
        dispatch(DataSliceActions.storeShoes(shoes));
      };

      sendRequest(requestConfig, dataGrabber);
    }
  }, [showFilter, sendRequest, dispatch]);

  const filterHandler = (event) => {
    event.preventDefault();

    let url;
    if (colour && !type) {
      url = `https://goldenshoe-api.herokuapp.com/api/v1/shoes/?colour=${colour}`;
    } else if (type && !colour) {
      url = `https://goldenshoe-api.herokuapp.com/api/v1/shoes/?shoeType=${type}`;
    } else if (type && colour) {
      url = `https://goldenshoe-api.herokuapp.com/api/v1/shoes/?colour=${colour}&shoeType=${type}`;
    }

    const requestConfig = {
      url: url,
      headers: { "content-Type": "application/json" },
    };
    const dataGrabber = (data) => {
      const shoes = data.data;

      dispatch(DataSliceActions.storeShoes(shoes));
    };

    sendRequest(requestConfig, dataGrabber);
  };

  const showFilterHandler = () => {
    setShowFilter((prev) => !prev);
  };

  const clearFilter = () => {
    setColour("");
    setType("");
    showFilterHandler();
  };

  const colourSelectHandler = (event) => {
    event.preventDefault();

    setColour(event.target.value);
  };

  const typeSelectHandler = (event) => {
    event.preventDefault();

    setType(event.target.value);
  };

  const shoesPerPage = 9;
  const pagesVisited = pageNo * shoesPerPage;
  const pageCount = Math.ceil(shoes?.length / shoesPerPage);

  const displayShoes =
    shoes?.slice(pagesVisited, pagesVisited + shoesPerPage).map((shoe) => {
      return <ProductItem key={shoe._id} shoe={shoe} />;
    }) ?? "";

  const changePageHandler = ({ selected }) => {
    setPageNo(selected);
  };

  return (
    <div className={classes.container}>
      <h1>{title}</h1>
      {!showFilter && (
        <button
          type="button"
          className={`custom-button ${classes.filterBtn}`}
          onClick={showFilterHandler}
        >
          Filter
        </button>
      )}
      {showFilter && (
        <form className={classes.filter} onSubmit={filterHandler}>
          <h3>Filter</h3>
          <div className={classes.filterByColour}>
            <h4>Colour</h4>
            <div>
              <div className={classes.radioPair}>
                <label htmlFor="blue" style={{ background: "#0f7cdb" }} />
                <input
                  type="radio"
                  id="blue"
                  value="blue"
                  name="colour"
                  onChange={colourSelectHandler}
                />
              </div>
              <div className={classes.radioPair}>
                <label htmlFor="green" style={{ background: "#005c21" }} />
                <input
                  type="radio"
                  id="green"
                  value="green"
                  name="colour"
                  onChange={colourSelectHandler}
                />
              </div>
              <div className={classes.radioPair}>
                <label htmlFor="red" style={{ background: "#800020" }} />
                <input
                  type="radio"
                  value="red"
                  id="red"
                  name="colour"
                  onChange={colourSelectHandler}
                />
              </div>
              <div className={classes.radioPair}>
                <label htmlFor="black" style={{ background: "#000" }} />
                <input
                  type="radio"
                  id="black"
                  value="black"
                  name="colour"
                  onChange={colourSelectHandler}
                />
              </div>
              <div className={classes.radioPair}>
                <label htmlFor="white" style={{ background: "#fafafa" }} />
                <input
                  type="radio"
                  id="white"
                  value="white"
                  name="colour"
                  onChange={colourSelectHandler}
                />
              </div>
              <div className={classes.radioPair}>
                <label htmlFor="pink" style={{ background: "#b451ca" }} />
                <input
                  type="radio"
                  id="pink"
                  value="pink"
                  name="colour"
                  onChange={colourSelectHandler}
                />
              </div>
            </div>
          </div>

          <div className={classes.filterByType}>
            <h4>Shoe Type</h4>
            <div>
              <div className={classes.radioPairType}>
                <label htmlFor="hi">Hi-Top</label>
                <input
                  type="radio"
                  id="hi"
                  value="hi-top"
                  name="type"
                  onChange={typeSelectHandler}
                />
              </div>
              <div className={classes.radioPairType}>
                <label htmlFor="low">Low-Top</label>
                <input
                  type="radio"
                  id="low"
                  value="low-top"
                  name="type"
                  onChange={typeSelectHandler}
                />
              </div>
              <div className={classes.radioPairType}>
                <label htmlFor="slip">Slip On</label>
                <input
                  type="radio"
                  id="slip"
                  value="slip-on"
                  name="type"
                  onChange={typeSelectHandler}
                />
              </div>
            </div>
          </div>
          <div className={classes.actionBtns}>
            <button
              type="submit"
              className="custom-button"
              style={{ background: "#000" }}
            >
              Filter
            </button>
            <button
              type="button"
              className="custom-button"
              style={{ background: "darkgrey" }}
              onClick={clearFilter}
            >
              Clear
            </button>
          </div>
        </form>
      )}
      <div>
        {shoes?.length > 0 && (
          <ul className={classes.itemContainer}>{displayShoes}</ul>
        )}
        {shoes?.length > 0 && (
          <ReactPaginate
            previousLabel={
              <AiOutlineLeft fontSize={25} className={classes["react-icon"]} />
            }
            nextLabel={
              <AiOutlineRight fontSize={25} className={classes["react-icon"]} />
            }
            pageCount={pageCount}
            onPageChange={changePageHandler}
            containerClassName={classes.paginationContainer}
            previousLinkClassName={classes.prevPage}
            nextLinkClassName={classes.nextPage}
            activeClassName={classes.activePage}
          />
        )}
        {shoes?.length === 0 && (
          <p className={classes.noShoes}>
            We can't seem to find a shoe that matches this. <br /> Please search
            for another of customise your own.
          </p>
        )}
      </div>
    </div>
  );
};

export default Shop;
