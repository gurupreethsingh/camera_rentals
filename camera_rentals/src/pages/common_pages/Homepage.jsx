// ✅ Confirmed Axios Route Summary:
// Axios Call	Route Used	Status
// /api/all-categories	Matches getAllCategories	✅ Correct
// /api/all-added-products	Matches getAllProducts	✅ Correct
// /api/get-products-by-category/:id	Matches getProductsByCategory	✅ Correct
// /api/get-all-rent-details	Matches getAllRentDetails	✅ Correct
// /api/get-single-added-product-by-id/:id

// fast code.

//

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import one from "../../assets/images_and_videos/1.jpg";
import two from "../../assets/images_and_videos/2.jpg";
import three from "../../assets/images_and_videos/3.jpg";
import four from "../../assets/images_and_videos/4.jpg";
import five from "../../assets/images_and_videos/5.jpg";
import globalBackendRoute from "../../config/Config";

const slides = [
  {
    image: one,
    heading: "Welcome to Our Camera Rental Service",
    subtext:
      "Rent the best cameras for your shoots, events, or projects — anytime, anywhere.",
  },
  {
    image: two,
    heading: "Action Ready with GoPro",
    subtext: "Capture your wildest adventures with our rugged gear.",
  },
  {
    image: three,
    heading: "Fly High with Drones",
    subtext: "Professional drone rentals for cinematic experiences.",
  },
  {
    image: four,
    heading: "Studio Equipment Available",
    subtext: "Lighting, tripods, and accessories to complete your setup.",
  },
  {
    image: five,
    heading: "Rent Premium Lenses",
    subtext: "From wide-angle to telephoto, get the perfect shot.",
  },
];

const Homepage = () => {
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { image, heading, subtext } = slides[current];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [catRes, prodRes, rentRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/all-categories`),
          axios.get(`${globalBackendRoute}/api/all-added-products`),
          axios.get(`${globalBackendRoute}/api/get-all-rent-details`),
        ]);

        setCategories(catRes.data);
        setProducts(prodRes.data);

        const rentedCounts = {};
        rentRes.data.forEach((r) => {
          rentedCounts[r.product_id] = (rentedCounts[r.product_id] || 0) + 1;
        });

        const topProductIds = Object.entries(rentedCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([productId]) => productId);

        const trendingProducts = await Promise.all(
          topProductIds.map((id) =>
            axios
              .get(
                `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
              )
              .then((res) => res.data)
          )
        );

        setTrending(trendingProducts);
      } catch (err) {
        console.error("Error loading homepage data:", err);
      }
    };

    fetchAllData();
  }, []);

  const fetchProductsByCategory = (categoryId) => {
    if (categoryId === "all") {
      axios
        .get(`${globalBackendRoute}/api/all-added-products`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Error fetching products:", err));
    } else {
      axios
        .get(`${globalBackendRoute}/api/get-products-by-category/${categoryId}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Error filtering by category:", err));
    }
  };

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] overflow-hidden pt-[72px]">
        <img
          src={image}
          alt={heading}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          key={image}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4 sm:px-8">
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-bold drop-shadow-md mb-3 leading-snug">
            {heading}
          </h1>
          <p className="text-white text-xs sm:text-base md:text-lg max-w-2xl drop-shadow-sm px-2 sm:px-0">
            {subtext}
          </p>
          <div className="mt-5 space-y-2 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition text-sm sm:text-base font-semibold">
              Explore Collections
            </button>
            <button className="border border-white text-white px-5 py-2 rounded hover:bg-white hover:text-red-600 transition text-sm sm:text-base font-semibold">
              Login / Register
            </button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category_selection py-6 px-4 sm:px-8 flex flex-wrap justify-center gap-4">
        <button
          className={`w-24 h-24 flex flex-col items-center justify-center rounded text-sm transition hover:shadow-md 
      ${
        selectedCategory === "all"
          ? "bg-gradient-to-b from-gray-200 via-white to-white text-black font-bold"
          : "bg-white text-gray-900"
      }`}
          onClick={() => {
            setSelectedCategory("all");
            fetchProductsByCategory("all");
          }}
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-1 text-xl">
            📷
          </div>
          <span className="text-center text-xs">All</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => {
              setSelectedCategory(cat._id);
              fetchProductsByCategory(cat._id);
            }}
            className={`w-24 h-24 flex flex-col items-center justify-center rounded text-sm transition hover:shadow-md 
        ${
          selectedCategory === cat._id
            ? "bg-gradient-to-b from-gray-200 via-white to-white text-gray-900 font-bold"
            : "bg-white text-gray-900"
        }`}
          >
            <img
              loading="lazy"
              src={`${globalBackendRoute}/${cat.category_image}`}
              alt={cat.category_name}
              className="w-10 h-10 rounded-full object-cover mb-1"
            />
            <span
              className={`text-center text-xs ${
                selectedCategory === cat._id ? "font-bold" : "font-normal"
              }`}
            >
              {cat.category_name}
            </span>
          </button>
        ))}
      </div>

      {/* Filtered Products */}
      <div className="px-5 py-3">
        <div className="px-5">
          <h2 className="text-xl font-bold text-red-700">All Products</h2>
        </div>
        <div className="filtered_products_category sm:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative rounded bg-white min-h-[22rem] transition duration-300 ease-in-out text-center p-3 flex flex-col justify-between 
                 hover:bg-gradient-to-b hover:from-gray-200 hover:via-white hover:to-white
                 before:absolute before:top-0 before:left-0 before:w-full before:h-2
                 hover:before:shadow-[0_-6px_10px_-4px_rgba(0,0,0,0.2)] before:rounded-t"
            >
              <img
                loading="lazy"
                src={`${globalBackendRoute}/${product.product_image}`}
                alt={product.product_name}
                className="w-full h-60 object-cover rounded mb-2"
              />
              <div>
                <h3 className="font-semibold text-sm">
                  {product.product_name}
                </h3>
                <p className="text-xs text-gray-600">{product.brand}</p>
                <p className="text-gray-900 font-bold mt-1">
                  ₹{product.selling_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      {/* <div className="trending px-4 sm:px-8 py-6 ">
        <h2 className="text-xl font-bold text-red-700">Trending Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {trending.map((product) => (
            <div
              key={product._id}
              className="rounded shadow-none hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out bg-white text-center p-3"
            >
              <img
                loading="lazy"
                src={`${globalBackendRoute}/${product.product_image}`}
                alt={product.product_name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-semibold text-sm">{product.product_name}</h3>
              <p className="text-xs text-gray-600">{product.brand}</p>
              <p className="text-red-700 font-bold mt-1">
                ₹{product.selling_price}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Homepage;
