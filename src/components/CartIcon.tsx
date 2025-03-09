import { useCart } from "../contexts/useCart";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const CartIcon = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <div className="relative hover:scale-[1.2] transition-transform duration-200">
      <ShoppingBagIcon className="w-6 h-6 text-gray-500 " />
      {itemCount > 0 && (
        <div className="absolute -top-1.5 -right-1.5 bg-primary text-black text-[12px] font-medium rounded-full h-5 w-5 flex items-center justify-center shadow-md">
          {itemCount}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
