import { createSlice } from "@reduxjs/toolkit";

const storedShoes = JSON.parse(localStorage.getItem("shoes"));
const initialShoes = storedShoes ?? [];
const initialDataState = {
  shoes: initialShoes,
};

const DataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {
    storeShoes(state, action) {
      state.shoes = action.payload;
    },
  },
});

export const DataSliceActions = DataSlice.actions;

export default DataSlice.reducer;
