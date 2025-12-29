import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch orders"
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Empty state
  if (!orders.length) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr]
          gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          {/* Products */}
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src={`https://e-pharmacy-sadguru-medical.onrender.com/images/${order.items[0].product.image[0]}`}
              alt="box icon"
            />

            <div className="flex flex-col gap-1">
              {order.items.map((item) => (
                <p key={item._id} className="font-medium">
                  {item.product.name}
                  {item.quantity > 1 && (
                    <span className="text-green-600 ml-1">
                      x {item.quantity}
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </div>

          {/* Amount */}
          <p className="font-medium text-base text-black/70 my-auto">
            Rs. {order.amount}
          </p>

          {/* Meta */}
          <div className="flex flex-col text-sm">
            <p>Method: {order.paymentType}</p>
            <p>
              Date:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              Payment:{" "}
              {order.isPaid ? "Paid" : "Pending"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
