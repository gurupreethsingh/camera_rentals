// import React, { useState, useEffect, useContext } from "react";
// import { FaStar, FaHeart } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import globalBackendRoute from "../../config/Config";
// import { CartContext } from "../../components/cart_components/CartContext";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const { addToCart } = useContext(CartContext);
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [imageList, setImageList] = useState([]);

//   const getFullImageUrl = (img) =>
//     img
//       ? `${globalBackendRoute}/uploads/products/${img
//           .replace(/\\/g, "/")
//           .split("/")
//           .pop()}`
//       : "https://via.placeholder.com/300";

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const res = await axios.get(
//         `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
//       );
//       const data = res.data;
//       setProduct(data);

//       // Collect image list from all image fields
//       const images = [
//         data.product_image,
//         data.product_image_1,
//         data.product_image_2,
//         data.product_image_3,
//         data.product_image_4,
//         data.product_image_5,
//         data.product_image_6,
//         data.product_image_7,
//         data.product_image_8,
//         data.product_image_9,
//         data.product_image_10,
//       ].filter(Boolean);

//       setImageList(images);
//       setMainImage(data.product_image || images[0] || "");
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product)
//     return <div className="p-8 text-center text-gray-500">Loading...</div>;

//   return (
//     <div className="bg-white font-sans text-gray-800 max-w-screen-xl mx-auto py-12 px-6">
//       {/* Product Top Section */}
//       <div className="flex flex-col md:flex-row gap-10">
//         <div className="md:w-1/2 flex justify-center">
//           <img
//             src={getFullImageUrl(mainImage)}
//             alt="Main"
//             className="w-full max-w-md object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//         <div className="md:w-1/2 space-y-4">
//           <h1 className="text-2xl md:text-3xl font-bold">
//             {product.product_name}
//           </h1>
//           <div className="flex items-center gap-2 text-red-500 text-sm">
//             {[...Array(5)].map((_, idx) => (
//               <FaStar key={idx} />
//             ))}
//             <span className="underline text-gray-600 cursor-pointer">
//               read reviews
//             </span>
//           </div>
//           <p className="text-gray-600 text-sm leading-relaxed">
//             {product.description}
//           </p>
//           <button
//             className="mt-4 bg-black text-white px-5 py-2 rounded hover:opacity-90"
//             onClick={() => addToCart(product)}
//           >
//             Add to Cart
//           </button>
//           <div className="text-3xl font-bold text-red-600 mt-2">
//             ₹{product.selling_price || 4999}
//           </div>
//           <ul className="list-disc list-inside mt-4 space-y-1 text-sm text-gray-700">
//             <li>45MP Full-Frame CMOS Sensor</li>
//             <li>DIGIC X Image Processor</li>
//             <li>8K30 Raw and 4K120 10-Bit Internal Video</li>
//             <li>Sensor-Shift 5-Axis Image Stabilization</li>
//           </ul>
//         </div>
//       </div>

//       {/* Image Thumbnails */}
//       <div className="mt-12 flex gap-3 overflow-x-auto scrollbar-hide py-4 border-t border-b">
//         {imageList.map((img, idx) => (
//           <img
//             key={idx}
//             src={getFullImageUrl(img)}
//             alt={`thumb-${idx}`}
//             className={`w-24 h-20 object-cover border rounded-md cursor-pointer hover:opacity-80 ${
//               mainImage === img ? "border-red-500" : "border-gray-300"
//             }`}
//             onClick={() => setMainImage(img)}
//           />
//         ))}
//       </div>

//       {/* Section Tabs */}
//       <div className="mt-6 flex justify-around text-sm text-gray-500 border-b pb-4">
//         {[
//           "Overview",
//           "Features",
//           "Specification",
//           "Customers Images",
//           "Watch",
//           "Video",
//         ].map((label) => (
//           <button key={label} className="hover:text-red-600">
//             {label}
//           </button>
//         ))}
//       </div>

//       {/* Accessories Section */}
//       <div className="mt-10">
//         <h2 className="text-lg font-bold text-red-600 mb-4">
//           Recommended Accessories
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {[
//             { title: "Control Ring Mount Adapter EF-EOS R", price: 199 },
//             { title: "Zhiyun-Tech WEEBILL-S Handheld", price: 399 },
//             { title: "LP-E6NH Lithium-Ion Battery (2130mAh)", price: 79 },
//             { title: "Card SanDisk 128GB Extreme Pro", price: 479 },
//           ].map((acc, idx) => (
//             <div
//               key={idx}
//               className="text-center border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
//             >
//               <div className="h-32 bg-gray-100 mb-3 flex items-center justify-center">
//                 <span className="text-sm text-gray-400">Image</span>
//               </div>
//               <h4 className="text-sm font-medium">{acc.title}</h4>
//               <div className="flex items-center justify-center gap-1 text-red-500 my-1">
//                 {[...Array(5)].map((_, starIdx) => (
//                   <FaStar key={starIdx} className="text-xs" />
//                 ))}
//               </div>
//               <div className="text-lg font-semibold">${acc.price}</div>
//               <button className="mt-2 bg-black text-white px-4 py-1 rounded text-sm hover:opacity-90">
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;

///

// import React, { useState, useEffect, useContext } from "react";
// import { FaStar, FaHeart } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import globalBackendRoute from "../../config/Config";
// import { CartContext } from "../../components/cart_components/CartContext";
// import one from "../../assets/images_and_videos/2.jpg";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const { addToCart } = useContext(CartContext);
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [imageList, setImageList] = useState([]);
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [recommendedProducts, setRecommendedProducts] = useState([]);
//   const [rentDetails, setRentDetails] = useState(null);

//   const getFullImageUrl = (img) =>
//     img
//       ? `${globalBackendRoute}/uploads/products/${img
//           .replace(/\\/g, "/")
//           .split("/")
//           .pop()}`
//       : "https://via.placeholder.com/300";

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get(
//         `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
//       );
//       const data = res.data;
//       setProduct(data);

//       const images = [
//         data.product_image,
//         data.product_image_1,
//         data.product_image_2,
//         data.product_image_3,
//         data.product_image_4,
//         data.product_image_5,
//         data.product_image_6,
//         data.product_image_7,
//         data.product_image_8,
//         data.product_image_9,
//         data.product_image_10,
//       ].filter(Boolean);

//       setImageList(images);
//       setMainImage(data.product_image || images[0] || "");

//       // Fetch recommendations
//       const recRes = await axios.get(
//         `${globalBackendRoute}/api/search-products?category=${data.category}&subcategory=${data.subcategory}&brand=${data.brand}`
//       );
//       setRecommendedProducts(
//         recRes.data.filter((item) => item._id !== data._id).slice(0, 10)
//       );

//       // Fetch rent details
//       const rentRes = await axios.get(
//         `${globalBackendRoute}/api/rent-details-by-product-id/${data._id}`
//       );
//       if (rentRes.data) setRentDetails(rentRes.data);
//     };

//     fetchData();
//   }, [id]);

//   if (!product)
//     return <div className="p-8 text-center text-gray-500">Loading...</div>;

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
//       <div className="bg-white font-sans text-gray-800 max-w-screen-xl mx-auto py-12 px-6">
//         {/* Product Top Section */}
//         <div className="flex flex-col md:flex-row gap-10">
//           <div className="md:w-1/2 flex justify-center">
//             <div className="relative overflow-hidden">
//               <img
//                 src={getFullImageUrl(mainImage)}
//                 alt="Main"
//                 className="w-full max-w-md object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-110"
//                 style={{ transition: "transform 0.3s ease-in-out" }}
//               />
//             </div>
//           </div>
//           <div className="md:w-1/2 space-y-4">
//             <h1 className="text-2xl md:text-3xl font-bold">
//               {product.product_name}
//             </h1>
//             <div className="flex items-center gap-2 text-red-500 text-sm">
//               {[...Array(5)].map((_, idx) => (
//                 <FaStar key={idx} />
//               ))}
//               <span className="underline text-gray-600 cursor-pointer">
//                 read reviews
//               </span>
//             </div>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {product.description}
//             </p>
//             <button
//               className="mt-4 bg-black text-white px-5 py-2 rounded hover:opacity-90"
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart
//             </button>
//             <div className="text-3xl font-bold text-red-600 mt-2">
//               ₹{product.selling_price || 4999}
//             </div>
//             {/* Rent Section */}
//             {rentDetails && (
//               <div className="mt-4 text-sm text-gray-700">
//                 <h3 className="text-md font-bold text-green-700 mb-1">
//                   Renting Details:
//                 </h3>
//                 <p>Price Per Day: ₹{rentDetails.price_per_day}</p>
//                 <p>Security Deposit: ₹{rentDetails.security_deposit}</p>
//                 <p>Minimum Days: {rentDetails.minimum_days} days</p>
//                 <p>
//                   Pickup Required: {rentDetails.pickup_required ? "Yes" : "No"}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Image Thumbnails */}
//         <div className="mt-12 flex gap-3 overflow-x-auto scrollbar-hide py-4 border-t border-b">
//           {imageList.map((img, idx) => (
//             <img
//               key={idx}
//               src={getFullImageUrl(img)}
//               alt={`thumb-${idx}`}
//               className={`w-24 h-20 object-cover border rounded-md cursor-pointer hover:opacity-80 ${
//                 mainImage === img ? "border-red-500" : "border-gray-300"
//               }`}
//               onClick={() => setMainImage(img)}
//             />
//           ))}
//         </div>

//         {/* Tab Section */}
//         <div className="mt-6 flex justify-around text-sm text-gray-500 border-b pb-4">
//           {[
//             "Overview",
//             "Features",
//             "Specification",
//             "Customers Images",
//             "Watch",
//             "Video",
//           ].map((label) => (
//             <button
//               key={label}
//               onClick={() => setActiveTab(label)}
//               className={`hover:text-red-600 ${
//                 activeTab === label ? "text-red-600 font-semibold" : ""
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="mt-6 text-sm text-gray-700">
//           {activeTab === "Overview" && (
//             <p>{product.overview || "No overview available."}</p>
//           )}
//           {activeTab === "Features" && (
//             <ul className="list-disc list-inside">
//               {(product.features || []).map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           )}
//           {activeTab === "Specification" && (
//             <p>{product.specification || "No specification available."}</p>
//           )}
//           {activeTab === "Customers Images" && <p>No customer images yet.</p>}
//           {activeTab === "Watch" && <p>No watch section available.</p>}
//           {activeTab === "Video" && <p>No video available yet.</p>}
//         </div>

//         {/* Recommended Accessories */}
//         <div className="mt-10">
//           <h2 className="text-lg font-bold text-red-600 mb-4">
//             Recommended Accessories
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {recommendedProducts.length > 0 ? (
//               recommendedProducts.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="text-center border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
//                 >
//                   <img
//                     src={getFullImageUrl(item.product_image)}
//                     alt="rec"
//                     className="w-full h-32 object-cover mb-2 rounded"
//                   />
//                   <h4 className="text-sm font-medium">{item.product_name}</h4>
//                   <div className="flex items-center justify-center gap-1 text-red-500 my-1">
//                     {[...Array(5)].map((_, starIdx) => (
//                       <FaStar key={starIdx} className="text-xs" />
//                     ))}
//                   </div>
//                   <div className="text-lg font-semibold">
//                     ₹{item.selling_price}
//                   </div>
//                   <button
//                     className="mt-2 bg-black text-white px-4 py-1 rounded text-sm hover:opacity-90"
//                     onClick={() => addToCart(item)}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400">No related products found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;

//

// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import globalBackendRoute from "../../config/Config";
// import { CartContext } from "../../components/cart_components/CartContext";
// import { FaStar } from "react-icons/fa";
// import one from "../../assets/images_and_videos/2.jpg";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const { addToCart } = useContext(CartContext);
//   const [product, setProduct] = useState(null);
//   const [rentDetails, setRentDetails] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [imageList, setImageList] = useState([]);
//   const [activeSection, setActiveSection] = useState("Overview");
//   const [recommended, setRecommended] = useState([]);

//   const zoomRef = useRef(null);

//   const getFullImageUrl = (img) =>
//     img
//       ? `${globalBackendRoute}/uploads/products/${img
//           .replace(/\\/g, "/")
//           .split("/")
//           .pop()}`
//       : "https://via.placeholder.com/300";

//   useEffect(() => {
//     const fetchProductAndRent = async () => {
//       const { data } = await axios.get(
//         `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
//       );
//       setProduct(data);
//       const images = [
//         data.product_image,
//         data.product_image_1,
//         data.product_image_2,
//         data.product_image_3,
//         data.product_image_4,
//         data.product_image_5,
//         data.product_image_6,
//         data.product_image_7,
//         data.product_image_8,
//         data.product_image_9,
//         data.product_image_10,
//       ].filter(Boolean);
//       setImageList(images);
//       setMainImage(data.product_image || images[0] || "");

//       const rentRes = await axios.get(
//         `${globalBackendRoute}/api/get-rent-details-by-product/${data._id}`
//       );
//       setRentDetails(rentRes.data || null);

//       const resCat = await axios.get(
//         `${globalBackendRoute}/api/get-products-by-category/${data.category}`
//       );
//       const resSub = await axios.get(
//         `${globalBackendRoute}/api/get-products-by-subcategory/${data.subcategory}`
//       );
//       const all = [...resCat.data, ...resSub.data];
//       const filtered = all.filter(
//         (p) => p._id !== data._id && p.brand === data.brand
//       );
//       setRecommended(filtered.slice(0, 10));
//     };

//     fetchProductAndRent();
//   }, [id]);

//   const handleMouseMove = (e) => {
//     const zoomer = zoomRef.current;
//     if (!zoomer) return;
//     const rect = zoomer.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     zoomer.style.backgroundPosition = `${x}% ${y}%`;
//   };

//   if (!product)
//     return <div className="p-8 text-center text-gray-500">Loading...</div>;

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

//       <div className="bg-white font-sans text-gray-800 max-w-screen-xl mx-auto py-12 px-6">
//         <div className="flex flex-col md:flex-row gap-10">
//           {/* LEFT: Image with Zoom */}
//           <div className="md:w-1/2">
//             <div
//               ref={zoomRef}
//               className="w-full h-[480px] overflow-hidden rounded-lg shadow-lg bg-no-repeat bg-cover bg-center"
//               style={{
//                 backgroundImage: `url(${getFullImageUrl(mainImage)})`,
//               }}
//               onMouseMove={handleMouseMove}
//               onMouseLeave={() =>
//                 (zoomRef.current.style.backgroundPosition = "center")
//               }
//             >
//               <img
//                 src={getFullImageUrl(mainImage)}
//                 alt="Main"
//                 className="opacity-0 w-full h-full"
//               />
//             </div>
//           </div>

//           {/* RIGHT: Product Info */}
//           <div className="md:w-1/2 space-y-4">
//             <h1 className="text-2xl md:text-3xl font-bold">
//               {product.product_name}
//             </h1>
//             <div className="flex items-center gap-2 text-red-500 text-sm">
//               {[...Array(5)].map((_, idx) => (
//                 <FaStar key={idx} />
//               ))}
//               <span className="underline text-gray-600 cursor-pointer">
//                 read reviews
//               </span>
//             </div>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {product.description}
//             </p>
//             <button
//               className="mt-4 bg-black text-white px-5 py-2 rounded hover:opacity-90"
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart
//             </button>
//             <div className="text-3xl font-bold text-red-600 mt-2">
//               ₹{product.selling_price || 4999}
//             </div>

//             {rentDetails && (
//               <div className="mt-4 text-sm text-gray-700">
//                 <p>
//                   <strong>Rent Per Day:</strong> ₹{rentDetails.rent_per_day}
//                 </p>
//                 <p>
//                   <strong>Rent Per Week:</strong> ₹{rentDetails.rent_per_week}
//                 </p>
//                 <p>
//                   <strong>Deposit:</strong> ₹{rentDetails.security_deposit}
//                 </p>
//                 <p>
//                   <strong>Rental Terms:</strong> {rentDetails.rental_terms}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Thumbnails */}
//         <div className="mt-8 flex gap-3 overflow-x-auto py-4 border-t border-b">
//           {imageList.map((img, idx) => (
//             <img
//               key={idx}
//               src={getFullImageUrl(img)}
//               alt={`thumb-${idx}`}
//               className={`w-28 h-20 object-cover border rounded-md cursor-pointer hover:opacity-80 shadow-md ${
//                 mainImage === img ? "border-red-500" : "border-0"
//               }`}
//               onClick={() => setMainImage(img)}
//             />
//           ))}
//         </div>

//         {/* Section Tabs */}
//         <div className="mt-6 flex justify-around text-sm text-gray-500 border-b pb-4">
//           {[
//             "Overview",
//             "Features",
//             "Specification",
//             "Customers Images",
//             "Watch",
//             "Video",
//           ].map((label) => (
//             <button
//               key={label}
//               className={`hover:text-red-600 ${
//                 activeSection === label ? "text-red-600 font-semibold" : ""
//               }`}
//               onClick={() => setActiveSection(label)}
//             >
//               {label}
//             </button>
//           ))}
//         </div>

//         {/* Section Content */}
//         <div className="mt-4 text-sm text-gray-600">
//           {activeSection === "Overview" && (
//             <p>
//               {product.overview || "No overview provided for this product."}
//             </p>
//           )}
//           {activeSection === "Features" && (
//             <ul className="list-disc list-inside space-y-1">
//               {(product.features || ["Feature list missing."]).map((f, idx) => (
//                 <li key={idx}>{f}</li>
//               ))}
//             </ul>
//           )}
//           {activeSection === "Specification" && (
//             <ul className="list-disc list-inside space-y-1">
//               {(
//                 product.specifications || ["Specifications not available."]
//               ).map((spec, idx) => (
//                 <li key={idx}>{spec}</li>
//               ))}
//             </ul>
//           )}
//           {activeSection === "Customers Images" && (
//             <p>Customer image gallery coming soon.</p>
//           )}
//           {activeSection === "Watch" && (
//             <p>Watch section will embed product-related media here.</p>
//           )}
//           {activeSection === "Video" && (
//             <p>Video section will display product videos here.</p>
//           )}
//         </div>

//         {/* Recommended Accessories */}
//         <div className="mt-10">
//           <h2 className="text-lg font-bold text-red-600 mb-4">
//             Recommended Accessories
//           </h2>
//           {recommended.length === 0 ? (
//             <p className="text-gray-500 text-sm">No accessories found.</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//               {recommended.map((item) => (
//                 <div
//                   key={item._id}
//                   className="text-center border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
//                 >
//                   <img
//                     src={getFullImageUrl(item.product_image)}
//                     alt={item.product_name}
//                     className="h-28 w-full object-cover mb-2 rounded"
//                   />
//                   <h4 className="text-sm font-medium">{item.product_name}</h4>
//                   <div className="text-red-600 font-semibold">
//                     ₹{item.selling_price}
//                   </div>
//                   <button
//                     className="mt-2 bg-black text-white px-3 py-1 rounded text-sm hover:opacity-90"
//                     onClick={() => addToCart(item)}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;

//
import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { CartContext } from "../../components/cart_components/CartContext";
import { FaStar } from "react-icons/fa";
import one from "../../assets/images_and_videos/2.jpg";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [rentDetails, setRentDetails] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [activeSection, setActiveSection] = useState("Overview");
  const [recommended, setRecommended] = useState([]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [thumbIndex, setThumbIndex] = useState(0);
  const zoomRef = useRef();

  const getFullImageUrl = (img) =>
    img
      ? `${globalBackendRoute}/uploads/products/${img
          .replace(/\\/g, "/")
          .split("/")
          .pop()}`
      : "https://via.placeholder.com/300";

  useEffect(() => {
    const fetchProductAndRent = async () => {
      const { data } = await axios.get(
        `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
      );
      setProduct(data);
      const images = [
        data.product_image,
        data.product_image_1,
        data.product_image_2,
        data.product_image_3,
        data.product_image_4,
        data.product_image_5,
        data.product_image_6,
        data.product_image_7,
        data.product_image_8,
        data.product_image_9,
        data.product_image_10,
      ].filter(Boolean);
      setImageList(images);
      setMainImage(data.product_image || images[0] || "");

      const rentRes = await axios.get(
        `${globalBackendRoute}/api/get-rent-details-by-product/${data._id}`
      );
      setRentDetails(rentRes.data || null);

      const resCat = await axios.get(
        `${globalBackendRoute}/api/get-products-by-category/${data.category}`
      );
      const resSub = await axios.get(
        `${globalBackendRoute}/api/get-products-by-subcategory/${data.subcategory}`
      );
      const all = [...resCat.data, ...resSub.data];
      const filtered = all.filter(
        (p) => p._id !== data._id && p.brand === data.brand
      );
      setRecommended(filtered.slice(0, 10));
    };

    fetchProductAndRent();
  }, [id]);

  const handleZoom = (e) => {
    const { left, top, width, height } =
      zoomRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${getFullImageUrl(mainImage)})`,
      backgroundSize: "200%",
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleLeftArrow = () => {
    setThumbIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRightArrow = () => {
    if (thumbIndex + 5 < imageList.length) {
      setThumbIndex((prev) => prev + 1);
    }
  };

  if (!product)
    return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="bg-white font-sans text-gray-800 max-w-screen-xl mx-auto py-12">
      <div className="flex flex-col md:flex-row gap-10 px-4">
        {/* Main Image with Zoom */}
        <div className="md:w-1/2 relative">
          <div
            ref={zoomRef}
            onMouseMove={handleZoom}
            onMouseLeave={() => setZoomStyle({})}
            className="relative w-full h-[500px] overflow-hidden rounded-lg shadow bg-no-repeat bg-center transition-all duration-200"
            style={zoomStyle.backgroundImage ? zoomStyle : {}}
          >
            {!zoomStyle.backgroundImage && (
              <img
                src={getFullImageUrl(mainImage)}
                alt="Main"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            {product.product_name}
          </h1>
          <div className="flex items-center gap-2 text-red-500 text-sm">
            {[...Array(5)].map((_, idx) => (
              <FaStar key={idx} />
            ))}
            <span className="underline text-gray-600 cursor-pointer">
              read reviews
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <button
            className="mt-4 bg-black text-white px-5 py-2 rounded hover:opacity-90"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <div className="text-3xl font-bold text-red-600 mt-2">
            ₹{product.selling_price}
          </div>

          {/* Rent Details */}
          {rentDetails && (
            <div className="mt-4 text-sm text-gray-700">
              <p>
                <strong>Rent Per Day:</strong> ₹{rentDetails.rent_per_day}
              </p>
              <p>
                <strong>Rent Per Week:</strong> ₹{rentDetails.rent_per_week}
              </p>
              <p>
                <strong>Deposit:</strong> ₹{rentDetails.security_deposit}
              </p>
              <p>
                <strong>Rental Terms:</strong> {rentDetails.rental_terms}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="relative mt-10 px-0">
        <div className="flex items-center w-full">
          {/* Left Arrow */}
          <button
            onClick={() => {
              if (thumbIndex > 0) setThumbIndex((prev) => prev - 1);
            }}
            className="w-10 flex justify-center items-center h-24 cursor-pointer"
          >
            <LiaLongArrowAltLeftSolid className="font-bold text-red-500" />
          </button>

          {/* Thumbnails */}
          <div className="flex gap-4 flex-1 justify-evenly">
            {imageList.slice(thumbIndex, thumbIndex + 5).map((img, idx) => (
              <img
                key={idx}
                src={getFullImageUrl(img)}
                alt={`thumb-${idx}`}
                onClick={() => setMainImage(img)}
                className={`w-[20%] h-36 object-cover rounded cursor-pointer transition-transform duration-300  ${
                  mainImage === img ? "bg-gray-200" : ""
                }`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              if (thumbIndex + 5 < imageList.length)
                setThumbIndex((prev) => prev + 1);
            }}
            className="w-10 flex justify-center items-center h-24 cursor-pointer"
          >
            <LiaLongArrowAltRightSolid className="font-bold text-red-500" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 px-4">
        <div className="flex justify-around text-sm text-gray-500 border-b border-t pt-4 pb-4">
          {["Overview", "Features", "Specification"].map((label) => (
            <button
              key={label}
              className={`hover:text-red-600 ${
                activeSection === label
                  ? "text-red-600 font-semibold"
                  : "text-gray-900 font-semibold"
              }`}
              onClick={() => setActiveSection(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {activeSection === "Overview" && (
            <p>{product.overview || "No overview provided."}</p>
          )}
          {activeSection === "Features" && (
            <ul className="list-disc list-inside space-y-1">
              {(product.features || ["No features provided."]).map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          )}
          {activeSection === "Specification" && (
            <ul className="list-disc list-inside space-y-1">
              {(product.specifications || ["No specifications available."]).map(
                (s, idx) => (
                  <li key={idx}>{s}</li>
                )
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Recommended Accessories */}
      <div className="mt-10 px-4">
        <h2 className="text-lg font-bold text-red-600 mb-4">
          Recommended Accessories
        </h2>
        {recommended.length === 0 ? (
          <p className="text-gray-500 text-sm">No accessories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommended.map((item) => (
              <div
                key={item._id}
                className="text-center border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
              >
                <img
                  src={getFullImageUrl(item.product_image)}
                  alt={item.product_name}
                  className="h-28 w-full object-cover mb-2 rounded"
                />
                <h4 className="text-sm font-medium">{item.product_name}</h4>
                <div className="text-red-600 font-semibold">
                  ₹{item.selling_price}
                </div>
                <button
                  className="mt-2 bg-black text-white px-3 py-1 rounded text-sm hover:opacity-90"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
