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

  const [
    { productsList, isSort, cart, totalAmount, isFiltered, filteredList },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (query === "") return;
    dispatch({ type: "searchProduct", payload: searchedProducts });
  }, [searchedProducts, query]);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/`, {
          signal: controller.signal,
        });

        if (!res.ok)
          throw new Error("Something went wrong with fetching product");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Product not found");

        dispatch({ type: "load", payload: data.products });
        console.log("loading");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
        }
      }
    }

    fetchProduct();

    return function () {
      controller.abort();
    };
  }, []);

  function handleAddCart(e) {
    dispatch({ type: "addCart", payload: e });
  }

  function handleSort() {
    if (!isSort) {
      const sorted = productsList.sort((a, b) => a.price - b.price);
      dispatch({ type: "sort", payload: sorted });
    } else {
      const unsorted = productsList.sort((a, b) => a.id - b.id);
      dispatch({ type: "sort", payload: unsorted });
    }
  }

  function handleFilter(min, max) {
    const filteredProducts = productsList.filter(
      (a) => a.price > min && a.price < max
    );
    dispatch({
      type: "filterPrice",
      payload: { list: filteredProducts, range: [min, max] },
    });
  }

  return (
    <div>
      <Navbar setQuery={setQuery} totalAmount={totalAmount} />
      <ProductMenu
        handleFilter={handleFilter}
        handleSort={handleSort}
        isSort={isSort}
        isLoading={isLoading}
        error={error}
        productsList={productsList}
        cart={cart}
        handleAddCart={handleAddCart}
        query={query}
        isFiltered={isFiltered}
        filteredList={filteredList}
      />
    </div>
  );
}

export default AppLayout;
