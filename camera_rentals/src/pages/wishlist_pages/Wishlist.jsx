// import React, { useContext, useEffect } from "react";
// import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
// import { CartContext } from "../../components/cart_components/CartContext";
// import { FaTrash, FaCartPlus, FaBookmark, FaCheck } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import globalBackendRoute from "../../config/Config";
// import { AuthContext } from "../../components/auth_components/AuthManager";
// import { motion } from "framer-motion";
// import { BsViewList } from "react-icons/bs";
// import one from "../../assets/images_and_videos/4.jpg";

// const Wishlist = () => {
//   const {
//     wishlistItems,
//     removeFromWishlist,
//     toggleSaveForLater,
//     moveToCartFromWishlist,
//     fetchWishlist,
//   } = useContext(WishlistContext);

//   const { addToCart, fetchServerCart } = useContext(CartContext);
//   const { isLoggedIn } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isLoggedIn && wishlistItems.length === 0) {
//       fetchWishlist();
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     if (isLoggedIn) fetchWishlist();
//   }, []);

//   const getImageUrl = (img) => {
//     if (!img) return "https://via.placeholder.com/150";
//     const normalized = img.replace(/\\/g, "/").split("/").pop();
//     return `${globalBackendRoute}/uploads/products/${normalized}`;
//   };

//   const handleCheckoutNow = (item) => {
//     addToCart(item);
//     navigate("/checkout");
//   };

//   return (
//     <div>
//       <div className="relative w-full h-[240px] overflow-hidden shadow-sm pt-16">
//         <img
//           src={one}
//           alt="Banner"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
//           <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">
//             Shop All - Among <br className="sm:hidden" /> All Category and Brand
//           </h1>
//         </div>
//       </div>
//       <motion.div
//         className="container mx-auto px-4 py-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide mb-8 flex items-center gap-3">
//           <BsViewList className="text-orange-500" />
//           My Wishlist
//         </h1>

//         {wishlistItems.length === 0 ? (
//           <motion.div
//             className="text-center text-gray-500 mt-20"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <p>Your wishlist is empty.</p>
//           </motion.div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {wishlistItems.map((item) => (
//               <motion.div
//                 key={item._id}
//                 className="bg-white rounded shadow-lg hover:shadow-xl transition duration-300 p-4 relative"
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <img
//                   src={getImageUrl(item.product_image)}
//                   alt={item.product_name}
//                   className="w-full h-48 object-cover rounded-md"
//                 />

//                 <div className="mt-4">
//                   <h2 className="text-lg font-semibold text-gray-900 truncate">
//                     {item.product_name}
//                   </h2>
//                   <p className="text-gray-900 font-bold  text-xl">
//                     ₹{item.selling_price}
//                   </p>

//                   {item.savedForLater && (
//                     <div className="mt-1 text-xs text-yellow-600 font-medium flex items-center gap-1">
//                       <FaBookmark className="text-yellow-500" />
//                       Saved for later
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-4 space-y-2">
//                   <button
//                     onClick={async () => {
//                       await moveToCartFromWishlist(item._id);
//                       fetchServerCart();
//                     }}
//                     className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-600 text-white py-2 rounded-full font-semibold hover:scale-105 transition-transform"
//                   >
//                     <FaCartPlus /> Move to Cart
//                   </button>

//                   <button
//                     onClick={() => handleCheckoutNow(item)}
//                     className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-full font-semibold hover:bg-gray-700 transition"
//                   >
//                     <FaCheck /> Buy Now
//                   </button>

//                   <div className="flex justify-between gap-2 mt-2">
//                     <button
//                       onClick={() => toggleSaveForLater(item._id)}
//                       className="w-1/2 flex items-center justify-center gap-1 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200"
//                     >
//                       <FaBookmark />
//                       {item.savedForLater ? "Unsave" : "Save for Later"}
//                     </button>

//                     <button
//                       onClick={() => removeFromWishlist(item._id)}
//                       className="w-1/2 flex items-center justify-center gap-1 py-2 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200"
//                     >
//                       <FaTrash /> Remove
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Wishlist;

//

// import React, { useContext, useEffect } from "react";
// import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
// import { CartContext } from "../../components/cart_components/CartContext";
// import { FaTrash, FaCartPlus, FaBookmark, FaCheck } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import globalBackendRoute from "../../config/Config";
// import { AuthContext } from "../../components/auth_components/AuthManager";
// import { BsViewList } from "react-icons/bs";
// import one from "../../assets/images_and_videos/2.jpg";

// const Wishlist = () => {
//   const {
//     wishlistItems,
//     removeFromWishlist,
//     toggleSaveForLater,
//     moveToCartFromWishlist,
//     fetchWishlist,
//   } = useContext(WishlistContext);

//   const { addToCart, fetchServerCart } = useContext(CartContext);
//   const { isLoggedIn } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isLoggedIn && wishlistItems.length === 0) {
//       fetchWishlist();
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     if (isLoggedIn) fetchWishlist();
//   }, []);

//   const getImageUrl = (img) => {
//     if (!img) return "https://via.placeholder.com/150";
//     const normalized = img.replace(/\\/g, "/").split("/").pop();
//     return `${globalBackendRoute}/uploads/products/${normalized}`;
//   };

//   const handleCheckoutNow = (item) => {
//     addToCart(item);
//     navigate("/checkout");
//   };

//   return (
//     <div>
//       <div className="relative w-full h-[160px] sm:h-[200px] md:h-[260px] overflow-hidden shadow-sm pt-16 sm:pt-20 md:pt-24">
//         <img
//           src={one}
//           alt="Camera Blog Banner"
//           className="absolute inset-0 w-full h-full object-cover"
//           loading="eager"
//           decoding="async"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
//           <h1 className="text-white text-base sm:text-xl md:text-3xl font-bold text-center leading-snug tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
//             Explore camera tips, gear reviews,
//             <br className="sm:hidden" /> and photography hacks from our pros.
//           </h1>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-10">
//         <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide mb-8 flex items-center gap-3">
//           <BsViewList className="text-red-600" />
//           My Wishlist
//         </h1>

//         {wishlistItems.length === 0 ? (
//           <div className="text-center text-gray-500 mt-20">
//             <p>Your wishlist is empty.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {wishlistItems.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white rounded shadow-lg hover:shadow-xl transition duration-200 p-4 relative"
//               >
//                 <img
//                   src={getImageUrl(item.product_image)}
//                   alt={item.product_name}
//                   className="w-full h-48 object-cover rounded-md"
//                 />

//                 <div className="mt-4">
//                   <h2 className="text-lg font-semibold text-gray-900 truncate">
//                     {item.product_name}
//                   </h2>
//                   <p className="text-gray-900 font-bold text-xl">
//                     ₹{item.selling_price}
//                   </p>

//                   {item.savedForLater && (
//                     <div className="mt-1 text-xs text-yellow-600 font-medium flex items-center gap-1">
//                       <FaBookmark className="text-yellow-500" />
//                       Saved for later
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-4 space-y-2">
//                   <button
//                     onClick={async () => {
//                       await moveToCartFromWishlist(item._id);
//                       fetchServerCart();
//                     }}
//                     className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-600 text-white py-2 rounded-full font-semibold"
//                   >
//                     <FaCartPlus /> Move to Cart
//                   </button>

//                   <button
//                     onClick={() => handleCheckoutNow(item)}
//                     className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-full font-semibold hover:bg-gray-700"
//                   >
//                     <FaCheck /> Buy Now
//                   </button>

//                   <div className="flex justify-between gap-2 mt-2">
//                     <button
//                       onClick={() => toggleSaveForLater(item._id)}
//                       className="w-1/2 flex items-center justify-center gap-1 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200"
//                     >
//                       <FaBookmark />
//                       {item.savedForLater ? "Unsave" : "Save for Later"}
//                     </button>

//                     <button
//                       onClick={() => removeFromWishlist(item._id)}
//                       className="w-1/2 flex items-center justify-center gap-1 py-2 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200"
//                     >
//                       <FaTrash /> Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;

// gray hover effect.

//

import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
import { CartContext } from "../../components/cart_components/CartContext";
import { FaTrash, FaCartPlus, FaBookmark, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";
import { AuthContext } from "../../components/auth_components/AuthManager";
import { BsViewList } from "react-icons/bs";
import one from "../../assets/images_and_videos/2.jpg";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    toggleSaveForLater,
    moveToCartFromWishlist,
    fetchWishlist,
  } = useContext(WishlistContext);

  const { addToCart, fetchServerCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && wishlistItems.length === 0) {
      fetchWishlist();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) fetchWishlist();
  }, []);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    const normalized = img.replace(/\\/g, "/").split("/").pop();
    return `${globalBackendRoute}/uploads/products/${normalized}`;
  };

  const handleCheckoutNow = (item) => {
    addToCart(item);
    navigate("/checkout");
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
            Explore camera tips, gear reviews,
            <br className="sm:hidden" /> and photography hacks from our pros.
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide mb-8 flex items-center gap-3">
          <BsViewList className="text-red-600" />
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded transition duration-300 ease-in-out text-center p-4 flex flex-col justify-between 
                hover:bg-gradient-to-b hover:from-gray-200 hover:via-white hover:to-white
                before:absolute before:top-0 before:left-0 before:w-full before:h-2
                hover:before:shadow-[0_-6px_10px_-4px_rgba(0,0,0,0.2)] before:rounded-t"
              >
                <img
                  src={getImageUrl(item.product_image)}
                  alt={item.product_name}
                  className="w-full h-48 object-cover rounded-md"
                />

                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {item.product_name}
                  </h2>
                  <p className="text-gray-900 font-bold text-xl">
                    ₹{item.selling_price}
                  </p>

                  {item.savedForLater && (
                    <div className="mt-1 text-xs text-yellow-600 font-medium flex items-center gap-1">
                      <FaBookmark className="text-yellow-500" />
                      Saved for later
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={async () => {
                      await moveToCartFromWishlist(item._id);
                      fetchServerCart();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-600 text-white py-2 rounded font-semibold"
                  >
                    <FaCartPlus /> Move to Cart
                  </button>

                  <button
                    onClick={() => handleCheckoutNow(item)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded font-semibold hover:bg-gray-700"
                  >
                    <FaCheck /> Buy Now
                  </button>

                  <div className="flex justify-between gap-2 mt-2">
                    <button
                      onClick={() => toggleSaveForLater(item._id)}
                      className="w-1/2 flex items-center justify-center gap-1 py-2 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
                    >
                      <FaBookmark />
                      {item.savedForLater ? "Unsave" : "Save for Later"}
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="w-1/2 flex items-center justify-center gap-1 py-2 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
