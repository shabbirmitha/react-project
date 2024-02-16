import SearchBar from "./SearchBar.jsx";
import Cart from "./Cart.jsx";
import UserMenu from "./UserMenu.jsx";

function Navbar({ totalAmount, setQuery }) {
  return (
    <nav className="flex h-16 items-center justify-between mx-2">
      <SearchBar setQuery={setQuery} />
      <Cart totalAmount={totalAmount} />
      <UserMenu />
    </nav>
  );
}

export default Navbar;
