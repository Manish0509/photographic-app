import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import filterReducer from "./slices/filterSlice";
import particularDataSlice from "./slices/particularDataSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      categories: categoriesReducer,
      filter: filterReducer,
      particularData: particularDataSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
