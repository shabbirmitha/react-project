import { useState, useEffect } from "react";

export function useSearchedProduct(query) {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");



  useEffect(
    function () {

      const controller = new AbortController();

      async function fetchProduct() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://dummyjson.com/products/search?q=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching product");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Product not found");

          setSearchedProducts(data.products);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchProduct();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { searchedProducts, isLoading, error };
}

