// // ✅ ProductGrid.jsx
// import { FaHeart, FaRupeeSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import globalBackendRoute from "../../config/Config";

// const ProductGrid = ({
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
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <motion.div
//           key={product._id}
//           whileHover={{ scale: 1.03 }}
//           className="relative overflow-hidden transition "
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
//             className="w-full h-48  flex justify-center items-center cursor-pointer"
//             onClick={() => navigate(`/single-product/${product._id}`)}
//           >
//             <img
//               src={getImageUrl(product.product_image)}
//               alt={product.product_name}
//               onError={(e) =>
//                 (e.target.src = "https://via.placeholder.com/150")
//               }
//               className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
//             />
//           </div>

//           <div
//             onClick={() => navigate(`/single-product/${product._id}`)}
//             className="p-4 space-y-2 cursor-pointer"
//           >
//             <h3 className="text-sm font-bold truncate text-center text-gray-800">
//               {product.product_name}
//             </h3>
//             <div className="flex justify-center items-center gap-2 mt-1">
//               <span className="text-base font-bold text-gray-900 flex items-center">
//                 <FaRupeeSign /> {product.selling_price}
//               </span>
//             </div>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleAddToCart(product);
//               }}
//               disabled={!product.availability_status}
//               className={`w-full py-2 rounded-sm font-bold text-sm ${
//                 product.availability_status
//                   ? "bg-black text-white hover:bg-gray-800"
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

// export default ProductGrid;

///////

// ✅ Updated ProductGrid.jsx with hover animation and clean layout
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import globalBackendRoute from "../../config/Config";

const ProductGrid = ({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product._id}
          whileHover={{ scale: 1.03 }}
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
            className="w-full h-48 flex justify-center items-center cursor-pointer"
            onClick={() => navigate(`/single-product/${product._id}`)}
          >
            <img
              src={getImageUrl(product.product_image)}
              alt={product.product_name}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div
            onClick={() => navigate(`/single-product/${product._id}`)}
            className="p-4 space-y-2 cursor-pointer"
          >
            <h3 className="text-sm font-bold truncate text-center text-gray-800">
              {product.product_name}
            </h3>
            <div className="flex justify-center items-center gap-2 mt-1">
              <span className="text-base font-bold text-gray-900 flex items-center">
                <FaRupeeSign /> {product.selling_price}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              disabled={!product.availability_status}
              className={`w-full py-2 rounded font-bold text-sm ${
                product.availability_status
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition`}
            >
              {product.availability_status ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
