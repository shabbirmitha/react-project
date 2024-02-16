import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ProductCard from "./Product";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductMenu({
  handleFilter,
  handleSort,
  isSort,
  isLoading,
  error,
  productsList,
  cart,
  handleAddCart,
  query,
  isFiltered,
  filteredList,
}) {
  return (
    <div>
      <div className="flex justify-between mx-2">
        <h1 className="text-2xl font-bold">Products</h1>
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="text-lg">Filter</Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => handleFilter(0, 100)}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    $0-$100
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => handleFilter(100, 500)}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    $100-500
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => handleFilter(500, 1500)}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    $500-$1500
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={handleSort}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {isSort ? "Remove sort" : "Sort by Price."}
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <ProductList
            productsList={productsList}
            cart={cart}
            handleAddCart={handleAddCart}
            query={query}
            isFiltered={isFiltered}
            isSort={isSort}
            filteredList={filteredList}
          />
        )}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function ProductList({
  productsList,
  handleAddCart,
  cart,
  query,
  isFiltered,
  isSort,
  filteredList,
}) {
  return (
    <>
      {!query && !isFiltered && !isSort
        ? productsList.map((p) => (
            <ProductCard
              handleAddCart={handleAddCart}
              cart={cart}
              product={p}
              key={p.id}
            />
          ))
        : filteredList.map((p) => (
            <ProductCard
              handleAddCart={handleAddCart}
              cart={cart}
              product={p}
              key={p.id}
            />
          ))}
    </>
  );
}

export default ProductMenu;
