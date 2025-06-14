// import React from "react";
// import { FaHeart, FaRupeeSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import globalBackendRoute from "../../config/Config";
// import { GetBadges } from "../common_components/getBadges";

// const ProductList = ({
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
//     <div className="space-y-6">
//       {products.map((product) => (
//         <motion.div
//           key={product._id}
//           whileHover={{ scale: 1.02 }}
//           className="flex flex-col md:flex-row items-center bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition group relative"
//         >
//           {/* Wishlist */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleToggleWishlist(product);
//             }}
//             className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-100"
//           >
//             <FaHeart
//               className={`w-5 h-5 ${
//                 (wishlist || []).includes(product._id)
//                   ? "text-red-500"
//                   : "text-gray-400"
//               } transition`}
//             />
//           </button>

//           {/* Image */}
//           <div
//             onClick={() => handleCardClick(product._id)}
//             className="w-full md:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center cursor-pointer"
//           >
//             <img
//               src={getImageUrl(product.product_image)}
//               alt={product.product_name}
//               onError={handleImageError}
//               className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
//             />
//           </div>

//           {/* Info */}
//           <div
//             onClick={() => handleCardClick(product._id)}
//             className="flex flex-col justify-center md:ml-6 mt-4 md:mt-0 w-full cursor-pointer"
//           >
//             <h2 className="text-xl font-semibold text-gray-800 truncate">
//               {product.product_name}
//             </h2>
//             <p className="text-gray-500 text-sm mt-1 line-clamp-2">
//               {product.description?.slice(0, 120)}...
//             </p>

//             <div className="flex items-center gap-4 mt-3">
//               <span className="text-lg font-bold text-green-600 flex items-center">
//                 <FaRupeeSign /> {product.selling_price}
//               </span>
//               {product.display_price && (
//                 <span className="text-red-400 line-through flex items-center text-sm">
//                   <FaRupeeSign /> {product.display_price}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Add to Cart */}
//           <div className="flex-shrink-0 md:ml-6 mt-4 md:mt-0">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleAddToCart(product);
//               }}
//               disabled={!product.availability_status}
//               className={`py-2 px-4 rounded-full font-bold text-sm ${
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

// export default ProductList;

//

// ✅ ProductList.jsx
// import { FaHeart, FaRupeeSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import globalBackendRoute from "../../config/Config";

// const ProductList = ({
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
//     <div className="space-y-4">
//       {products.map((product) => (
//         <div
//           key={product._id}
//           className="relative flex flex-col sm:flex-row gap-4 bg-white  rounded-lg p-4 shadow-sm hover:shadow-md transition"
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

//           <img
//             onClick={() => navigate(`/single-product/${product._id}`)}
//             src={getImageUrl(product.product_image)}
//             alt={product.product_name}
//             className="w-full sm:w-48 h-40 object-cover rounded-md cursor-pointer"
//           />

//           <div className="flex flex-col justify-between flex-1">
//             <div
//               onClick={() => navigate(`/single-product/${product._id}`)}
//               className="cursor-pointer"
//             >
//               <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
//                 {product.product_name}
//               </h3>
//               <p className="text-gray-600 mt-1 text-sm line-clamp-2">
//                 {product.description || "No description"}
//               </p>
//             </div>

//             <div className="flex items-center justify-between mt-2">
//               <p className="text-gray-900 font-bold text-lg flex items-center">
//                 <FaRupeeSign /> {product.selling_price}
//               </p>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleAddToCart(product);
//                 }}
//                 disabled={!product.availability_status}
//                 className={`px-4 py-2 rounded-sm font-semibold text-sm ${
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

// export default ProductList;

//////

///

// ✅ Updated ProductList.jsx with consistent style and hover effect
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const ProductList = ({
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
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative flex flex-col sm:flex-row gap-4 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
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

          <img
            onClick={() => navigate(`/single-product/${product._id}`)}
            src={getImageUrl(product.product_image)}
            alt={product.product_name}
            className="w-full sm:w-48 h-40 object-cover rounded-md cursor-pointer"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          />

          <div className="flex flex-col justify-between flex-1">
            <div
              onClick={() => navigate(`/single-product/${product._id}`)}
              className="cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                {product.product_name}
              </h3>
              <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                {product.description || "No description"}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-gray-900 font-bold text-lg flex items-center">
                <FaRupeeSign /> {product.selling_price}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                disabled={!product.availability_status}
                className={`px-4 py-2 rounded font-semibold text-sm ${
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

export default ProductList;
