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
import { storeCart } from "./store/slices/cartSlice/CartActionCreators";

import "./App.css";

//Suspense Lazy-Loading
const HomePage = React.lazy(() => import("./components/Pages/HomePage"));
const CartPage = React.lazy(() => import("./components/Pages/CartPage"));
const ProfilePage = React.lazy(() => import("./components/Pages/ProfilePage"));
const OrderPage = React.lazy(() => import("./components/Pages/OrderPage"));
const Mens = React.lazy(() => import("./components/Pages/Mens"));
const Womens = React.lazy(() => import("./components/Pages/Womens"));
const Kids = React.lazy(() => import("./components/Pages/Kids"));
const ProductPage = React.lazy(() => import("./components/Pages/ProductPage"));

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
