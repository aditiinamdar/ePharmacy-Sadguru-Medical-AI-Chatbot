import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  CreditCard,
  ShieldCheck
} from "lucide-react";

const MyOrders = () => {
  const { axios, user, navigate } = useContext(AppContext);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || "https://e-pharmacy-sadguru-medical.onrender.com/images";

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'processing': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-slate-400 animate-pulse tracking-widest text-xs uppercase">Retrieving Records...</p>
      </div>
    );
  }

  if (!myOrders.length) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-slate-50 p-6 rounded-[2.5rem] mb-6">
          <Package size={48} className="text-slate-200" />
        </div>
        <h2 className="text-2xl text-slate-900 mb-2">No prescriptions or orders yet.</h2>
        <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">Your medication history will appear here once you place your first order.</p>
        <button onClick={() => navigate('/products')} className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 pb-24 max-w-5xl mx-auto px-6">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-4xl text-slate-900 tracking-tighter">Order History</h1>
          <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest text-[10px]">Verified Pharmaceutical Records</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-300 text-[10px]">
          <ShieldCheck size={14} /> SECURE ENCRYPTED DATA
        </div>
      </div>

      <div className="space-y-8">
        {myOrders.map((order) => (
          <div
            key={order._id}
            className="group bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 pb-8 border-b border-slate-50">
              <div className="flex gap-6 items-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${getStatusStyle(order.status)}`}>
                  {order.status === 'Delivered' ? <CheckCircle size={24} /> : order.status === 'Shipped' ? <Truck size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <div className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter border mb-2 inline-block ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </div>
                  <p className="text-xs text-slate-400 tracking-widest uppercase">ID: {order._id.slice(-8)}</p>
                </div>
              </div>

              <div className="flex md:text-right flex-col justify-center">
                <div className="flex items-center md:justify-end gap-2 text-slate-900 text-xl mb-1">
                  <span className="text-slate-300 text-sm">Total</span> ₹{order.amount.toFixed(2)}
                </div>
                <div className="flex items-center md:justify-end gap-2 text-[10px] text-slate-400 tracking-widest uppercase">
                  <CreditCard size={12} /> {order.paymentType}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item._id} className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden p-2">
                      <img
                        src={`${IMAGE_BASE_URL}/${item.product.image[0]}`}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div>
                      <h2 className="text-slate-800 text-lg">
                        {item.product.name}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{item.product.category}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-300 uppercase mb-1">Ordered On</p>
                      <p className="text-xs text-slate-600">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <p className="text-slate-900 text-lg">
                      ₹{(item.product.offerPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
               <p className="text-[10px] text-slate-400">Verified by Sadguru Medical Digital Audit System</p>
               <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all">
                  Track Delivery <ExternalLink size={14} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
