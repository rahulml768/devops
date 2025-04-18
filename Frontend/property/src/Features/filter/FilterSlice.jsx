import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  propCategory: ""
};

// creating slice which is method of category
const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterproperty: (state, action) => {
      state.propCategory = action.payload;
    }
  }
});

export const { filterproperty } = slice.actions;
export const filterReducer = slice.reducer;
