import React, { useEffect, useState } from 'react';
import axios from 'axios';
import one from '../../assets/images_and_videos/1.jpg';
import two from '../../assets/images_and_videos/2.jpg';
import three from '../../assets/images_and_videos/3.jpg';
import four from '../../assets/images_and_videos/4.jpg';
import five from '../../assets/images_and_videos/5.jpg';
import globalBackendRoute from '../../config/Config';

const slides = [
  { image: one, heading: 'Welcome to Our Camera Rental Service', subtext: 'Rent the best cameras for your shoots, events, or projects — anytime, anywhere.' },
  { image: two, heading: 'Action Ready with GoPro', subtext: 'Capture your wildest adventures with our rugged gear.' },
  { image: three, heading: 'Fly High with Drones', subtext: 'Professional drone rentals for cinematic experiences.' },
  { image: four, heading: 'Studio Equipment Available', subtext: 'Lighting, tripods, and accessories to complete your setup.' },
  { image: five, heading: 'Rent Premium Lenses', subtext: 'From wide-angle to telephoto, get the perfect shot.' },
];

const Homepage = () => {
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { image, heading, subtext } = slides[current];

  useEffect(() => {
    axios.get(`${globalBackendRoute}/api/all-categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    fetchAllProducts();
    fetchTrendingProducts();
  }, []);

  const fetchAllProducts = () => {
    axios.get(`${globalBackendRoute}/api/all-added-products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const fetchProductsByCategory = (categoryId) => {
    if (categoryId === 'all') return fetchAllProducts();
    axios.get(`${globalBackendRoute}/api/get-products-by-category/${categoryId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error filtering by category:', err));
  };

  const fetchTrendingProducts = () => {
    axios.get(`${globalBackendRoute}/api/get-all-rent-details`)
      .then((res) => {
        const rentedCounts = {};
        res.data.forEach(r => {
          rentedCounts[r.product_id] = (rentedCounts[r.product_id] || 0) + 1;
        });

        const topProducts = Object.entries(rentedCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([productId]) => productId);

        Promise.all(topProducts.map(id =>
          axios.get(`${globalBackendRoute}/api/get-single-added-product-by-id/${id}`)
            .then(res => res.data)
        ))
        .then(setTrending)
        .catch(err => console.error('Error fetching trending products:', err));
      });
  };

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] overflow-hidden pt-[72px]">
        <img
          src={image}
          alt={heading}
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
            <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base">
              Explore Collections
            </button>
            <button className="border border-white text-white px-5 py-2 rounded hover:bg-white hover:text-blue-600 transition text-sm sm:text-base">
              Login / Register
            </button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category_selection py-6 px-4 sm:px-8 flex flex-wrap justify-center gap-4">
        <button
          className={`border px-4 py-2 rounded text-sm ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          onClick={() => {
            setSelectedCategory('all');
            fetchProductsByCategory('all');
          }}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => {
              setSelectedCategory(cat._id);
              fetchProductsByCategory(cat._id);
            }}
            className={`rounded border px-4 py-2 text-sm transition hover:shadow-md ${selectedCategory === cat._id ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          >
            <img src={`${globalBackendRoute}/${cat.category_image}`} alt={cat.category_name} className="w-10 h-10 rounded-full mx-auto mb-1 object-cover" />
            {cat.category_name}
          </button>
        ))}
      </div>

      {/* Filtered Products */}
      <div className="border filtered_products_category sm:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {products.map(product => (
          <div key={product._id} className="rounded-5 shadow-md hover:shadow-lg transition  text-center">
            <img
              src={`${globalBackendRoute}/${product.product_image}`}
              alt={product.product_name}
              className="w-full h-40 object-cover rounded rounded"
            />
            <h3 className="font-semibold text-sm">{product.product_name}</h3>
            <p className="text-xs text-gray-600">{product.brand}</p>
            <p className="text-blue-600 font-bold mt-1">₹{product.selling_price}</p>
          </div>
        ))}
      </div>

      {/* Trending Section */}
      <div className="trending px-4 sm:px-8 py-6 bg-white shadow-lg">
        <h2 className="text-xl font-bold mb-4">Trending Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {trending.map(product => (
            <div key={product._id} className="bg-white rounded shadow p-3 text-center">
              <img
                src={`${globalBackendRoute}/${product.product_image}`}
                alt={product.product_name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-semibold text-sm">{product.product_name}</h3>
              <p className="text-xs text-gray-600">{product.brand}</p>
              <p className="text-blue-600 font-bold mt-1">₹{product.selling_price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;




// ✅ Confirmed Axios Route Summary:
// Axios Call	Route Used	Status
// /api/all-categories	Matches getAllCategories	✅ Correct
// /api/all-added-products	Matches getAllProducts	✅ Correct
// /api/get-products-by-category/:id	Matches getProductsByCategory	✅ Correct
// /api/get-all-rent-details	Matches getAllRentDetails	✅ Correct
// /api/get-single-added-product-by-id/:id
