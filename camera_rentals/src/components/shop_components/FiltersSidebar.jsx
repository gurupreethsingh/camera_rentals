// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Tags,
//   ListFilter,
//   IndianRupee,
// } from "lucide-react";
// import * as Slider from "@radix-ui/react-slider";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import globalBackendRoute from "../../config/Config";

// const FiltersSidebar = ({ allProducts, onFilterChange, initialQuery }) => {
//   const [categoriesTree, setCategoriesTree] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [expandedCategories, setExpandedCategories] = useState({});
//   const [expandedBrands, setExpandedBrands] = useState(false);

//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);

//   const [sortOption, setSortOption] = useState("");

//   useEffect(() => {
//     fetchCategoriesAndSubcategories();
//   }, []);

//   useEffect(() => {
//     if (allProducts.length > 0) {
//       fetchBrands();
//       calculatePriceRange();
//     }
//   }, [allProducts]);

//   useEffect(() => {
//     if (
//       !initialQuery ||
//       allProducts.length === 0 ||
//       categoriesTree.length === 0 ||
//       brands.length === 0
//     )
//       return;

//     const q = initialQuery.toLowerCase();
//     let matched = false;

//     for (let cat of categoriesTree) {
//       if (cat.categoryName.toLowerCase() === q) {
//         setSelectedCategory(cat.categoryId);
//         setSelectedSubCategory(null);
//         matched = true;
//         break;
//       }

//       for (let sub of cat.subcategories) {
//         if (sub.name.toLowerCase() === q) {
//           setSelectedSubCategory(sub.id);
//           setSelectedCategory(null);
//           matched = true;
//           break;
//         }
//       }
//     }

//     if (!matched) {
//       const brandMatch = brands.find((b) => b.toLowerCase() === q);
//       if (brandMatch) {
//         setSelectedBrands([brandMatch]);
//       }
//     }
//   }, [initialQuery, allProducts, categoriesTree, brands]);

//   useEffect(() => {
//     applyFilters();
//   }, [
//     selectedCategory,
//     selectedSubCategory,
//     selectedBrands,
//     tempPriceRange,
//     sortOption,
//   ]);

//   const fetchCategoriesAndSubcategories = async () => {
//     try {
//       const [catRes, subCatRes] = await Promise.all([
//         axios.get(`${globalBackendRoute}/api/all-categories`),
//         axios.get(`${globalBackendRoute}/api/all-subcategories`),
//       ]);
//       const categories = catRes.data || [];
//       const subcategories = subCatRes.data || [];

//       const tree = categories.map((cat) => ({
//         categoryId: cat._id,
//         categoryName: cat.name.to(),
//         subcategories: subcategories
//           .filter((sub) => sub.category?._id === cat._id)
//           .map((sub) => ({
//             id: sub._id,
//             name: sub.subcategory_name.to(),
//           })),
//       }));

//       setCategoriesTree(tree);
//     } catch (error) {
//       console.error("Failed to fetch categories/subcategories:", error);
//     }
//   };

//   const fetchBrands = () => {
//     const brandSet = new Set();
//     allProducts.forEach((p) => {
//       if (p.brand && p.brand.trim() !== "") {
//         brandSet.add(p.brand.trim().to());
//       }
//     });
//     setBrands([...brandSet]);
//   };

//   const calculatePriceRange = () => {
//     const prices = allProducts
//       .map((p) => p.selling_price ?? p.price ?? 0)
//       .filter((p) => p > 0);

//     const minP = prices.length ? Math.floor(Math.min(...prices)) : 0;
//     const maxP = prices.length ? Math.ceil(Math.max(...prices)) : 1000;
//     setMinPrice(minP);
//     setMaxPrice(maxP);
//     setTempPriceRange([minP, maxP]);
//   };

//   const applyFilters = () => {
//     let filtered = [...allProducts];

//     // Category filter
//     if (selectedCategory) {
//       filtered = filtered.filter((p) => p.category?._id === selectedCategory);
//     }

//     // Subcategory filter
//     if (selectedSubCategory) {
//       filtered = filtered.filter(
//         (p) => p.subcategory?._id === selectedSubCategory
//       );
//     }

//     // Brand filter
//     if (selectedBrands.length > 0) {
//       filtered = filtered.filter((p) =>
//         selectedBrands.includes(p.brand?.to())
//       );
//     }

//     // Price range filter
//     filtered = filtered.filter((p) => {
//       const price = p.selling_price ?? p.price ?? 0;
//       return price >= tempPriceRange[0] && price <= tempPriceRange[1];
//     });

//     // Sorting logic
//     filtered.sort((a, b) => {
//       const priceA = a.selling_price ?? a.price ?? 0;
//       const priceB = b.selling_price ?? b.price ?? 0;

//       if (sortOption === "priceLowHigh") {
//         return priceA - priceB;
//       } else if (sortOption === "priceHighLow") {
//         return priceB - priceA;
//       } else if (sortOption === "latest") {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       } else if (sortOption === "oldest") {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       } else if (sortOption === "popularity") {
//         return (b.views ?? 0) - (a.views ?? 0);
//       }
//       return 0; // No sort
//     });

//     onFilterChange(filtered);
//   };

//   const handleClearFilters = () => {
//     setSelectedBrands([]);
//     setSelectedCategory(null);
//     setSelectedSubCategory(null);
//     setTempPriceRange([minPrice, maxPrice]);
//     setSortOption(""); // Reset sort too
//     onFilterChange(allProducts);
//   };

//   const isActive = (id, current) => id === current;

//   return (
//     <motion.div
//       className="w-full rounded-xl space-y-6"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="flex justify-center">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleClearFilters}
//           className="px-4 py-2 w-full  font-bold bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-full text-sm shadow-md hover:from-red-700 hover:to-red-500"
//         >
//           Clear Filters
//         </motion.button>
//       </div>

//       {/* Categories */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-700 ">
//           <ListFilter size={18} /> Categories
//         </div>
//         <div className="space-y-1">
//           {categoriesTree.map((cat, idx) => (
//             <div key={idx}>
//               <div className="flex items-center justify-between text-sm font-medium text-gray-700 ">
//                 <span
//                   className={`cursor-pointer transition font-bold ${
//                     isActive(cat.categoryId, selectedCategory)
//                       ? "text-orange-600"
//                       : "hover:text-black"
//                   }`}
//                   onClick={() => {
//                     setSelectedCategory(cat.categoryId);
//                     setSelectedSubCategory(null);
//                   }}
//                 >
//                   {cat.categoryName}
//                 </span>
//                 <motion.span
//                   className="cursor-pointer"
//                   onClick={() =>
//                     setExpandedCategories((prev) => ({
//                       ...prev,
//                       [cat.categoryName]: !prev[cat.categoryName],
//                     }))
//                   }
//                   animate={{
//                     rotate: expandedCategories[cat.categoryName] ? 90 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </motion.span>
//               </div>

//               <AnimatePresence initial={false}>
//                 {expandedCategories[cat.categoryName] && (
//                   <motion.div
//                     className="pl-4 mt-1 space-y-1"
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     {cat.subcategories.map((subcat, idx2) => (
//                       <div
//                         key={idx2}
//                         className={`text-sm  cursor-pointer transition font-medium ${
//                           isActive(subcat.id, selectedSubCategory)
//                             ? "text-orange-600"
//                             : "text-gray-500 hover:text-black"
//                         }`}
//                         onClick={() => {
//                           setSelectedSubCategory(subcat.id);
//                           setSelectedCategory(null);
//                         }}
//                       >
//                         {subcat.name}
//                       </div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Brands */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-700 ">
//           <Tags size={18} /> Brands
//         </div>
//         <div>
//           <div
//             className="flex items-center justify-between text-sm font-medium text-gray-700  cursor-pointer"
//             onClick={() => setExpandedBrands((prev) => !prev)}
//           >
//             <span>All Brands</span>
//             {expandedBrands ? <ChevronDown /> : <ChevronRight />}
//           </div>
//           <AnimatePresence>
//             {expandedBrands && (
//               <motion.div
//                 className="pl-4 mt-2 space-y-2"
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 {brands.map((brand, idx) => (
//                   <div
//                     key={idx}
//                     className={`flex items-center gap-2  transition font-medium cursor-pointer ${
//                       selectedBrands.includes(brand)
//                         ? "text-orange-600"
//                         : "text-gray-700 hover:text-black"
//                     }`}
//                     onClick={() => {
//                       let updated = [...selectedBrands];
//                       if (updated.includes(brand)) {
//                         updated = updated.filter((b) => b !== brand);
//                       } else {
//                         updated.push(brand);
//                       }
//                       setSelectedBrands(updated);
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedBrands.includes(brand)}
//                       readOnly
//                       className="accent-red-500"
//                     />
//                     <span className="text-sm">{brand}</span>
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Price Range */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-700 ">
//           <IndianRupee size={18} /> Price Range
//         </div>

//         <div className="px-2">
//           <Slider.Root
//             className="relative flex items-center select-none touch-none w-full h-5"
//             min={minPrice}
//             max={maxPrice}
//             step={10}
//             value={tempPriceRange}
//             onValueChange={(value) => setTempPriceRange(value)}
//           >
//             <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
//               <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
//             </Slider.Track>
//             <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow focus:outline-none" />
//             <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow focus:outline-none" />
//           </Slider.Root>

//           <div className="text-sm flex justify-between mt-2 text-gray-600 ">
//             <span>₹{tempPriceRange[0]}</span>
//             <span>₹{tempPriceRange[1]}</span>
//           </div>
//         </div>
//       </div>

//       {/* Sort By */}
//       {/* Sort By */}
//       <div>
//         <div className="flex items-center gap-2 mb-3 font-semibold text-red-700 ">
//           <ListFilter size={18} /> Sort By
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="flex flex-wrap gap-2"
//         >
//           {[
//             { value: "", label: "Default" },
//             { value: "priceLowHigh", label: "Price ↑" },
//             { value: "priceHighLow", label: "Price ↓" },
//             { value: "latest", label: "Newest" },
//             { value: "oldest", label: "Oldest" },
//             { value: "popularity", label: "Popular" },
//           ].map((option) => (
//             <motion.button
//               key={option.value}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setSortOption(option.value)}
//               className={`px-3 py-1 rounded-full text-xs font-semibold  transition-all duration-300 border
//           ${
//             sortOption === option.value
//               ? "bg-gradient-to-r from-red-500 to-orange-400 text-white border-transparent shadow"
//               : "bg-gray-100 text-gray-700 border-gray-300 hover:border-red-400"
//           }`}
//             >
//               {option.label}
//             </motion.button>
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default FiltersSidebar;

//

// ✅ FiltersSidebar.jsx
// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Tags,
//   ListFilter,
//   IndianRupee,
// } from "lucide-react";
// import * as Slider from "@radix-ui/react-slider";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import globalBackendRoute from "../../config/Config";

// const FiltersSidebar = ({ allProducts, onFilterChange, initialQuery }) => {
//   const [categoriesTree, setCategoriesTree] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [expandedCategories, setExpandedCategories] = useState({});
//   const [expandedBrands, setExpandedBrands] = useState(false);

//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);

//   const [sortOption, setSortOption] = useState("");

//   useEffect(() => {
//     fetchCategoriesAndSubcategories();
//   }, []);

//   useEffect(() => {
//     if (allProducts.length > 0) {
//       fetchBrands();
//       calculatePriceRange();
//     }
//   }, [allProducts]);

//   useEffect(() => {
//     if (
//       !initialQuery ||
//       allProducts.length === 0 ||
//       categoriesTree.length === 0 ||
//       brands.length === 0
//     )
//       return;

//     const q = initialQuery.toLowerCase();
//     let matched = false;

//     for (let cat of categoriesTree) {
//       if (cat.categoryName.toLowerCase() === q) {
//         setSelectedCategory(cat.categoryId);
//         setSelectedSubCategory(null);
//         matched = true;
//         break;
//       }
//       for (let sub of cat.subcategories) {
//         if (sub.name.toLowerCase() === q) {
//           setSelectedSubCategory(sub.id);
//           setSelectedCategory(null);
//           matched = true;
//           break;
//         }
//       }
//     }

//     if (!matched) {
//       const brandMatch = brands.find((b) => b.toLowerCase() === q);
//       if (brandMatch) setSelectedBrands([brandMatch]);
//     }
//   }, [initialQuery, allProducts, categoriesTree, brands]);

//   useEffect(() => {
//     applyFilters();
//   }, [
//     selectedCategory,
//     selectedSubCategory,
//     selectedBrands,
//     tempPriceRange,
//     sortOption,
//   ]);

//   const fetchCategoriesAndSubcategories = async () => {
//     try {
//       const [catRes, subCatRes] = await Promise.all([
//         axios.get(`${globalBackendRoute}/api/all-categories`),
//         axios.get(`${globalBackendRoute}/api/all-subcategories`),
//       ]);
//       const categories = catRes.data || [];
//       const subcategories = subCatRes.data || [];

//       const tree = categories.map((cat) => ({
//         categoryId: cat._id,
//         categoryName: cat.name.to(),
//         subcategories: subcategories
//           .filter((sub) => sub.category?._id === cat._id)
//           .map((sub) => ({
//             id: sub._id,
//             name: sub.subcategory_name.to(),
//           })),
//       }));

//       setCategoriesTree(tree);
//     } catch (error) {
//       console.error("Failed to fetch categories/subcategories:", error);
//     }
//   };

//   const fetchBrands = () => {
//     const brandSet = new Set();
//     allProducts.forEach((p) => {
//       if (p.brand && p.brand.trim() !== "") brandSet.add(p.brand.trim().to());
//     });
//     setBrands([...brandSet]);
//   };

//   const calculatePriceRange = () => {
//     const prices = allProducts
//       .map((p) => p.selling_price ?? p.price ?? 0)
//       .filter((p) => p > 0);
//     const minP = prices.length ? Math.floor(Math.min(...prices)) : 0;
//     const maxP = prices.length ? Math.ceil(Math.max(...prices)) : 1000;
//     setMinPrice(minP);
//     setMaxPrice(maxP);
//     setTempPriceRange([minP, maxP]);
//   };

//   const applyFilters = () => {
//     let filtered = [...allProducts];
//     if (selectedCategory)
//       filtered = filtered.filter((p) => p.category?._id === selectedCategory);
//     if (selectedSubCategory)
//       filtered = filtered.filter(
//         (p) => p.subcategory?._id === selectedSubCategory
//       );
//     if (selectedBrands.length > 0)
//       filtered = filtered.filter((p) => selectedBrands.includes(p.brand?.to()));
//     filtered = filtered.filter((p) => {
//       const price = p.selling_price ?? p.price ?? 0;
//       return price >= tempPriceRange[0] && price <= tempPriceRange[1];
//     });

//     filtered.sort((a, b) => {
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
//     onFilterChange(filtered);
//   };

//   const handleClearFilters = () => {
//     setSelectedBrands([]);
//     setSelectedCategory(null);
//     setSelectedSubCategory(null);
//     setTempPriceRange([minPrice, maxPrice]);
//     setSortOption("");
//     onFilterChange(allProducts);
//   };

//   const isActive = (id, current) => id === current;

//   return (
//     <motion.div
//       className="w-full rounded-xl space-y-6"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="flex justify-center">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleClearFilters}
//           className="px-4 py-2 w-full  font-bold bg-gray-900 text-white rounded-full text-sm shadow-md hover:from-red-700 hover:to-red-500"
//         >
//           Clear Filters
//         </motion.button>
//       </div>

//       {/* Categories */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-xl">
//           <ListFilter size={18} /> Categories
//         </div>
//         <div className="space-y-1">
//           {categoriesTree.map((cat, idx) => (
//             <div key={idx}>
//               <div className="flex items-center justify-between text-sm font-medium text-gray-700 ">
//                 <span
//                   className={`cursor-pointer transition font-bold ${
//                     isActive(cat.categoryId, selectedCategory)
//                       ? "text-red-700"
//                       : "hover:text-black"
//                   }`}
//                   onClick={() => {
//                     setSelectedCategory(cat.categoryId);
//                     setSelectedSubCategory(null);
//                   }}
//                 >
//                   {cat.categoryName}
//                 </span>
//                 <motion.span
//                   className="cursor-pointer"
//                   onClick={() =>
//                     setExpandedCategories((prev) => ({
//                       ...prev,
//                       [cat.categoryName]: !prev[cat.categoryName],
//                     }))
//                   }
//                   animate={{
//                     rotate: expandedCategories[cat.categoryName] ? 90 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </motion.span>
//               </div>
//               <AnimatePresence initial={false}>
//                 {expandedCategories[cat.categoryName] && (
//                   <motion.div
//                     className="pl-4 mt-1 space-y-1"
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     {cat.subcategories.map((subcat, idx2) => (
//                       <div
//                         key={idx2}
//                         className={`text-sm  cursor-pointer transition font-medium ${
//                           isActive(subcat.id, selectedSubCategory)
//                             ? "text-red-500"
//                             : "text-gray-500 hover:text-black"
//                         }`}
//                         onClick={() => {
//                           setSelectedSubCategory(subcat.id);
//                           setSelectedCategory(null);
//                         }}
//                       >
//                         {subcat.name}
//                       </div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Brands */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-xl">
//           <Tags size={18} /> Brands
//         </div>
//         <div>
//           <div
//             className="flex items-center justify-between text-sm font-medium text-gray-700  cursor-pointer"
//             onClick={() => setExpandedBrands((prev) => !prev)}
//           >
//             <span>All Brands</span>
//             {expandedBrands ? <ChevronDown /> : <ChevronRight />}
//           </div>
//           <AnimatePresence>
//             {expandedBrands && (
//               <motion.div
//                 className="pl-4 mt-2 space-y-2"
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 {brands.map((brand, idx) => (
//                   <div
//                     key={idx}
//                     className={`flex items-center gap-2 transition font-medium cursor-pointer ${
//                       selectedBrands.includes(brand)
//                         ? "text-red-500"
//                         : "text-gray-700 hover:text-black"
//                     }`}
//                     onClick={() => {
//                       let updated = [...selectedBrands];
//                       if (updated.includes(brand))
//                         updated = updated.filter((b) => b !== brand);
//                       else updated.push(brand);
//                       setSelectedBrands(updated);
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedBrands.includes(brand)}
//                       readOnly
//                       className="accent-red-500"
//                     />
//                     <span className="text-sm">{brand}</span>
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Price Range */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-xl">
//           <IndianRupee size={18} /> Price Range
//         </div>
//         <div className="px-2">
//           <Slider.Root
//             className="relative flex items-center select-none touch-none w-full h-5"
//             min={minPrice}
//             max={maxPrice}
//             step={10}
//             value={tempPriceRange}
//             onValueChange={(value) => setTempPriceRange(value)}
//           >
//             <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
//               <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
//             </Slider.Track>
//             <Slider.Thumb className="block w-5 h-5 bg-red-600 border-2 border-red-700 rounded-full shadow focus:outline-none" />
//             <Slider.Thumb className="block w-5 h-5 bg-red-600 border-2 border-red-700 rounded-full shadow focus:outline-none" />
//           </Slider.Root>{" "}
//           <div className="text-sm flex justify-between mt-2 text-gray-600 ">
//             <span>₹{tempPriceRange[0]}</span>
//             <span>₹{tempPriceRange[1]}</span>
//           </div>
//         </div>
//       </div>

//       {/* Sort By */}
//       <div>
//         <div className="flex items-center gap-2 mb-3 font-bold text-xl text-gray-900">
//           <ListFilter size={18} /> Sort By
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="flex flex-wrap gap-2"
//         >
//           {[
//             { value: "", label: "Default" },
//             { value: "priceLowHigh", label: "Price ↑" },
//             { value: "priceHighLow", label: "Price ↓" },
//             { value: "latest", label: "Newest" },
//             { value: "oldest", label: "Oldest" },
//             { value: "popularity", label: "Popular" },
//           ].map((option) => (
//             <motion.button
//               key={option.value}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setSortOption(option.value)}
//               className={`px-3 py-1 rounded-full text-xs font-semibold  transition-all duration-300 border ${
//                 sortOption === option.value
//                   ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-transparent shadow"
//                   : "bg-gray-100 text-gray-700 border-gray-300 hover:border-red-400"
//               }`}
//             >
//               {option.label}
//             </motion.button>
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default FiltersSidebar;

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Tags,
  ListFilter,
  IndianRupee,
} from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const FiltersSidebar = ({ allProducts, onFilterChange, initialQuery }) => {
  const [categoriesTree, setCategoriesTree] = useState([]);
  const [brands, setBrands] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  const [expandedBrands, setExpandedBrands] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);

  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      fetchBrands();
      calculatePriceRange();
    }
  }, [allProducts]);

  useEffect(() => {
    if (
      !initialQuery ||
      allProducts.length === 0 ||
      categoriesTree.length === 0 ||
      brands.length === 0
    )
      return;

    const q = initialQuery.toLowerCase();
    let matched = false;

    for (let cat of categoriesTree) {
      if (cat.categoryName.toLowerCase() === q) {
        setSelectedCategory(cat.categoryId);
        setSelectedSubCategory(null);
        matched = true;
        break;
      }
      for (let sub of cat.subcategories) {
        if (sub.name.toLowerCase() === q) {
          setSelectedSubCategory(sub.id);
          setSelectedCategory(null);
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      const brandMatch = brands.find((b) => b.toLowerCase() === q);
      if (brandMatch) setSelectedBrands([brandMatch]);
    }
  }, [initialQuery, allProducts, categoriesTree, brands]);

  useEffect(() => {
    applyFilters();
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedBrands,
    tempPriceRange,
    sortOption,
  ]);

  const fetchCategoriesAndSubcategories = async () => {
    try {
      const [catRes, subCatRes] = await Promise.all([
        axios.get(`${globalBackendRoute}/api/all-categories`),
        axios.get(`${globalBackendRoute}/api/all-subcategories`),
      ]);
      const categories = catRes.data || [];
      const subcategories = subCatRes.data || [];

      const tree = categories.map((cat) => ({
        categoryId: cat._id,
        categoryName: cat.name || "",
        subcategories: subcategories
          .filter((sub) => sub.category?._id === cat._id)
          .map((sub) => ({
            id: sub._id,
            name: sub.subcategory_name || "",
          })),
      }));

      setCategoriesTree(tree);
    } catch (error) {
      console.error("Failed to fetch categories/subcategories:", error);
    }
  };

  const fetchBrands = () => {
    const brandSet = new Set();
    allProducts.forEach((p) => {
      if (p.brand && p.brand.trim() !== "")
        brandSet.add(p.brand.trim().toLowerCase());
    });
    setBrands([...brandSet]);
  };

  const calculatePriceRange = () => {
    const prices = allProducts
      .map((p) => p.selling_price ?? p.price ?? 0)
      .filter((p) => p > 0);
    const minP = prices.length ? Math.floor(Math.min(...prices)) : 0;
    const maxP = prices.length ? Math.ceil(Math.max(...prices)) : 1000;
    setMinPrice(minP);
    setMaxPrice(maxP);
    setTempPriceRange([minP, maxP]);
  };

  const applyFilters = () => {
    let filtered = [...allProducts];
    if (selectedCategory)
      filtered = filtered.filter((p) => p.category?._id === selectedCategory);
    if (selectedSubCategory)
      filtered = filtered.filter(
        (p) => p.subcategory?._id === selectedSubCategory
      );
    if (selectedBrands.length > 0)
      filtered = filtered.filter((p) =>
        selectedBrands.includes(p.brand?.trim().toLowerCase())
      );
    filtered = filtered.filter((p) => {
      const price = p.selling_price ?? p.price ?? 0;
      return price >= tempPriceRange[0] && price <= tempPriceRange[1];
    });

    filtered.sort((a, b) => {
      const priceA = a.selling_price ?? a.price ?? 0;
      const priceB = b.selling_price ?? b.price ?? 0;
      if (sortOption === "priceLowHigh") return priceA - priceB;
      if (sortOption === "priceHighLow") return priceB - priceA;
      if (sortOption === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "popularity") return (b.views ?? 0) - (a.views ?? 0);
      return 0;
    });
    onFilterChange(filtered);
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setTempPriceRange([minPrice, maxPrice]);
    setSortOption("");
    onFilterChange(allProducts);
  };

  const isActive = (id, current) => id === current;

  return (
    <div className="w-full rounded-xl space-y-6">
      <div className="flex justify-center">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 w-full font-bold bg-gray-900 text-white rounded-full text-sm shadow-md hover:bg-red-600 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-xl">
          <ListFilter size={18} /> Categories
        </div>
        <div className="space-y-1">
          {categoriesTree.map((cat, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span
                  className={`cursor-pointer transition font-bold ${
                    isActive(cat.categoryId, selectedCategory)
                      ? "text-red-700"
                      : "hover:text-black"
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat.categoryId);
                    setSelectedSubCategory(null);
                  }}
                >
                  {cat.categoryName}
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedCategories((prev) => ({
                      ...prev,
                      [cat.categoryName]: !prev[cat.categoryName],
                    }))
                  }
                >
                  <ChevronRight
                    className={`w-4 h-4 transform transition-transform ${
                      expandedCategories[cat.categoryName] ? "rotate-90" : ""
                    }`}
                  />
                </span>
              </div>
              {expandedCategories[cat.categoryName] && (
                <div className="pl-4 mt-1 space-y-1">
                  {cat.subcategories.map((subcat, idx2) => (
                    <div
                      key={idx2}
                      className={`text-sm cursor-pointer transition font-medium ${
                        isActive(subcat.id, selectedSubCategory)
                          ? "text-red-500"
                          : "text-gray-500 hover:text-black"
                      }`}
                      onClick={() => {
                        setSelectedSubCategory(subcat.id);
                        setSelectedCategory(null);
                      }}
                    >
                      {subcat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-xl">
          <Tags size={18} /> Brands
        </div>
        <div>
          <div
            className="flex items-center justify-between text-sm font-medium text-gray-700 cursor-pointer"
            onClick={() => setExpandedBrands((prev) => !prev)}
          >
            <span>All Brands</span>
            {expandedBrands ? <ChevronDown /> : <ChevronRight />}
          </div>
          {expandedBrands && (
            <div className="pl-4 mt-2 space-y-2">
              {brands.map((brand, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 transition font-medium cursor-pointer ${
                    selectedBrands.includes(brand)
                      ? "text-red-500"
                      : "text-gray-700 hover:text-black"
                  }`}
                  onClick={() => {
                    let updated = [...selectedBrands];
                    if (updated.includes(brand))
                      updated = updated.filter((b) => b !== brand);
                    else updated.push(brand);
                    setSelectedBrands(updated);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    readOnly
                    className="accent-red-500"
                  />
                  <span className="text-sm">{brand}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-xl">
          <IndianRupee size={18} /> Price Range
        </div>
        <div className="px-2">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={tempPriceRange}
            onValueChange={(value) => setTempPriceRange(value)}
          >
            <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-red-600 border-2 border-red-700 rounded-full shadow" />
            <Slider.Thumb className="block w-5 h-5 bg-red-600 border-2 border-red-700 rounded-full shadow" />
          </Slider.Root>
          <div className="text-sm flex justify-between mt-2 text-gray-600">
            <span>₹{tempPriceRange[0]}</span>
            <span>₹{tempPriceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <div className="flex items-center gap-2 mb-3 font-bold text-xl text-gray-900">
          <ListFilter size={18} /> Sort By
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "", label: "Default" },
            { value: "priceLowHigh", label: "Price ↑" },
            { value: "priceHighLow", label: "Price ↓" },
            { value: "latest", label: "Newest" },
            { value: "oldest", label: "Oldest" },
            { value: "popularity", label: "Popular" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortOption(option.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                sortOption === option.value
                  ? "bg-red-600 text-white border-transparent"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:border-red-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
