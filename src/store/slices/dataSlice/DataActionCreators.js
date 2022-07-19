export const storeData = (shoes) => {
  return async (dispatch) => {
    localStorage.setItem(`shoes`, JSON.stringify(shoes));
  };
};

export const clearData = () => {
  return async (dispatch) => {
    localStorage.removeItem(`shoes`);
  };
};
