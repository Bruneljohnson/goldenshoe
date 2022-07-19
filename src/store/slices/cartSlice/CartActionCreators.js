export const storeCart = (cart) => {
  return async (dispatch) => {
    localStorage.setItem(`cart`, JSON.stringify(cart));
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    localStorage.removeItem(`cart`);
  };
};
