import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingBag, Plus, Minus } from "lucide-react";

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
      className="group relative cursor-pointer bg-white rounded-[2rem] border border-slate-100 
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] 
      transition-all duration-500 px-4 py-5 w-full max-w-[240px] flex flex-col
      hover:-translate-y-1.5 overflow-hidden h-full"
    >
      {/* Discount Badge */}
      {product.price > product.offerPrice && (
        <div className="absolute top-4 left-4 z-10 bg-emerald-500/10 backdrop-blur-md 
        text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/10">
          {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
        </div>
      )}

      {/* Fixed Aspect Ratio Image Container */}
      <div className="relative flex items-center justify-center w-full aspect-square mb-4 
      bg-slate-50/50 rounded-[1.5rem] p-6 overflow-hidden">
        <img
          src={`https://e-pharmacy-sadguru-medical.onrender.com/images/${product.image[0]}`}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-700 
          group-hover:scale-110"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {product.category}
        </span>

        {/* Fixed 2-Line Title Height */}
        <h3 className="text-slate-800 font-bold text-[15px] mt-1 leading-snug 
        line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>

        {/* Pricing & Controls - Always at bottom */}
        <div className="flex items-center justify-between mt-auto pt-4 w-full">
          <div className="flex flex-col">
            <span className="text-emerald-600 font-black text-lg leading-none">
              ₹{product.offerPrice}
            </span>
            <span className="text-[11px] line-through text-slate-300 font-medium mt-1">
              ₹{product.price}
            </span>
          </div>

          <div onClick={(e) => e.stopPropagation()} className="relative z-20">
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(product._id)}
                className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center
                hover:bg-emerald-600 transition-all duration-300 active:scale-90"
              >
                <ShoppingBag size={18} strokeWidth={2.5} />
              </button>
            ) : (
              <div className="flex items-center bg-white border border-slate-100 rounded-2xl 
              shadow-sm h-10 p-1 gap-1">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-7 h-7 flex items-center justify-center text-slate-400 
                  hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Minus size={14} strokeWidth={3} />
                </button>

                <span className="min-w-[20px] text-center text-xs font-black text-slate-700">
                  {quantity}
                </span>

                <button
                  onClick={() => addToCart(product._id)}
                  className="w-7 h-7 flex items-center justify-center text-emerald-600 
                  hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
