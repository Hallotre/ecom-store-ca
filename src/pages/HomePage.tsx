import { useState, useEffect } from "react";
import { Product } from "../types/types";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://v2.api.noroff.dev/online-shop");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const productsWithImageUrl = data.data.map((product: Product) => ({
          ...product,
          imageUrl: product.image.url,
        }));
        setProducts(productsWithImageUrl);
        setFilteredProducts(productsWithImageUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary/70"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="px-6 py-5 text-red-600 bg-red-100 border border-red-200 rounded-lg"
        role="alert"
      >
        <strong className="font-medium">Error:</strong>
        <span className="block ml-1 sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl">
          Latest Products
        </h1>
        <div className="w-full md:w-72">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white border border-gray-200 rounded-lg">
          <svg
            className="w-12 h-12 mx-auto text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            ></path>
          </svg>
          <p className="mt-4 text-gray-500">
            No products found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
