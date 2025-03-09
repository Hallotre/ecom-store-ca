import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/useCart";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-md py-12 mx-auto text-center">
      <div className="flex justify-center mb-6">
        <CheckCircleIcon className="w-16 h-16 text-green-600" />
      </div>

      <h1 className="mb-4 text-2xl font-medium text-gray-900">
        Order Successful!
      </h1>

      <p className="mb-8 text-base text-gray-500">
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>

      <div className="p-6 mb-8 bg-white border border-gray-200 rounded-lg">
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Order Information
        </h2>

        <p className="mb-2 text-gray-500">
          An order confirmation has been sent to your email.
        </p>

        <p className="text-gray-500">
          Order ID: {Math.random().toString(36).substring(2, 12).toUpperCase()}
        </p>
      </div>

      <Link
        to="/"
        className="inline-block px-8 py-3 text-sm font-medium transition-all duration-300 border rounded-lg text-primary border-primary "
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CheckoutSuccessPage;
