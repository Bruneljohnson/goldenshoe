import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cart"));
const initialCart = storedCart ?? [];
const initialCartState = {
  items: initialCart,
  total: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const exisitingItem = state.items.find(
        (item) => item.id === newItem._id && item.size === newItem.size
      );

      state.total = state.total + newItem.price * newItem.quantity;

      if (!exisitingItem) {
        state.items.push({
          key: Math.random(),
          id: newItem._id,
          _id: newItem._id,
          quantity: newItem.quantity,
          title: newItem.title,
          size: newItem.size,
          image: newItem.image,
          description: newItem.description,
          price: newItem.price,
          total: newItem.price,
        });
      } else {
        exisitingItem.quantity++;
        exisitingItem.total =
          exisitingItem.total + exisitingItem.price * exisitingItem.quantity;
      }
    },
    deleteItem(state, action) {
      const newItem = action.payload;
      const exisitingItem = state.items.find(
        (item) => item.id === newItem._id && item.size === newItem.size
      );
      state.total = state.total - exisitingItem.price;

      if (exisitingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => !(item.id === newItem._id && item.size === newItem.size)
        );
      } else {
        exisitingItem.quantity--;
        exisitingItem.total = exisitingItem.total - exisitingItem.price;
      }
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const CartSliceActions = CartSlice.actions;

export default CartSlice.reducer;
