import { Link } from "react-router-dom";
import { Product } from "../types/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, imageUrl, price, discountedPrice } = product;
  const hasDiscount = price > discountedPrice;

  return (
    <div className="overflow-hidden transition duration-300 border border-gray-100 rounded-lg group bg-background-light">
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-square bg-gray-50">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x300?text=Image+Not+Available";
            }}
          />
          {hasDiscount && (
            <div className="absolute top-3 right-3 bg-danger/90 backdrop-blur-sm text-red-400 text-xs font-medium px-2.5 py-1 rounded-full shadow-md">
              {Math.round(((price - discountedPrice) / price) * 100)}% Off
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="mb-2 text-base font-medium truncate text-text-primary">
            {title}
          </h3>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-medium text-text-primary">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm line-through text-text-muted">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-2">
            <span
              className="w-full block text-center text-primary border border-primary py-2.5 px-4 rounded-lg
                     transition duration-200 hover:scale-[1.03]"
            >
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
