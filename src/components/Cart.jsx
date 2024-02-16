import { ShoppingCartIcon } from "@heroicons/react/24/solid";

function Cart({ totalAmount }) {
  return (
    <div className="relative py-2">
      <div className="absolute left-0 top-0">
        <p className="flex h-2  items-center justify-center rounded-full bg-blue-700 p-3 text-xs text-white">
          {Math.round(totalAmount)}
        </p>
      </div>

      <ShoppingCartIcon className="h-10 w-10 ml-auto" />
    </div>
  );
}

export default Cart;
