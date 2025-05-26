import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaTags,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import globalBackendRoute from "../../../../camera_superadmin/src/config/Config";

export default function AllBlogs() {
  const getImageUrl = (imagePath) => {
    if (imagePath) {
      // Replace backslashes with forward slashes and ensure proper relative path usage
      const normalizedPath = imagePath
        .replace(/\\/g, "/")
        .split("uploads/")
        .pop();
      return `${globalBackendRoute}/uploads/${normalizedPath}`;
    }
    return "https://via.placeholder.com/150"; // Fallback if there's no image
  };

  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]); // State for all blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]); // State for filtered blogs
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch all blogs from the backend
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${globalBackendRoute}/api/all-blogs`);
        //const response = await axios.get("https://147.93.28.78:3006/api/all-blogs");
        setBlogs(response.data);
        setFilteredBlogs(response.data); // Initially, all blogs are shown
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = blogs
      .filter((blog) => {
        // Check if blog properties are defined before applying toLowerCase
        const titleMatch = blog.title?.toLowerCase().includes(value);
        const authorMatch = blog.author?.name?.toLowerCase().includes(value);
        const categoryMatch = blog.category?.toLowerCase().includes(value);
        const tagsMatch = blog.tags?.some((tag) =>
          tag.toLowerCase().includes(value)
        );

        return titleMatch || authorMatch || categoryMatch || tagsMatch;
      })
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  // Define paginatedBlogs here based on the current page and items per page
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const iconStyle = {
    list: view === "list" ? "text-blue-500" : "text-gray-500",
    grid: view === "grid" ? "text-green-500" : "text-gray-500",
    card: view === "card" ? "text-purple-500" : "text-gray-500",
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blogs</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64 rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <FaThList
            className={`cursor-pointer ${iconStyle.list}`}
            onClick={() => setView("list")}
          />
          <FaTh
            className={`cursor-pointer ${iconStyle.card}`}
            onClick={() => setView("card")}
          />
          <FaThLarge
            className={`cursor-pointer ${iconStyle.grid}`}
            onClick={() => setView("grid")}
          />
        </div>
      </div>

      <motion.div
        className={`grid gap-6 ${
          view === "list"
            ? "grid-cols-1"
            : view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {paginatedBlogs.map((blog) => (
          <Link key={blog._id} to={`/single-blog/${blog._id}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden ${
                view === "list" ? "flex items-center p-4" : ""
              }`}
            >
              <img
                src={getImageUrl(blog.featuredImage)}
                alt={blog.title}
                className={`${
                  view === "list"
                    ? "w-24 h-24 object-cover mr-4"
                    : "w-full h-48 object-cover mb-4"
                }`}
              />
              <div className={`${view === "list" ? "flex-1" : "p-4"}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-left">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaCalendar className="mr-1 text-yellow-500" />
                  {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaUser className="mr-1 text-red-500" />
                  {blog.author.name}
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaTags className="mr-1 text-green-500" />
                  {blog.tags.join(", ")}
                </p>
                {view !== "list" && (
                  <p className="text-gray-700">{blog.summary}</p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No blogs found.</p>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          <FaArrowLeft />
          <span>Previous</span>
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          <span>Next</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
