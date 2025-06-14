// import React from "react";
// import { FaHeart, FaRupeeSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import globalBackendRoute from "../../config/Config";
// import { GetBadges } from "../common_components/getBadges";

// const ProductCard = ({
//   products,
//   wishlist,
//   handleToggleWishlist,
//   handleAddToCart,
// }) => {
//   const navigate = useNavigate();

//   const handleCardClick = (id) => {
//     navigate(`/single-product/${id}`);
//   };

//   const getImageUrl = (img) => {
//     if (img) {
//       const normalized = img.replace(/\\/g, "/").split("/").pop();
//       return `${globalBackendRoute}/uploads/products/${normalized}`;
//     }
//     return "https://via.placeholder.com/150";
//   };

//   const handleImageError = (e) => {
//     if (!e.target.dataset.fallback) {
//       e.target.src = "https://via.placeholder.com/150";
//       e.target.dataset.fallback = "true";
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//       {products.map((product) => (
//         <motion.div
//           key={product._id}
//           whileHover={{ scale: 1.04 }}
//           className="relative group rounded-xl shadow-sm hover:shadow-xl bg-white border border-red-100 overflow-hidden transition duration-300"
//         >
//           {/* Wishlist Icon */}
//           <div className="absolute top-4 right-4 z-20">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleToggleWishlist(product);
//               }}
//               className="bg-white p-2 rounded-full shadow hover:bg-red-100 transition"
//             >
//               <FaHeart
//                 className={`w-5 h-5 ${
//                   (wishlist || []).includes(product._id)
//                     ? "text-red-500"
//                     : "text-gray-400"
//                 } transition-transform duration-300`}
//               />
//             </button>
//           </div>

//           {/* Image Section */}
//           <div
//             className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
//             onClick={() => handleCardClick(product._id)}
//           >
//             <img
//               src={getImageUrl(product.product_image)}
//               alt={product.product_name}
//               onError={handleImageError}
//               className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
//             />
//           </div>

//           {/* Info Section */}
//           <div
//             onClick={() => handleCardClick(product._id)}
//             className="p-4 space-y-2 cursor-pointer"
//           >
//             <h3 className="text-lg font-bold text-gray-800 group-hover:text-black truncate">
//               {product.product_name}
//             </h3>
//             <p className="text-sm text-gray-500 truncate">
//               {product.description?.slice(0, 50)}...
//             </p>

//             <div className="flex items-center gap-2 mt-2">
//               <span className="text-lg font-bold text-green-600 flex items-center">
//                 <FaRupeeSign /> {product.selling_price}
//               </span>
//             </div>

//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleAddToCart(product);
//               }}
//               disabled={!product.availability_status}
//               className={`w-full mt-4 py-2 text-center rounded-full font-semibold ${
//                 product.availability_status
//                   ? "bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               } transition`}
//             >
//               {product.availability_status ? "Add to Cart" : "Out of Stock"}
//             </button>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ProductCard;

//

// ✅ ProductCard.jsx
// import { FaHeart, FaRupeeSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import globalBackendRoute from "../../config/Config";

// const ProductCard = ({
//   products,
//   handleAddToCart,
//   handleToggleWishlist,
//   wishlist,
// }) => {
//   const navigate = useNavigate();
//   const getImageUrl = (img) =>
//     img
//       ? `${globalBackendRoute}/uploads/products/${img
//           .replace(/\\/g, "/")
//           .split("/")
//           .pop()}`
//       : "https://via.placeholder.com/150";

//   return (
//     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {products.map((product) => (
//         <div
//           key={product._id}
//           className="relative bg-white  rounded-md overflow-hidden hover:shadow-md transition"
//         >
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleToggleWishlist(product);
//             }}
//             className="absolute top-3 right-3 z-10"
//           >
//             <FaHeart
//               className={`w-5 h-5 ${
//                 wishlist.includes(product._id)
//                   ? "text-red-700"
//                   : "text-gray-400"
//               }`}
//             />
//           </button>

//           <div
//             onClick={() => navigate(`/single-product/${product._id}`)}
//             className="cursor-pointer"
//           >
//             <img
//               src={getImageUrl(product.product_image)}
//               alt={product.product_name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-sm font-semibold text-gray-900 truncate">
//                 {product.product_name}
//               </h3>
//               <p className="text-gray-700 font-bold text-md mt-1 flex items-center">
//                 <FaRupeeSign /> {product.selling_price}
//               </p>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleAddToCart(product);
//                 }}
//                 disabled={!product.availability_status}
//                 className={`mt-2 w-full py-2 rounded-sm font-bold text-sm ${
//                   product.availability_status
//                     ? "bg-black text-white hover:bg-gray-800"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 } transition`}
//               >
//                 {product.availability_status ? "Add to Cart" : "Out of Stock"}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductCard;

//

//

//

//

// ✅ Updated ProductCard.jsx with hover animation and clean layout
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const ProductCard = ({
  products,
  handleAddToCart,
  handleToggleWishlist,
  wishlist,
}) => {
  const navigate = useNavigate();
  const getImageUrl = (img) =>
    img
      ? `${globalBackendRoute}/uploads/products/${img
          .replace(/\\/g, "/")
          .split("/")
          .pop()}`
      : "https://via.placeholder.com/150";

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative rounded bg-white overflow-hidden min-h-[22rem] transition duration-300 ease-in-out text-center p-3 flex flex-col justify-between hover:bg-gradient-to-b hover:from-gray-200 hover:via-white hover:to-white before:absolute before:top-0 before:left-0 before:w-full before:h-2 hover:before:shadow-[0_-6px_10px_-4px_rgba(0,0,0,0.2)] before:rounded-t"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist(product);
            }}
            className="absolute top-3 right-3 z-10"
          >
            <FaHeart
              className={`w-5 h-5 ${
                wishlist.includes(product._id)
                  ? "text-red-700"
                  : "text-gray-400"
              }`}
            />
          </button>

          <div
            onClick={() => navigate(`/single-product/${product._id}`)}
            className="cursor-pointer"
          >
            <img
              src={getImageUrl(product.product_image)}
              alt={product.product_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {product.product_name}
              </h3>
              <p className="text-gray-700 font-bold text-md mt-1 flex items-center justify-center">
                <FaRupeeSign /> {product.selling_price}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                disabled={!product.availability_status}
                className={`mt-2 w-full py-2 rounded font-bold text-sm ${
                  product.availability_status
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition`}
              >
                {product.availability_status ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
