import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthSliceActions } from "../../store/slices/authSlice/AuthSlice";
import { DataSliceActions } from "../../store/slices/dataSlice/DataSlice";
import { storeUser } from "../../store/slices/authSlice/AuthActionCreators";
import Home from "../Home/Home";
import useHttp from "../../Hooks/use-Http";
import { storeData } from "../../store/slices/dataSlice/DataActionCreators";

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const { sendRequest } = useHttp();

  /* FETCH (GET) CALL FOR USER INFO */
  useEffect(() => {
    if (isAuth) {
      const requestConfig = {
        url: "https://goldenshoe-api.herokuapp.com/api/v1/users/me",
        headers: { Authorization: `Bearer ${token}` },
      };
      const dataGrabber = (data) => {
        const user = data.data;

        dispatch(AuthSliceActions.storeUser(user));
        dispatch(storeUser(user));
      };

      sendRequest(requestConfig, dataGrabber);
    }
  }, [token, sendRequest, dispatch, isAuth]);

  /* FETCH (GET) CALL FOR PRODUCTS */
  useEffect(() => {
    const requestConfig = {
      url: "https://goldenshoe-api.herokuapp.com/api/v1/shoes",
      headers: { "content-Type": "application/json" },
    };
    const dataGrabber = (data) => {
      const shoes = data.data;

      dispatch(DataSliceActions.storeShoes(shoes));
      dispatch(storeData(shoes));
    };

    sendRequest(requestConfig, dataGrabber);
  }, [sendRequest, dispatch]);

  return <Home />;
};

export default HomePage;
