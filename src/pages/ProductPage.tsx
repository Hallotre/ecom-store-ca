import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../contexts/useCart";
import { Product } from "../types/types";
import { StarIcon } from "@heroicons/react/20/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        const productWithImageUrl = {
          ...data.data,
          imageUrl: data.data.image.url,
        };
        setProduct(productWithImageUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsAddedToCart(true);

      // Reset the "Added to cart" message after 3 seconds
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 3000);
    }
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-gray-500">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary/70"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className="px-6 py-5 text-red-600 bg-red-100 border border-red-200 rounded-lg"
        role="alert"
      >
        <strong className="font-medium">Error:</strong>
        <span className="block ml-1 sm:inline">
          {error || "Product not found"}
        </span>
        <div className="mt-4">
          <Link
            to="/"
            className="font-medium text-primary hover:text-primary/80"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage =
    product.price > product.discountedPrice
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  const hasDiscount = discountPercentage > 0;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <Link
          to="/"
          className="flex items-center text-gray-500 transition-colors hover:text-primary w-max"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-contain w-full h-full p-6"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/600x400?text=Image+Not+Available";
            }}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-2xl font-medium text-gray-900">
            {product.title}
          </h1>

          {renderRatingStars(product.rating)}

          <div className="mt-4">
            {hasDiscount ? (
              <div className="flex items-center">
                <span className="text-2xl font-medium text-gray-900">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="ml-3 text-base text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-3 bg-red-100 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  Save {discountPercentage}%
                </span>
              </div>
            ) : (
              <span className="text-2xl font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="pt-2">
            <h2 className="mb-2 text-base font-medium text-gray-900">
              Description
            </h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div>
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-900 text-xs px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6">
            <button
              onClick={handleAddToCart}
              className="w-full px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
            >
              Add to Cart
            </button>

            {isAddedToCart && (
              <div className="px-4 py-2 mt-3 text-sm font-medium text-center text-green-600 bg-green-100 border border-green-200 rounded-lg">
                Product added to cart!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 mb-8">
        <h2 className="mb-6 text-xl font-medium text-gray-900">Reviews</h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      {review.username}
                    </h3>
                    {renderRatingStars(review.rating)}
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-700">
                  {review.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-8 text-center text-gray-700 bg-white border border-gray-200 rounded-lg">
            No reviews yet for this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
