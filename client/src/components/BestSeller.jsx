import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { products } = useContext(AppContext);

  // Filtering for best sellers (example logic: inStock items)
  const bestSellers = products
    .filter((product) => product.inStock)
    .slice(0, 5);

  return (
    <section className="mt-20 px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Best Sellers
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Most trusted & frequently bought products
          </p>
        </div>

        <span className="hidden sm:block text-green-600 text-sm font-medium">
          Top Picks
        </span>
      </div>

      {/* Products Grid */}
      {bestSellers.length ? (
        <>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            gap-5"
          >
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

         
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No best sellers available right now.
        </div>
      )}
    </section>
  );
};

export default BestSeller;
