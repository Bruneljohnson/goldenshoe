import { clearCart } from "../cartSlice/CartActionCreators";
import { clearData } from "../dataSlice/DataActionCreators";
import { AuthSliceActions } from "./AuthSlice";

let logoutTimer;

export const calcRemainingTime = (expiryTime) => {
  // For Expiry time we need to convert the string recieved from api and make it a real timestamp.
  const currentTime = new Date().getTime();
  const expirationTime = new Date(expiryTime).getTime();

  const remainingTime = expirationTime - currentTime;

  return remainingTime;
};

export const getStoredToken = () => {
  const storedToken = localStorage.getItem(`token`);
  const storedExpiryTime = localStorage.getItem(`expiryTime`);

  const remainingTime = calcRemainingTime(storedExpiryTime);

  if (remainingTime < 180000) {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`expiryTime`);
    localStorage.removeItem(`id`);
    localStorage.removeItem("cart");
    localStorage.removeItem(`user`);
    localStorage.removeItem("shoes");
    return null;
  } else {
    return {
      token: storedToken,
      time: remainingTime,
    };
  }
};

export const storeUser = (user) => {
  return async (dispatch) => {
    localStorage.setItem(`user`, JSON.stringify(user));
  };
};

export const storeToken = (token, expiryTime, id) => {
  return async (dispatch) => {
    localStorage.setItem(`token`, token);
    localStorage.setItem(`expiryTime`, expiryTime);
    localStorage.setItem(`id`, id);
    const timeLeft = calcRemainingTime(expiryTime);
    const time = getStoredToken();

    logoutTimer = setTimeout(() => {
      dispatch(AuthSliceActions.logout());
      dispatch(clearToken());
      dispatch(clearCart());
      dispatch(clearData());
    }, time?.time ?? timeLeft);
  };
};

export const clearToken = () => {
  return async (dispatch) => {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`expiryTime`);
    localStorage.removeItem(`id`);
    localStorage.removeItem(`user`);
    localStorage.removeItem("cart");
    localStorage.removeItem("shoes");

    logoutTimer && clearTimeout(logoutTimer);
  };
};
