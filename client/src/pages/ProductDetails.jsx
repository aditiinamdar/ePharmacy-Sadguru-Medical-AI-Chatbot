import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, navigate, addToCart } = useContext(AppContext);

  const product = products.find((p) => p._id === id);
  const [thumbnail, setThumbnail] = useState(product?.image?.[0] || null);

  useEffect(() => {
    if (product) setThumbnail(product.image?.[0]);
  }, [product]);

  if (!product) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <section className="mt-14 max-w-7xl mx-auto px-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-600">Home</Link> /{" "}
        <Link to="/products" className="hover:text-green-600">Products</Link> /{" "}
        <Link
          to={`/products/${product.category.toLowerCase()}`}
          className="hover:text-green-600"
        >
          {product.category}
        </Link>{" "}
        / <span className="text-green-600 font-medium">{product.name}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => (
              <button
                key={index}
                onClick={() => setThumbnail(img)}
                className={`w-20 h-20 rounded-xl border overflow-hidden
                transition-all
                ${thumbnail === img
                  ? "border-green-600 shadow-md"
                  : "border-gray-200 hover:border-green-400"}`}
              >
                <img
                  src={`https://e-pharmacy-sadguru-medical.onrender.com/images/${img}`}
                  alt="thumb"
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white rounded-2xl border border-gray-200
           shadow-lg p-6 flex items-center justify-center">
            <img
              src={`https://e-pharmacy-sadguru-medical.onrender.com/images/${thumbnail}`}
              alt={product.name}
              className="max-h-[420px] object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.name}
          </h1>

         

          {/* Price */}
          <div className="mt-6 bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 line-through">
              MRP ₹{product.price}
            </p>
            <p className="text-3xl font-bold text-green-700">
              ₹{product.offerPrice}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Inclusive of all taxes
            </p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">
              About this product
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-3 rounded-full border border-gray-300
              hover:bg-gray-100 transition font-medium"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-3 rounded-full bg-green-600 text-white
              hover:bg-green-700 transition font-medium shadow-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
