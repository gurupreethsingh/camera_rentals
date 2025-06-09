// // // ✅ Shop.jsx updated to match the screenshot layout
// // import React, { useState, useEffect, useContext } from "react";
// // import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
// // import ProductGrid from "../../components/shop_components/ProductGrid";
// // import ProductCard from "../../components/shop_components/ProductCard";
// // import ProductList from "../../components/shop_components/ProductList";
// // import Pagination from "../../components/shop_components/Pagination";
// // import axios from "axios";
// // import { CartContext } from "../../components/cart_components/CartContext";
// // import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
// // import globalBackendRoute from "../../config/Config";
// // import { motion } from "framer-motion";
// // import { FaTh, FaThList, FaIdBadge } from "react-icons/fa";
// // import { toast } from "react-toastify";
// // import { AuthContext } from "../../components/auth_components/AuthManager";
// // import one from "../../assets/images_and_videos/2.jpg";

// // const Shop = () => {
// //   const [allProducts, setAllProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [viewMode, setViewMode] = useState("grid");
// //   const [showAnimatedMsg, setShowAnimatedMsg] = useState(false);
// //   const [animatedMsgProductName, setAnimatedMsgProductName] = useState("");
// //   const [localWishlist, setLocalWishlist] = useState([]);
// //   const { isLoggedIn } = useContext(AuthContext);

// //   const { addToCart } = useContext(CartContext);
// //   const { wishlistItems, addToWishlist, removeFromWishlist, fetchWishlist } =
// //     useContext(WishlistContext);

// //   const productsPerPage =
// //     viewMode === "grid" ? 12 : viewMode === "card" ? 9 : 10;

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await axios.get(
// //           `${globalBackendRoute}/api/all-added-products`
// //         );
// //         const products = res.data || [];
// //         setAllProducts(products);
// //         setFilteredProducts(products);
// //       } catch (error) {
// //         console.error("Failed to fetch products:", error.message);
// //       }
// //     };
// //     fetchData();
// //     fetchWishlist();
// //   }, []);

// //   useEffect(() => {
// //     const init = async () => {
// //       await fetchWishlist();
// //       setLocalWishlist(wishlistItems.map((item) => item._id));
// //     };
// //     init();
// //   }, [wishlistItems.length]);

// //   const handleFilterChange = (newFilteredProducts) => {
// //     setFilteredProducts(newFilteredProducts);
// //     setCurrentPage(1);
// //   };

// //   const handleWishlistToggle = async (product) => {
// //     const productId = product._id;
// //     const productName = product.product_name;

// //     if (!isLoggedIn) {
// //       toast.info("Please log in to use the wishlist", {
// //         position: "top-center",
// //         autoClose: 2000,
// //       });
// //       return;
// //     }

// //     const wishlistIds = wishlistItems.map(
// //       (item) => item._id || item.product?._id
// //     );

// //     try {
// //       if (wishlistIds.includes(productId)) {
// //         await removeFromWishlist(productId);
// //         await fetchWishlist();
// //       } else {
// //         const success = await addToWishlist(productId, product);
// //         if (success) await fetchWishlist();
// //       }

// //       setAnimatedMsgProductName(
// //         wishlistIds.includes(productId)
// //           ? `❌ ${productName} removed from wishlist`
// //           : `✨ ${productName} added to wishlist`
// //       );
// //       setShowAnimatedMsg(true);
// //       setTimeout(() => setShowAnimatedMsg(false), 2000);
// //     } catch (err) {
// //       console.error("🔥 Error in wishlist toggle:", err);
// //     }
// //   };

// //   const handleAddToCart = (product) => {
// //     if (product.availability_status) {
// //       addToCart(product);
// //     } else {
// //       toast.error("Cannot add. Product is Out of Stock!", { autoClose: 1200 });
// //     }
// //   };

// //   const indexOfLastProduct = currentPage * productsPerPage;
// //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// //   const currentProducts = filteredProducts.slice(
// //     indexOfFirstProduct,
// //     indexOfLastProduct
// //   );
// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   return (
// //     <div className="">
// //       {/* Banner */}
// //       <div className="relative w-full h-[240px] overflow-hidden shadow-sm pt-16">
// //         <img
// //           src={one}
// //           alt="Banner"
// //           className="absolute inset-0 w-full h-full object-cover"
// //         />
// //         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
// //           <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">
// //             Shop All - Among
// //             <br className="sm:hidden" /> All Category and Brand
// //           </h1>
// //         </div>
// //       </div>

// //       <div className="py-6 px-4 flex flex-col lg:flex-row gap-10 animate-fadeIn container mx-auto">
// //         {showAnimatedMsg && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -10 }}
// //             className="fixed top-20 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-xl"
// //           >
// //             {animatedMsgProductName}
// //           </motion.div>
// //         )}

// //         <div className="w-full lg:w-1/5">
// //           <FiltersSidebar
// //             allProducts={allProducts}
// //             onFilterChange={handleFilterChange}
// //           />
// //         </div>

// //         <div className="w-full lg:w-4/5 mb-5">
// //           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
// //             <div className="flex flex-wrap items-center gap-3">
// //               <label className="text-sm font-semibold text-gray-700">
// //                 Sort by:
// //               </label>
// //               <select
// //                 onChange={(e) => handleFilterChange(filteredProducts)}
// //                 className="border px-2 py-1 rounded text-sm"
// //               >
// //                 <option value="popularity">Best Sellers</option>
// //                 <option value="priceLowHigh">Price: Low to High</option>
// //                 <option value="priceHighLow">Price: High to Low</option>
// //                 <option value="latest">Newest</option>
// //                 <option value="oldest">Oldest</option>
// //               </select>
// //               <span className="text-sm text-gray-500">
// //                 ({filteredProducts.length} items)
// //               </span>
// //             </div>
// //           </div>

// //           <div>
// //             {viewMode === "grid" && (
// //               <ProductGrid
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //             {viewMode === "card" && (
// //               <ProductCard
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //             {viewMode === "list" && (
// //               <ProductList
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //           </div>

// //           {filteredProducts.length > productsPerPage && (
// //             <div className="flex justify-end mt-8">
// //               <Pagination
// //                 productsPerPage={productsPerPage}
// //                 totalProducts={filteredProducts.length}
// //                 currentPage={currentPage}
// //                 paginate={paginate}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Shop;

// //

// // fully working, except for the sort by opitons.

// //

// // ✅ Full Shop.jsx - Updated with all 9 requested features
// // import React, { useState, useEffect, useContext } from "react";
// // import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
// // import ProductGrid from "../../components/shop_components/ProductGrid";
// // import ProductCard from "../../components/shop_components/ProductCard";
// // import ProductList from "../../components/shop_components/ProductList";
// // import Pagination from "../../components/shop_components/Pagination";
// // import axios from "axios";
// // import { CartContext } from "../../components/cart_components/CartContext";
// // import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
// // import globalBackendRoute from "../../config/Config";
// // import { motion } from "framer-motion";
// // import { FaTh, FaThList, FaIdBadge } from "react-icons/fa";
// // import { toast } from "react-toastify";
// // import { AuthContext } from "../../components/auth_components/AuthManager";
// // import one from "../../assets/images_and_videos/2.jpg";

// // const Shop = () => {
// //   const [allProducts, setAllProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [viewMode, setViewMode] = useState("grid");
// //   const [searchText, setSearchText] = useState("");
// //   const [productsPerPage, setProductsPerPage] = useState(12);
// //   const [showAnimatedMsg, setShowAnimatedMsg] = useState(false);
// //   const [animatedMsgProductName, setAnimatedMsgProductName] = useState("");
// //   const [localWishlist, setLocalWishlist] = useState([]);
// //   const { isLoggedIn } = useContext(AuthContext);

// //   const { addToCart } = useContext(CartContext);
// //   const { wishlistItems, addToWishlist, removeFromWishlist, fetchWishlist } =
// //     useContext(WishlistContext);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await axios.get(
// //           `${globalBackendRoute}/api/all-added-products`
// //         );
// //         const products = res.data || [];
// //         setAllProducts(products);
// //         setFilteredProducts(products);
// //       } catch (error) {
// //         console.error("Failed to fetch products:", error.message);
// //       }
// //     };
// //     fetchData();
// //     fetchWishlist();
// //   }, []);

// //   useEffect(() => {
// //     setLocalWishlist(wishlistItems.map((item) => item._id));
// //   }, [wishlistItems]);

// //   const handleFilterChange = (newFilteredProducts) => {
// //     setFilteredProducts(newFilteredProducts);
// //     setCurrentPage(1);
// //   };

// //   const handleWishlistToggle = async (product) => {
// //     const productId = product._id;
// //     const productName = product.product_name;

// //     if (!isLoggedIn) {
// //       toast.info("Please log in to use the wishlist", {
// //         position: "top-center",
// //         autoClose: 2000,
// //       });
// //       return;
// //     }

// //     const wishlistIds = wishlistItems.map(
// //       (item) => item._id || item.product?._id
// //     );

// //     try {
// //       if (wishlistIds.includes(productId)) {
// //         await removeFromWishlist(productId);
// //         await fetchWishlist();
// //       } else {
// //         const success = await addToWishlist(productId, product);
// //         if (success) await fetchWishlist();
// //       }

// //       setAnimatedMsgProductName(
// //         wishlistIds.includes(productId)
// //           ? `❌ ${productName} removed from wishlist`
// //           : `✨ ${productName} added to wishlist`
// //       );
// //       setShowAnimatedMsg(true);
// //       setTimeout(() => setShowAnimatedMsg(false), 2000);
// //     } catch (err) {
// //       console.error("🔥 Error in wishlist toggle:", err);
// //     }
// //   };

// //   const handleAddToCart = (product) => {
// //     if (product.availability_status) {
// //       addToCart(product);
// //     } else {
// //       toast.error("Cannot add. Product is Out of Stock!", { autoClose: 1200 });
// //     }
// //   };

// //   const filteredAndSearched = filteredProducts.filter((p) =>
// //     p.product_name?.toLowerCase().includes(searchText.toLowerCase())
// //   );

// //   const indexOfLastProduct = currentPage * productsPerPage;
// //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// //   const currentProducts = filteredAndSearched.slice(
// //     indexOfFirstProduct,
// //     indexOfLastProduct
// //   );
// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   return (
// //     <div className="font-sans">
// //       <div className="relative w-full h-[240px] overflow-hidden shadow-sm pt-16">
// //         <img
// //           src={one}
// //           alt="Banner"
// //           className="absolute inset-0 w-full h-full object-cover"
// //         />
// //         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
// //           <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">
// //             Shop All - Among <br className="sm:hidden" /> All Category and Brand
// //           </h1>
// //         </div>
// //       </div>

// //       <div className="py-6 px-4 flex flex-col lg:flex-row gap-10 container mx-auto">
// //         {showAnimatedMsg && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -10 }}
// //             className="fixed top-20 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-xl"
// //           >
// //             {animatedMsgProductName}
// //           </motion.div>
// //         )}

// //         <div className="w-full lg:w-1/5">
// //           <FiltersSidebar
// //             allProducts={allProducts}
// //             onFilterChange={handleFilterChange}
// //           />
// //         </div>

// //         <div className="w-full lg:w-4/5 mb-5">
// //           <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
// //             <div className="flex flex-wrap items-center gap-3">
// //               <label className="text-sm font-medium text-gray-700">
// //                 Sort by:
// //               </label>
// //               <select
// //                 onChange={(e) => handleFilterChange(filteredProducts)}
// //                 className="font-bold px-2 py-1 rounded text-sm"
// //               >
// //                 <option value="popularity">Best Sellers</option>
// //                 <option value="priceLowHigh">Price: Low to High</option>
// //                 <option value="priceHighLow">Price: High to Low</option>
// //                 <option value="latest">Newest</option>
// //                 <option value="oldest">Oldest</option>
// //               </select>

// //               <input
// //                 type="text"
// //                 value={searchText}
// //                 onChange={(e) => setSearchText(e.target.value)}
// //                 placeholder="Search products..."
// //                 className="px-2 py-1 text-sm border rounded"
// //               />

// //               <span className="text-sm text-gray-600">
// //                 ({filteredAndSearched.length} products)
// //               </span>
// //             </div>

// //             <select
// //               value={productsPerPage}
// //               onChange={(e) => setProductsPerPage(Number(e.target.value))}
// //               className="border px-2 py-1 text-sm rounded"
// //             >
// //               {[6, 9, 12, 15, 18].map((n) => (
// //                 <option key={n} value={n}>
// //                   {n} / page
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             {viewMode === "grid" && (
// //               <ProductGrid
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //             {viewMode === "card" && (
// //               <ProductCard
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //             {viewMode === "list" && (
// //               <ProductList
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //           </div>

// //           {filteredAndSearched.length > productsPerPage && (
// //             <div className="flex justify-end mt-8">
// //               <Pagination
// //                 productsPerPage={productsPerPage}
// //                 totalProducts={filteredAndSearched.length}
// //                 currentPage={currentPage}
// //                 paginate={paginate}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Shop;

// //// third

// //

// // ✅ Full Shop.jsx - Updated with requested fixes (default 6/page, sort fix, red text)
// // import React, { useState, useEffect, useContext } from "react";
// // import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
// // import ProductGrid from "../../components/shop_components/ProductGrid";
// // import ProductCard from "../../components/shop_components/ProductCard";
// // import ProductList from "../../components/shop_components/ProductList";
// // import Pagination from "../../components/shop_components/Pagination";
// // import axios from "axios";
// // import { CartContext } from "../../components/cart_components/CartContext";
// // import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
// // import globalBackendRoute from "../../config/Config";
// // import { motion } from "framer-motion";
// // import { toast } from "react-toastify";
// // import { AuthContext } from "../../components/auth_components/AuthManager";
// // import one from "../../assets/images_and_videos/2.jpg";

// // const Shop = () => {
// //   const [allProducts, setAllProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [viewMode, setViewMode] = useState("grid");
// //   const [searchText, setSearchText] = useState("");
// //   const [productsPerPage, setProductsPerPage] = useState(6);
// //   const [sortOption, setSortOption] = useState("popularity");
// //   const [showAnimatedMsg, setShowAnimatedMsg] = useState(false);
// //   const [animatedMsgProductName, setAnimatedMsgProductName] = useState("");
// //   const [localWishlist, setLocalWishlist] = useState([]);
// //   const { isLoggedIn } = useContext(AuthContext);

// //   const { addToCart } = useContext(CartContext);
// //   const { wishlistItems, addToWishlist, removeFromWishlist, fetchWishlist } =
// //     useContext(WishlistContext);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await axios.get(
// //           `${globalBackendRoute}/api/all-added-products`
// //         );
// //         const products = res.data || [];
// //         setAllProducts(products);
// //         setFilteredProducts(products);
// //       } catch (error) {
// //         console.error("Failed to fetch products:", error.message);
// //       }
// //     };
// //     fetchData();
// //     fetchWishlist();
// //   }, []);

// //   useEffect(() => {
// //     setLocalWishlist(wishlistItems.map((item) => item._id));
// //   }, [wishlistItems]);

// //   useEffect(() => {
// //     let sorted = [...filteredProducts];
// //     sorted.sort((a, b) => {
// //       const priceA = a.selling_price ?? a.price ?? 0;
// //       const priceB = b.selling_price ?? b.price ?? 0;

// //       if (sortOption === "priceLowHigh") return priceA - priceB;
// //       if (sortOption === "priceHighLow") return priceB - priceA;
// //       if (sortOption === "latest")
// //         return new Date(b.createdAt) - new Date(a.createdAt);
// //       if (sortOption === "oldest")
// //         return new Date(a.createdAt) - new Date(b.createdAt);
// //       if (sortOption === "popularity") return (b.views ?? 0) - (a.views ?? 0);
// //       return 0;
// //     });
// //     setFilteredProducts(sorted);
// //   }, [sortOption]);

// //   const handleFilterChange = (newFilteredProducts) => {
// //     setFilteredProducts(newFilteredProducts);
// //     setCurrentPage(1);
// //   };

// //   const handleWishlistToggle = async (product) => {
// //     const productId = product._id;
// //     const productName = product.product_name;

// //     if (!isLoggedIn) {
// //       toast.info("Please log in to use the wishlist", {
// //         position: "top-center",
// //         autoClose: 2000,
// //       });
// //       return;
// //     }

// //     const wishlistIds = wishlistItems.map(
// //       (item) => item._id || item.product?._id
// //     );

// //     try {
// //       if (wishlistIds.includes(productId)) {
// //         await removeFromWishlist(productId);
// //         await fetchWishlist();
// //       } else {
// //         const success = await addToWishlist(productId, product);
// //         if (success) await fetchWishlist();
// //       }

// //       setAnimatedMsgProductName(
// //         wishlistIds.includes(productId)
// //           ? `❌ ${productName} removed from wishlist`
// //           : `✨ ${productName} added to wishlist`
// //       );
// //       setShowAnimatedMsg(true);
// //       setTimeout(() => setShowAnimatedMsg(false), 2000);
// //     } catch (err) {
// //       console.error("🔥 Error in wishlist toggle:", err);
// //     }
// //   };

// //   const handleAddToCart = (product) => {
// //     if (product.availability_status) {
// //       addToCart(product);
// //     } else {
// //       toast.error("Cannot add. Product is Out of Stock!", { autoClose: 1200 });
// //     }
// //   };

// //   const filteredAndSearched = filteredProducts.filter((p) =>
// //     p.product_name?.toLowerCase().includes(searchText.toLowerCase())
// //   );

// //   const indexOfLastProduct = currentPage * productsPerPage;
// //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// //   const currentProducts = filteredAndSearched.slice(
// //     indexOfFirstProduct,
// //     indexOfLastProduct
// //   );
// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   return (
// //     <div className="font-sans">
// //       <div className="relative w-full h-[240px] overflow-hidden shadow-sm pt-16">
// //         <img
// //           src={one}
// //           alt="Banner"
// //           className="absolute inset-0 w-full h-full object-cover"
// //         />
// //         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
// //           <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">
// //             Shop All - Among <br className="sm:hidden" /> All Category and Brand
// //           </h1>
// //         </div>
// //       </div>

// //       <div className="py-6 px-4 flex flex-col lg:flex-row gap-10 container mx-auto">
// //         {showAnimatedMsg && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -10 }}
// //             className="fixed top-20 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-xl"
// //           >
// //             {animatedMsgProductName}
// //           </motion.div>
// //         )}

// //         <div className="w-full lg:w-1/5">
// //           <FiltersSidebar
// //             allProducts={allProducts}
// //             onFilterChange={handleFilterChange}
// //           />
// //         </div>

// //         <div className="w-full lg:w-4/5 mb-5">
// //           <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
// //             <div className="flex flex-wrap items-center gap-3">
// //               <label className="text-sm font-bold text-gray-900">
// //                 Sort by:
// //               </label>
// //               <select
// //                 value={sortOption}
// //                 onChange={(e) => setSortOption(e.target.value)}
// //                 className="px-2 py-1 rounded text-sm font-semibold text-red-700 border"
// //               >
// //                 <option value="popularity">Best Sellers</option>
// //                 <option value="priceLowHigh">Price: Low to High</option>
// //                 <option value="priceHighLow">Price: High to Low</option>
// //                 <option value="latest">Newest</option>
// //                 <option value="oldest">Oldest</option>
// //               </select>

// //               <input
// //                 type="text"
// //                 value={searchText}
// //                 onChange={(e) => setSearchText(e.target.value)}
// //                 placeholder="Search products..."
// //                 className="px-2 py-1 text-sm border rounded"
// //               />

// //               <span className="text-sm text-gray-600">
// //                 ({filteredAndSearched.length} products)
// //               </span>
// //             </div>

// //             <select
// //               value={productsPerPage}
// //               onChange={(e) => setProductsPerPage(Number(e.target.value))}
// //               className="border px-2 py-1 text-sm rounded font-semibold text-red-700"
// //             >
// //               {[6, 9, 12, 15, 18].map((n) => (
// //                 <option key={n} value={n}>
// //                   {n} / page
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             {viewMode === "grid" && (
// //               <ProductGrid
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //             {viewMode === "card" && (
// //               <ProductCard
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //             {viewMode === "list" && (
// //               <ProductList
// //                 products={currentProducts}
// //                 handleAddToCart={handleAddToCart}
// //                 handleToggleWishlist={handleWishlistToggle}
// //                 wishlist={localWishlist}
// //               />
// //             )}
// //           </div>

// //           {filteredAndSearched.length > productsPerPage && (
// //             <div className="flex justify-end mt-8">
// //               <Pagination
// //                 productsPerPage={productsPerPage}
// //                 totalProducts={filteredAndSearched.length}
// //                 currentPage={currentPage}
// //                 paginate={paginate}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Shop;

// /// final changes.

// // ✅ Full Shop.jsx - Updated with product count display and hover effect prep
// import React, { useState, useEffect, useContext } from "react";
// import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
// import ProductGrid from "../../components/shop_components/ProductGrid";
// import ProductCard from "../../components/shop_components/ProductCard";
// import ProductList from "../../components/shop_components/ProductList";
// import Pagination from "../../components/shop_components/Pagination";
// import axios from "axios";
// import { CartContext } from "../../components/cart_components/CartContext";
// import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
// import globalBackendRoute from "../../config/Config";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { AuthContext } from "../../components/auth_components/AuthManager";
// import one from "../../assets/images_and_videos/2.jpg";

// const Shop = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState("grid");
//   const [searchText, setSearchText] = useState("");
//   const [productsPerPage, setProductsPerPage] = useState(6);
//   const [sortOption, setSortOption] = useState("popularity");
//   const [showAnimatedMsg, setShowAnimatedMsg] = useState(false);
//   const [animatedMsgProductName, setAnimatedMsgProductName] = useState("");
//   const [localWishlist, setLocalWishlist] = useState([]);
//   const { isLoggedIn } = useContext(AuthContext);

//   const { addToCart } = useContext(CartContext);
//   const { wishlistItems, addToWishlist, removeFromWishlist, fetchWishlist } =
//     useContext(WishlistContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${globalBackendRoute}/api/all-added-products`
//         );
//         const products = res.data || [];
//         setAllProducts(products);
//         setFilteredProducts(products);
//       } catch (error) {
//         console.error("Failed to fetch products:", error.message);
//       }
//     };
//     fetchData();
//     fetchWishlist();
//   }, []);

//   useEffect(() => {
//     setLocalWishlist(wishlistItems.map((item) => item._id));
//   }, [wishlistItems]);

//   useEffect(() => {
//     let sorted = [...filteredProducts];
//     sorted.sort((a, b) => {
//       const priceA = a.selling_price ?? a.price ?? 0;
//       const priceB = b.selling_price ?? b.price ?? 0;

//       if (sortOption === "priceLowHigh") return priceA - priceB;
//       if (sortOption === "priceHighLow") return priceB - priceA;
//       if (sortOption === "latest")
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sortOption === "oldest")
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       if (sortOption === "popularity") return (b.views ?? 0) - (a.views ?? 0);
//       return 0;
//     });
//     setFilteredProducts(sorted);
//   }, [sortOption]);

//   const handleFilterChange = (newFilteredProducts) => {
//     setFilteredProducts(newFilteredProducts);
//     setCurrentPage(1);
//   };

//   const handleWishlistToggle = async (product) => {
//     const productId = product._id;
//     const productName = product.product_name;

//     if (!isLoggedIn) {
//       toast.info("Please log in to use the wishlist", {
//         position: "top-center",
//         autoClose: 2000,
//       });
//       return;
//     }

//     const wishlistIds = wishlistItems.map(
//       (item) => item._id || item.product?._id
//     );

//     try {
//       if (wishlistIds.includes(productId)) {
//         await removeFromWishlist(productId);
//         await fetchWishlist();
//       } else {
//         const success = await addToWishlist(productId, product);
//         if (success) await fetchWishlist();
//       }

//       setAnimatedMsgProductName(
//         wishlistIds.includes(productId)
//           ? `❌ ${productName} removed from wishlist`
//           : `✨ ${productName} added to wishlist`
//       );
//       setShowAnimatedMsg(true);
//       setTimeout(() => setShowAnimatedMsg(false), 2000);
//     } catch (err) {
//       console.error("🔥 Error in wishlist toggle:", err);
//     }
//   };

//   const handleAddToCart = (product) => {
//     if (product.availability_status) {
//       addToCart(product);
//     } else {
//       toast.error("Cannot add. Product is Out of Stock!", { autoClose: 1200 });
//     }
//   };

//   const filteredAndSearched = filteredProducts.filter((p) =>
//     p.product_name?.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredAndSearched.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="font-sans">
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

//       <div className="py-6 px-4 flex flex-col lg:flex-row gap-10 container mx-auto">
//         {showAnimatedMsg && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="fixed top-20 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-xl"
//           >
//             {animatedMsgProductName}
//           </motion.div>
//         )}

//         <div className="w-full lg:w-1/5">
//           <FiltersSidebar
//             allProducts={allProducts}
//             onFilterChange={handleFilterChange}
//           />
//         </div>

//         <div className="w-full lg:w-4/5 mb-5">
//           <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
//             <div className="flex flex-wrap items-center gap-3">
//               <label className="text-sm font-bold text-gray-900">
//                 Sort by:
//               </label>
//               <select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="px-2 py-1 rounded text-sm font-semibold text-red-700 border"
//               >
//                 <option value="popularity">Best Sellers</option>
//                 <option value="priceLowHigh">Price: Low to High</option>
//                 <option value="priceHighLow">Price: High to Low</option>
//                 <option value="latest">Newest</option>
//                 <option value="oldest">Oldest</option>
//               </select>

//               <input
//                 type="text"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 placeholder="Search products..."
//                 className="px-2 py-1 text-sm border rounded"
//               />

//               <span className="text-sm text-gray-600">
//                 Showing {currentProducts.length} of {filteredAndSearched.length}{" "}
//                 products
//               </span>
//             </div>

//             <select
//               value={productsPerPage}
//               onChange={(e) => setProductsPerPage(Number(e.target.value))}
//               className="border px-2 py-1 text-sm rounded font-semibold text-red-700"
//             >
//               {[6, 9, 12, 15, 18].map((n) => (
//                 <option key={n} value={n}>
//                   {n} / page
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             {viewMode === "grid" && (
//               <ProductGrid
//                 products={currentProducts}
//                 handleAddToCart={handleAddToCart}
//                 handleToggleWishlist={handleWishlistToggle}
//                 wishlist={localWishlist}
//               />
//             )}
//             {viewMode === "card" && (
//               <ProductCard
//                 products={currentProducts}
//                 handleAddToCart={handleAddToCart}
//                 handleToggleWishlist={handleWishlistToggle}
//                 wishlist={localWishlist}
//               />
//             )}
//             {viewMode === "list" && (
//               <ProductList
//                 products={currentProducts}
//                 handleAddToCart={handleAddToCart}
//                 handleToggleWishlist={handleWishlistToggle}
//                 wishlist={localWishlist}
//               />
//             )}
//           </div>

//           {filteredAndSearched.length > productsPerPage && (
//             <div className="flex justify-end mt-8">
//               <Pagination
//                 productsPerPage={productsPerPage}
//                 totalProducts={filteredAndSearched.length}
//                 currentPage={currentPage}
//                 paginate={paginate}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;

//

//

//

// ✅ Updated Shop.jsx with all requested features and 3 view icons
// import React, { useState, useEffect, useContext } from "react";
// import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
// import ProductGrid from "../../components/shop_components/ProductGrid";
// import ProductCard from "../../components/shop_components/ProductCard";
// import ProductList from "../../components/shop_components/ProductList";
// import Pagination from "../../components/shop_components/Pagination";
// import axios from "axios";
// import { CartContext } from "../../components/cart_components/CartContext";
// import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
// import globalBackendRoute from "../../config/Config";
// import { motion } from "framer-motion";
// import { FaTh, FaThList, FaIdBadge } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { AuthContext } from "../../components/auth_components/AuthManager";
// import one from "../../assets/images_and_videos/2.jpg";

// const Shop = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState("grid");
//   const [searchText, setSearchText] = useState("");
//   const [productsPerPage, setProductsPerPage] = useState(6);
//   const [sortOption, setSortOption] = useState("popularity");
//   const [showAnimatedMsg, setShowAnimatedMsg] = useState(false);
//   const [animatedMsgProductName, setAnimatedMsgProductName] = useState("");
//   const [localWishlist, setLocalWishlist] = useState([]);
//   const { isLoggedIn } = useContext(AuthContext);

//   const { addToCart } = useContext(CartContext);
//   const { wishlistItems, addToWishlist, removeFromWishlist, fetchWishlist } =
//     useContext(WishlistContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${globalBackendRoute}/api/all-added-products`
//         );
//         const products = res.data || [];
//         setAllProducts(products);
//         setFilteredProducts(products);
//       } catch (error) {
//         console.error("Failed to fetch products:", error.message);
//       }
//     };
//     fetchData();
//     fetchWishlist();
//   }, []);

//   useEffect(() => {
//     setLocalWishlist(wishlistItems.map((item) => item._id));
//   }, [wishlistItems]);

//   const handleFilterChange = (newFilteredProducts) => {
//     setFilteredProducts(newFilteredProducts);
//     setCurrentPage(1);
//   };

//   const handleWishlistToggle = async (product) => {
//     const productId = product._id;
//     const productName = product.product_name;

//     if (!isLoggedIn) {
//       toast.info("Please log in to use the wishlist", {
//         position: "top-center",
//         autoClose: 2000,
//       });
//       return;
//     }

//     const wishlistIds = wishlistItems.map(
//       (item) => item._id || item.product?._id
//     );

//     try {
//       if (wishlistIds.includes(productId)) {
//         await removeFromWishlist(productId);
//         await fetchWishlist();
//       } else {
//         const success = await addToWishlist(productId, product);
//         if (success) await fetchWishlist();
//       }

//       setAnimatedMsgProductName(
//         wishlistIds.includes(productId)
//           ? `❌ ${productName} removed from wishlist`
//           : `✨ ${productName} added to wishlist`
//       );
//       setShowAnimatedMsg(true);
//       setTimeout(() => setShowAnimatedMsg(false), 2000);
//     } catch (err) {
//       console.error("🔥 Error in wishlist toggle:", err);
//     }
//   };

//   const handleAddToCart = (product) => {
//     if (product.availability_status) {
//       addToCart(product);
//     } else {
//       toast.error("Cannot add. Product is Out of Stock!", { autoClose: 1200 });
//     }
//   };

//   const applySorting = (products) => {
//     const sorted = [...products];
//     switch (sortOption) {
//       case "priceLowHigh":
//         sorted.sort((a, b) => a.selling_price - b.selling_price);
//         break;
//       case "priceHighLow":
//         sorted.sort((a, b) => b.selling_price - a.selling_price);
//         break;
//       case "latest":
//         sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         break;
//       case "oldest":
//         sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//         break;
//       default:
//         break;
//     }
//     return sorted;
//   };

//   const filteredAndSearched = applySorting(
//     filteredProducts.filter((p) =>
//       p.product_name?.toLowerCase().includes(searchText.toLowerCase())
//     )
//   );

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredAndSearched.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="font-sans">
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

//       <div className="py-6 px-4 flex flex-col lg:flex-row gap-10 container mx-auto">
//         {showAnimatedMsg && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="fixed top-20 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-xl"
//           >
//             {animatedMsgProductName}
//           </motion.div>
//         )}

//         <div className="w-full lg:w-1/5">
//           <FiltersSidebar
//             allProducts={allProducts}
//             onFilterChange={handleFilterChange}
//           />
//         </div>

//         <div className="w-full lg:w-4/5 mb-5">
//           <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
//             <div className="flex flex-wrap items-center gap-3">
//               <label className="text-sm font-medium text-gray-700">
//                 Sort by:
//               </label>
//               <select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="font-bold px-2 py-1 rounded text-sm border border-gray-300 text-red-600"
//               >
//                 <option value="popularity">Best Sellers</option>
//                 <option value="priceLowHigh">Price: Low to High</option>
//                 <option value="priceHighLow">Price: High to Low</option>
//                 <option value="latest">Newest</option>
//                 <option value="oldest">Oldest</option>
//               </select>

//               <input
//                 type="text"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 placeholder="Search products..."
//                 className="px-2 py-1 text-sm border rounded"
//               />

//               <span className="text-sm text-gray-600">
//                 ({filteredAndSearched.length} products)
//               </span>

//               <div className="flex items-center gap-2 text-gray-600">
//                 <FaTh
//                   onClick={() => setViewMode("grid")}
//                   className={`cursor-pointer ${
//                     viewMode === "grid" ? "text-black" : ""
//                   }`}
//                 />
//                 <FaIdBadge
//                   onClick={() => setViewMode("card")}
//                   className={`cursor-pointer ${
//                     viewMode === "card" ? "text-black" : ""
//                   }`}
//                 />
//                 <FaThList
//                   onClick={() => setViewMode("list")}
//                   className={`cursor-pointer ${
//                     viewMode === "list" ? "text-black" : ""
//                   }`}
//                 />
//               </div>
//             </div>

//             <select
//               value={productsPerPage}
//               onChange={(e) => setProductsPerPage(Number(e.target.value))}
//               className="border px-2 py-1 text-sm rounded text-red-600"
//             >
//               {[6, 9, 12, 15, 18].map((n) => (
//                 <option key={n} value={n}>
//                   {n} / page
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             {viewMode === "grid" && (
//               <ProductGrid
//                 products={currentProducts}
//                 handleAddToCart={handleAddToCart}
//                 handleToggleWishlist={handleWishlistToggle}
//                 wishlist={localWishlist}
//               />
//             )}
//             {viewMode === "card" && (
//               <ProductCard
//                 products={currentProducts}
//                 handleAddToCart={handleAddToCart}
//                 handleToggleWishlist={handleWishlistToggle}
//                 wishlist={localWishlist}
//               />
//             )}
//             {viewMode === "list" && (
//               <ProductList
//                 products={currentProducts}
//                 handleAddToCart={handleAddToCart}
//                 handleToggleWishlist={handleWishlistToggle}
//                 wishlist={localWishlist}
//               />
//             )}
//           </div>

//           {filteredAndSearched.length > productsPerPage && (
//             <div className="flex justify-end mt-8">
//               <Pagination
//                 productsPerPage={productsPerPage}
//                 totalProducts={filteredAndSearched.length}
//                 currentPage={currentPage}
//                 paginate={paginate}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;

// improved layout.

import React, { useState, useEffect, useContext } from "react";
import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
import ProductGrid from "../../components/shop_components/ProductGrid";
import ProductCard from "../../components/shop_components/ProductCard";
import ProductList from "../../components/shop_components/ProductList";
import Pagination from "../../components/shop_components/Pagination";
import axios from "axios";
import { CartContext } from "../../components/cart_components/CartContext";
import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
import globalBackendRoute from "../../config/Config";
import { motion } from "framer-motion";
import { FaTh, FaThList, FaIdBadge } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../components/auth_components/AuthManager";
import one from "../../assets/images_and_videos/2.jpg";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [searchText, setSearchText] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState("popularity");
  const [showAnimatedMsg, setShowAnimatedMsg] = useState(false);
  const [animatedMsgProductName, setAnimatedMsgProductName] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist, fetchWishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/all-added-products`
        );
        const products = res.data || [];
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };
    fetchData();
    if (isLoggedIn) fetchWishlist();
  }, []);

  const handleFilterChange = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  const handleWishlistToggle = async (product) => {
    const productId = product._id;
    const isAlreadyInWishlist = wishlistItems.some(
      (item) => item._id === productId || item.product?._id === productId
    );

    try {
      if (isLoggedIn) {
        if (isAlreadyInWishlist) {
          await removeFromWishlist(productId);
        } else {
          await addToWishlist(product);
        }
        await fetchWishlist();
      } else {
        const guestWishlist = JSON.parse(
          localStorage.getItem("guest_wishlist") || "{}"
        );
        let updated = guestWishlist.items || [];
        if (isAlreadyInWishlist) {
          updated = updated.filter((item) => item._id !== productId);
        } else {
          updated.push(product);
        }
        localStorage.setItem(
          "guest_wishlist",
          JSON.stringify({
            items: updated,
            expiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
          })
        );
      }

      setAnimatedMsgProductName(
        isAlreadyInWishlist
          ? `❌ ${product.product_name} removed from wishlist`
          : `✨ ${product.product_name} added to wishlist`
      );
      setShowAnimatedMsg(true);
      setTimeout(() => setShowAnimatedMsg(false), 2000);
    } catch (err) {
      console.error("🔥 Error in wishlist toggle:", err);
    }
  };

  const handleAddToCart = (product) => {
    if (product.availability_status) {
      addToCart(product);
    } else {
      toast.error("Cannot add. Product is Out of Stock!", { autoClose: 1200 });
    }
  };

  const applySorting = (products) => {
    const sorted = [...products];
    switch (sortOption) {
      case "priceLowHigh":
        sorted.sort((a, b) => a.selling_price - b.selling_price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.selling_price - a.selling_price);
        break;
      case "latest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }
    return sorted;
  };

  const filteredAndSearched = applySorting(
    filteredProducts.filter((p) =>
      p.product_name?.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSearched.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="font-sans">
      <div className="relative w-full h-[240px] overflow-hidden shadow-sm pt-16">
        <img
          src={one}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
          <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">
            Shop All - Among <br className="sm:hidden" /> All Category and Brand
          </h1>
        </div>
      </div>

      <div className="py-6 px-4 flex flex-col lg:flex-row gap-10 container mx-auto">
        {showAnimatedMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-xl"
          >
            {animatedMsgProductName}
          </motion.div>
        )}

        <div className="w-full lg:w-1/5">
          <FiltersSidebar
            allProducts={allProducts}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="w-full lg:w-4/5 mb-5">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="font-bold px-2 py-1 rounded text-sm border border-gray-300 text-red-600"
              >
                <option value="popularity">Best Sellers</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="latest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-1 w-64 text-sm border rounded"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                ({filteredAndSearched.length} products)
              </span>
              <FaTh
                onClick={() => setViewMode("grid")}
                className={`cursor-pointer ${
                  viewMode === "grid" ? "text-black" : "text-gray-600"
                }`}
              />
              <FaIdBadge
                onClick={() => setViewMode("card")}
                className={`cursor-pointer ${
                  viewMode === "card" ? "text-black" : "text-gray-600"
                }`}
              />
              <FaThList
                onClick={() => setViewMode("list")}
                className={`cursor-pointer ${
                  viewMode === "list" ? "text-black" : "text-gray-600"
                }`}
              />
              <select
                value={productsPerPage}
                onChange={(e) => setProductsPerPage(Number(e.target.value))}
                className="border px-2 py-1 text-sm rounded text-red-600"
              >
                {[6, 9, 12, 15, 18].map((n) => (
                  <option key={n} value={n}>
                    {n} / page
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            {viewMode === "grid" && (
              <ProductGrid
                products={currentProducts}
                handleAddToCart={handleAddToCart}
                handleToggleWishlist={handleWishlistToggle}
                wishlist={wishlistItems.map((p) => p._id || p.product?._id)}
              />
            )}
            {viewMode === "card" && (
              <ProductCard
                products={currentProducts}
                handleAddToCart={handleAddToCart}
                handleToggleWishlist={handleWishlistToggle}
                wishlist={wishlistItems.map((p) => p._id || p.product?._id)}
              />
            )}
            {viewMode === "list" && (
              <ProductList
                products={currentProducts}
                handleAddToCart={handleAddToCart}
                handleToggleWishlist={handleWishlistToggle}
                wishlist={wishlistItems.map((p) => p._id || p.product?._id)}
              />
            )}
          </div>

          {filteredAndSearched.length > productsPerPage && (
            <div className="flex justify-end mt-8">
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={filteredAndSearched.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
