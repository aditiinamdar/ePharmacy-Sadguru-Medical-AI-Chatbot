fix all the product card of same height + images of same height & have space to show two line product name import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingBag, Plus, Minus } from "lucide-react"; // Using Lucide for cleaner 2026 icons

const ProductCard = ({ product }) => {
  const { navigate, addToCart, cartItems, removeFromCart } = useContext(AppContext);

  if (!product) return null;

  const quantity = cartItems?.[product._id] || 0;

  return (
    <div
      onClick={() => {
        navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="group relative cursor-pointer bg-white rounded-4xl border border-slate-100 
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] 
      transition-all duration-500 px-5 py-6 w-full max-w-60 flex flex-col items-center
      hover:-translate-y-2 overflow-hidden"
    >
      {/* 2026 Glassmorphism Discount Badge */}
      {product.price > product.offerPrice && (
        <div className="absolute top-4 left-4 z-10 bg-emerald-500/10 backdrop-blur-md 
        text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/20">
          {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
        </div>
      )}

      {/* Image Container with Soft Shadow */}
      <div className="relative flex items-center justify-center w-full aspect-square mb-4 
      bg-slate-50/50 rounded-3xl p-4 transition-colors group-hover:bg-emerald-50/30">
        <img
          src={`https://e-pharmacy-sadguru-medical.onrender.com/images/${product.image[0]}`}
          alt={product.name}
          className="max-h-full object-contain transition-all duration-500 
          group-hover:scale-110 drop-shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="w-full">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
          {product.category}
        </span>

        <h3 className="text-slate-800 font-bold text-lg mt-1 h-10 line-clamp-2 leading-snug 
        group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>

        {/* Pricing & Modern Controls */}
        <div className="flex items-center justify-between mt-5 w-full">
          <div className="flex flex-col">
            <span className="text-emerald-600 font-black text-lg">
              ₹{product.offerPrice}
            </span>
            <span className="text-[10px] line-through text-slate-300 font-medium">
              ₹{product.price}
            </span>
          </div>

          {/* Cart Control: Floating Interaction */}
          <div onClick={(e) => e.stopPropagation()} className="relative z-20">
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(product._id)}
                className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center
                hover:bg-emerald-600 hover:rotate-12 transition-all duration-300 shadow-lg shadow-slate-200"
              >
                <ShoppingBag size={18} strokeWidth={2.5} />
              </button>
            ) : (
              <div className="flex items-center bg-white border border-slate-100 rounded-2xl 
              shadow-lg h-10 p-1 gap-1 animate-in zoom-in-90 duration-300">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 
                  hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Minus size={14} strokeWidth={3} />
                </button>

                <span className="min-w-5 text-center text-xs font-black text-slate-700">
                  {quantity}
                </span>

                <button
                  onClick={() => addToCart(product._id)}
                  className="w-8 h-8 flex items-center justify-center text-emerald-600 
                  hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Glow */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 
      bg-emerald-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default ProductCard;
