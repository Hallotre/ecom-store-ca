import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/useCart";
import { TrashIcon } from "@heroicons/react/24/outline";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Navigate to the checkout success page
    navigate("/checkout-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-medium text-gray-900">
          Your Cart is Empty
        </h1>
        <p className="mb-8 text-gray-500">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 text-sm font-medium transition-all duration-300 border rounded-lg text-primary border-primary "
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-10 text-2xl font-medium text-gray-900">Your Cart</h1>

      <div className="grid grid-cols-1 gap-8">
        {/* Cart Items */}
        <div className="w-full">
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="hidden rounded-t-lg bg-gray-50 sm:table-header-group">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id} className="flex flex-col sm:table-row">
                    <td className="px-6 py-5 whitespace-nowrap sm:table-cell">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="flex-shrink-0 w-16 h-16 overflow-hidden border border-gray-200 rounded-lg">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="object-contain object-center w-full h-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/150?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link
                              to={`/product/${item.id}`}
                              className="hover:text-primary"
                            >
                              {item.title}
                            </Link>
                          </h3>
                          <div className="text-sm text-gray-900 sm:hidden">
                            ${item.discountedPrice.toFixed(2)}
                          </div>
                          <div className="flex items-center mt-2 border border-gray-200 rounded-lg sm:hidden">
                            <button
                              className="px-3 py-1 text-gray-500 transition border-r border-gray-200 hover:text-primary"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-sm text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 text-gray-500 transition border-l border-gray-200 hover:text-primary"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="text-sm font-medium text-gray-900 sm:hidden">
                            ${(item.discountedPrice * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 text-gray-500 transition-colors hover:text-red-600 sm:hidden"
                            aria-label="Remove item"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-5 whitespace-nowrap sm:table-cell">
                      <div className="text-sm text-gray-900">
                        ${item.discountedPrice.toFixed(2)}
                      </div>
                    </td>
                    <td className="hidden px-6 py-5 whitespace-nowrap sm:table-cell">
                      <div className="">
                        <button
                          className="px-3 py-1 text-gray-500 transition border-r border-gray-200 hover:text-primary"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-sm text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-1 text-gray-500 transition border-l border-gray-200 hover:text-primary"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="hidden px-6 py-5 whitespace-nowrap sm:table-cell">
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.discountedPrice * item.quantity).toFixed(2)}
                      </div>
                    </td>
                    <td className="hidden px-6 py-5 whitespace-nowrap sm:table-cell">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 transition-colors hover:text-red-600"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full">
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 className="mb-6 text-lg font-medium text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-base font-medium text-gray-900">
                  Order Total
                </div>
                <div className="text-base font-medium text-gray-900">
                  ${getCartTotal().toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleCheckout}
                className="w-full px-4 py-3 font-medium text-white transition rounded-lg bg-primary "
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-sm text-gray-500 border border-primary py-2.5 rounded-lg px-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
