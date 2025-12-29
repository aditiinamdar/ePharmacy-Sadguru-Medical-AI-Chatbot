import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-28 bg-linear-to-br from-lime-50 via-white to-emerald-50">
      
      {/* Soft background glows - Hidden on small screens to improve performance */}
      <div className="hidden md:block absolute -top-32 left-1/4 w-[360px] h-[360px] bg-emerald-300/30 rounded-full blur-[120px]" />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-[320px] h-80 bg-lime-300/30 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
            Serving families for years
          </span>

          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
            Medicines you trust,
            <span className="block text-emerald-600">
              care you can rely on
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Daily medicines and healthcare essentials,
            delivered simply and reliably.
          </p>

          <div className="mt-8 md:mt-10">
            <Link
              to="/products"
              className="inline-block px-10 py-3.5 rounded-full bg-linear-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-xl hover:scale-105 transition"
            >
              Shop Medicines
            </Link>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex justify-center order-1 lg:order-2">
          
          {/* Brand Card - Made responsive with width and height */}
          <div
            className="
              relative w-[85%] sm:w-[70%] h-[350px] md:h-[520px]
              rounded-[32px] md:rounded-[44px]
              bg-white
              border border-emerald-200
              shadow-[0_45px_120px_-30px_rgba(16,185,129,0.4)]
              flex items-center justify-center
            "
          >
            {/* Center Image */}
            <img
              src={assets.sadguru}
              alt="Sadguru Medical"
              className="
                w-full
                max-w-[400px] md:max-w-[520px]
                rounded-[32px] md:rounded-[44px]
                object-contain
                scale-[1.05] md:scale-[1.08]
              "
            />

            {/* Bottom Badge - Adjusted for mobile font size */}
            <div className="absolute -bottom-5 md:-bottom-7 left-1/2 -translate-x-1/2
              whitespace-nowrap px-6 md:px-8 py-2 md:py-2.5 rounded-full
              bg-linear-to-r from-emerald-600 to-green-500
              text-white text-xs md:text-sm font-semibold shadow-xl">
              Your health. Our priority.
            </div>
          </div>

          {/* Floating cards - Adjusted positions for mobile */}
          <div className="absolute -left-4 md:-left-14 top-10 md:top-16
            px-4 md:px-6 py-2 md:py-3.5 rounded-2xl bg-white shadow-lg
            text-xs md:text-sm font-medium animate-float">
            💊 Trusted medicines
          </div>

          <div className="absolute -right-2 md:-right-6 bottom-16 md:bottom-20
            px-4 md:px-6 py-2 md:py-3.5 rounded-2xl bg-white shadow-lg
            text-xs md:text-sm font-medium animate-float-delayed">
            🚚 Fast delivery
          </div>
        </div>
      </div>

      <style>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
