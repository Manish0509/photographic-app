import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Work } from "@/types/categories";

interface FilterState {
  individualData: Work | undefined;
}

const initialState: FilterState = {
  individualData: undefined,
};

const particularDataSlice = createSlice({
  name: "particularData",
  initialState,
  reducers: {
    setOneData: (state, action: PayloadAction<Work>) => {
      state.individualData = action.payload;
    },

    clearData: (state) => {
      state.individualData = undefined;
    },
  },
});

export const { setOneData, clearData } = particularDataSlice.actions;

export default particularDataSlice.reducer;
