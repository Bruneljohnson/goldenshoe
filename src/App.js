import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./components/Ui/LoadingSpinner";
import Layout from "./components/Layout/Layout";
import LoginPage from "./components/Pages/LoginPage";
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/Pages/ResetPasswordPage";
import VerifyEmailPage from "./components/Pages/VerifyEmailPage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import CheckoutSuccess from "./components/Pages/CheckoutSuccess";

import "./App.css";

//Suspense Lazy-Loading
import HomePage from "./components/Pages/HomePage";
import CartPage from "./components/Pages/CartPage";
import ProfilePage from "./components/Pages/ProfilePage";
import OrderPage from "./components/Pages/OrderPage";
import Mens from "./components/Pages/Mens";
import Womens from "./components/Pages/Womens";
import Kids from "./components/Pages/Kids";
import ProductPage from "./components/Pages/ProductPage";
import { storeCart } from "./store/slices/cartSlice/CartActionCreators";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(storeCart(cart));
  }, [dispatch, cart]);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/mens"} element={<Mens />} />
          <Route path={"/womens"} element={<Womens />} />
          <Route path={"/kids"} element={<Kids />} />
          <Route
            path="/user/:id"
            element={
              isAuth ? (
                <ProfilePage />
              ) : (
                <Navigate to="/login-signup" replace={true} />
              )
            }
          />
          <Route
            path="/order/:id"
            element={
              isAuth ? (
                <OrderPage />
              ) : (
                <Navigate to="/login-signup" replace={true} />
              )
            }
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/login-signup"
            element={
              !isAuth ? <LoginPage /> : <Navigate to="/" replace={true} />
            }
          />

          <Route
            path="/forgotpassword"
            element={
              !isAuth ? (
                <ForgotPasswordPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />

          <Route
            path="/resetpassword/:token"
            element={
              !isAuth ? (
                <ResetPasswordPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />

          <Route
            path="/verifyemail/:token"
            element={
              !isAuth ? <VerifyEmailPage /> : <Navigate to="/" replace={true} />
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

// Authorization: `Bearer ${token}`,
