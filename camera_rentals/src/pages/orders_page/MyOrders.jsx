import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../components/auth_components/AuthManager";
import globalBackendRoute from "../../config/Config";
import one from "../../assets/images_and_videos/2.jpg";
import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
  FaBoxOpen,
  FaShippingFast,
} from "react-icons/fa";

const MyOrders = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${globalBackendRoute}/api/my-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    const normalized = imagePath.replace(/\\/g, "/").split("/").pop();
    return `${globalBackendRoute}/uploads/products/${normalized}`;
  };

  const formatAddress = (addr) => {
    if (!addr || typeof addr !== "object") return "N/A";
    const { addressLine1, addressLine2, city, state, postalCode, country } =
      addr;
    return `${addressLine1 || ""}, ${addressLine2 || ""}, ${city || ""}, ${
      state || ""
    }, ${postalCode || ""}, ${country || ""}`;
  };

  return (
    <div>
              <div className="relative w-full h-[160px] sm:h-[200px] md:h-[260px] overflow-hidden shadow-none pt-16 sm:pt-20 md:pt-24">
                <img
                  src={one}
                  alt="Camera Blog Banner"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
                  <h1 className="text-white text-base sm:text-xl md:text-3xl font-bold text-center leading-snug tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    My Orders,
                    <br className="sm:hidden" /> Thank you for a love and support.
                  </h1>
                </div>
              </div>
    <div className="containerWidth py-10 px-4 animate-fadeIn font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 flex items-center gap-3">
        <FaBoxOpen className="text-red-600" /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <FaClock className="text-6xl text-yellow-400 mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-semibold text-gray-600">
            No orders placed yet.
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-200 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Order ID:</strong> {order._id}
              </p>
              <span
                className={`px-4 py-1 rounded-full text-white text-xs font-semibold tracking-wide uppercase shadow-md
                  ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-600"
                      : order.orderStatus === "Shipped"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100"
                >
                  <img
                    src={getImageUrl(item.product_image)}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded border"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">
                      {item.product_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                      <FaRupeeSign /> {item.selling_price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-gray-700 text-sm space-y-1">
              <p>
                <strong>Billing Address:</strong>{" "}
                {formatAddress(order.billingAddress)}
              </p>
              <p>
                <strong>Shipping Address:</strong>{" "}
                {formatAddress(order.shippingAddress)}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-lg text-gray-800 flex items-center gap-1">
                <FaRupeeSign className="text-red-600" />
                Total: ₹{order.totalAmount.toFixed(2)}
              </p>
              <button className="text-sm text-blue-600 hover:underline flex items-center gap-2 font-medium">
                <FaShippingFast /> Track Delivery
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </div>

  );
};

export default MyOrders;