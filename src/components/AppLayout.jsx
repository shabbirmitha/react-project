import { useEffect, useReducer, useState } from "react";

import Navbar from "./Navbar.jsx";
import { useSearchedProduct } from "../hooks/useSearchedProduct.js";
import ProductMenu from "./ProductMenu.jsx";

const initialState = {
  productsList: [],
  cart: [],
  filteredList: [],
  isSort: false,
  isFiltered: false,
  totalAmount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "load":
      return {
        ...state,
        productsList: action.payload,
      };
    case "sort":
      return {
        ...state,
        isSort: !state.isSort,
        filteredList: action.payload,
      };
    case "addCart":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        totalAmount: state.totalAmount + Number(action.payload.discountedPrice),
      };
    case "searchProduct":
      return {
        ...state,
        filteredList: action.payload,
      };
    case "filterPrice":
      if (
        JSON.stringify(state.isFiltered) ===
        JSON.stringify(action.payload.range)
      )
        return { ...state, isFiltered: false };
      return {
        ...state,
        filteredList: action.payload.list,
        isFiltered: action.payload.range,
      };
    case "removeFilter":
      return {
        ...state,
        isFiltered: false,
      };
    default:
      throw new Error("Not any dispatch type");
  }
}

function AppLayout() {
  const [query, setQuery] = useState("");
  const { searchedProducts, isLoading, error } = useSearchedProduct(query);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (query === "") return;
    dispatch({ type: "searchProduct", payload: searchedProducts });
  }, [searchedProducts, query]);

  return (
    <div>
      <Navbar setQuery={setQuery} totalAmount={state.totalAmount} />
      <ProductMenu
        state={state}
        isLoading={isLoading}
        error={error}
        query={query}
        dispatch={dispatch}
      />
    </div>
  );
}

export default AppLayout;
