// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   FaTh,
//   FaAlignLeft,
//   FaAlignRight,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import axios from "axios";
// import globalBackendRoute from "../../../../camera_superadmin/src/config/Config";
// import one from "../../assets/images_and_videos/5.jpg";

// const SingleBlog = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [relatedBlogs, setRelatedBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [view, setView] = useState("right-sidebar");
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(
//           `${globalBackendRoute}/api/single-blogs/${id}`
//         );
//         setBlog(preprocessBlogDescription(response.data));
//       } catch (error) {
//         console.error(
//           "Error fetching the blog:",
//           error.response || error.message
//         );
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   useEffect(() => {
//     const fetchRelatedBlogs = async () => {
//       try {
//         const response = await axios.get(`${globalBackendRoute}/api/all-blogs`);
//         setRelatedBlogs(response.data);
//         setFilteredBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching related blogs:", error);
//       }
//     };

//     fetchRelatedBlogs();
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = relatedBlogs.filter((b) =>
//         b.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBlogs(filtered);
//     } else {
//       setFilteredBlogs(relatedBlogs);
//     }
//   }, [searchTerm, relatedBlogs]);

//   const preprocessBlogDescription = (blog) => {
//     if (!blog || !blog.body) return blog;

//     const paragraphs = blog.body.split("\n");
//     const sections = [];
//     let currentSection = [];

//     paragraphs.forEach((paragraph) => {
//       const trimmed = paragraph.trim();

//       if (trimmed.endsWith("?")) {
//         if (currentSection.length > 0) {
//           sections.push(currentSection);
//           currentSection = [];
//         }
//         sections.push([{ type: "question", text: trimmed }]);
//       } else if (
//         currentSection.length > 0 &&
//         currentSection[0].type === "question"
//       ) {
//         sections.push([{ type: "answer", text: trimmed }]);
//       } else {
//         currentSection.push({ type: "text", text: trimmed });
//       }
//     });

//     if (currentSection.length > 0) {
//       sections.push(currentSection);
//     }

//     return { ...blog, processedBody: sections };
//   };

//   const renderDescription = () => {
//     if (!blog || !blog.processedBody) return null;

//     return blog.processedBody.map((section, index) => (
//       <div key={index} className="mb-8">
//         {section.map((content, idx) => {
//           if (content.type === "question") {
//             return (
//               <p key={idx} className="font-bold text-lg mb-4 mt-6">
//                 {content.text}
//               </p>
//             );
//           } else if (content.type === "answer") {
//             return (
//               <blockquote
//                 key={idx}
//                 className="border-l-4 border-blue-500 pl-4 text-gray-700 italic mb-6"
//               >
//                 {content.text}
//               </blockquote>
//             );
//           } else {
//             return (
//               <p key={idx} className="text-gray-800 text-lg mb-4">
//                 {content.text}
//               </p>
//             );
//           }
//         })}
//       </div>
//     ));
//   };

//   const renderSidebar = () => (
//     <div className="p-4 mt-4 lg:w-80 border border-gray-200 rounded-md">
//       {/* Search Field */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search blogs..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//       </div>

//       {/* Related Blogs */}
//       <h3 className="text-lg font-bold mb-4 text-left border-b">
//         Latest Blogs
//       </h3>
//       <ul className="mb-4">
//         {filteredBlogs
//           .filter((relatedBlog) => relatedBlog._id !== blog?._id)
//           .map((relatedBlog) => (
//             <li
//               key={relatedBlog._id}
//               className="flex items-center mb-4 cursor-pointer border-b"
//               onClick={() => navigate(`/single-blog/${relatedBlog._id}`)}
//             >
//               <img
//                 src={
//                   relatedBlog.featuredImage || "https://via.placeholder.com/100"
//                 }
//                 alt={relatedBlog.title}
//                 className="w-12 h-12 mr-2 rounded-md"
//               />
//               <div className="text-sm">
//                 <Link to={`/single-blog/${relatedBlog._id}`}>
//                   {relatedBlog.title}
//                 </Link>
//               </div>
//             </li>
//           ))}
//       </ul>

//       {/* Categories */}
//       <h3 className="text-lg font-bold mb-2 text-left border-b">Categories</h3>
//       <ul className="mb-4">
//         {blog && blog.category && (
//           <li key={blog.category} className="mb-2 text-left">
//             {blog.category}
//           </li>
//         )}
//       </ul>

//       {/* Tags */}
//       <h3 className="text-lg font-bold mb-2 text-left border-b">Tags</h3>
//       <div className="flex flex-wrap">
//         {blog &&
//           blog.tags &&
//           blog.tags.map((tag, index) => (
//             <button
//               key={index}
//               className="text-xs bg-gray-200 text-gray-700 p-2 mr-2 mb-2 rounded"
//             >
//               {tag}
//             </button>
//           ))}
//       </div>
//     </div>
//   );

//   const handlePreviousNextNavigation = (direction) => {
//     const currentIndex = relatedBlogs.findIndex((b) => b._id === blog?._id);

//     if (direction === "previous") {
//       const previousIndex =
//         currentIndex === 0 ? relatedBlogs.length - 1 : currentIndex - 1;
//       navigate(`/single-blog/${relatedBlogs[previousIndex]._id}`);
//     } else if (direction === "next") {
//       const nextIndex =
//         currentIndex === relatedBlogs.length - 1 ? 0 : currentIndex + 1;
//       navigate(`/single-blog/${relatedBlogs[nextIndex]._id}`);
//     }
//   };

//   if (!blog) return <div>Loading...</div>;

//   return (
//     <div>
//       {/* Top Banner */}
//       {/* ✅ Updated Top Banner - Adjusted for responsiveness */}
//       <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] xl:h-[280px] overflow-hidden shadow-sm pt-16 sm:pt-20 md:pt-24">
//         <img
//           src={one}
//           alt="Camera Blog Banner"
//           className="absolute inset-0 w-full h-full object-cover object-center"
//           loading="eager"
//           decoding="async"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
//           <h1 className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-center leading-snug tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
//             Explore camera tips, gear reviews,
//             <br className="sm:hidden" /> and photography hacks from our pros.
//           </h1>
//         </div>
//       </div>
//       <motion.div
//         className="max-w-7xl mx-auto p-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 gap-3">
//           <h1 className="text-2xl sm:text-3xl font-bold text-left w-full lg:w-auto">
//             {blog.title}
//           </h1>
//           <div className="flex space-x-2 text-xl">
//             <FaTh
//               className={`cursor-pointer ${
//                 view === "wide" ? "text-red-500" : "text-gray-500"
//               }`}
//               onClick={() => setView("wide")}
//             />
//             <FaAlignLeft
//               className={`cursor-pointer ${
//                 view === "left-sidebar" ? "text-red-500" : "text-gray-500"
//               }`}
//               onClick={() => setView("left-sidebar")}
//             />
//             <FaAlignRight
//               className={`cursor-pointer ${
//                 view === "right-sidebar" ? "text-red-500" : "text-gray-500"
//               }`}
//               onClick={() => setView("right-sidebar")}
//             />
//           </div>
//         </div>
//         <p className="text-gray-600 mb-4 text-left text-sm sm:text-base">
//           Published on {new Date(blog.publishedDate).toLocaleDateString()}
//         </p>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {view === "left-sidebar" && (
//             <div className="lg:w-1/4 w-full order-1 lg:order-none">
//               {renderSidebar()}
//             </div>
//           )}

//           <div className="flex-1 order-2">
//             <motion.img
//               src={
//                 blog.featuredImage
//                   ? `${globalBackendRoute}/${blog.featuredImage.replace(
//                       /\\/g,
//                       "/"
//                     )}`
//                   : "https://via.placeholder.com/800x400"
//               }
//               alt={blog.title}
//               className="w-full h-[200px] sm:h-[240px] md:h-[480px] lg:h-[420px] xl:h-[460px] object-cover object-center rounded-lg mb-4"
//               loading="lazy"
//               decoding="async"
//             />
//             {renderDescription()}
//           </div>

//           {view === "right-sidebar" && (
//             <div className="lg:w-1/4 w-full order-3">{renderSidebar()}</div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SingleBlog;

//

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   FaTh,
//   FaAlignLeft,
//   FaAlignRight,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import axios from "axios";
// import globalBackendRoute from "../../../../camera_superadmin/src/config/Config";
// import one from "../../assets/images_and_videos/5.jpg";

// const SingleBlog = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [relatedBlogs, setRelatedBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [view, setView] = useState("right-sidebar");
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(
//           `${globalBackendRoute}/api/single-blogs/${id}`
//         );
//         setBlog(preprocessBlogDescription(response.data));
//       } catch (error) {
//         console.error(
//           "Error fetching the blog:",
//           error.response || error.message
//         );
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   useEffect(() => {
//     const fetchRelatedBlogs = async () => {
//       try {
//         const response = await axios.get(`${globalBackendRoute}/api/all-blogs`);
//         setRelatedBlogs(response.data);
//         setFilteredBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching related blogs:", error);
//       }
//     };

//     fetchRelatedBlogs();
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = relatedBlogs.filter((b) =>
//         b.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBlogs(filtered);
//     } else {
//       setFilteredBlogs(relatedBlogs);
//     }
//   }, [searchTerm, relatedBlogs]);

//   const preprocessBlogDescription = (blog) => {
//     if (!blog || !blog.body) return blog;
//     const paragraphs = blog.body.split("\n");
//     const sections = [];
//     let currentSection = [];

//     paragraphs.forEach((paragraph) => {
//       const trimmed = paragraph.trim();
//       if (trimmed.endsWith("?")) {
//         if (currentSection.length > 0) {
//           sections.push(currentSection);
//           currentSection = [];
//         }
//         sections.push([{ type: "question", text: trimmed }]);
//       } else if (
//         currentSection.length > 0 &&
//         currentSection[0].type === "question"
//       ) {
//         sections.push([{ type: "answer", text: trimmed }]);
//       } else {
//         currentSection.push({ type: "text", text: trimmed });
//       }
//     });

//     if (currentSection.length > 0) sections.push(currentSection);
//     return { ...blog, processedBody: sections };
//   };

//   const renderDescription = () => {
//     if (!blog || !blog.processedBody) return null;
//     return blog.processedBody.map((section, index) => (
//       <div key={index} className="mb-8">
//         {section.map((content, idx) => {
//           if (content.type === "question") {
//             return (
//               <p key={idx} className="font-bold text-lg mb-4 mt-6">
//                 {content.text}
//               </p>
//             );
//           } else if (content.type === "answer") {
//             return (
//               <blockquote
//                 key={idx}
//                 className="border-l-4 border-blue-500 pl-4 text-gray-700 italic mb-6"
//               >
//                 {content.text}
//               </blockquote>
//             );
//           } else {
//             return (
//               <p key={idx} className="text-gray-800 text-lg mb-4">
//                 {content.text}
//               </p>
//             );
//           }
//         })}
//       </div>
//     ));
//   };

//   const renderSidebar = () => (
//     <div className="p-4 mt-4 lg:w-80 border border-gray-200 rounded-md sticky top-20">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search blogs..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//       </div>
//       <h3 className="text-lg font-bold mb-4 text-left border-b">
//         Latest Blogs
//       </h3>
//       <ul className="mb-4">
//         {filteredBlogs
//           .filter((b) => b._id !== blog?._id)
//           .map((b) => (
//             <li
//               key={b._id}
//               className="flex items-center mb-4 cursor-pointer border-b"
//               onClick={() => navigate(`/single-blog/${b._id}`)}
//             >
//               <img
//                 src={b.featuredImage || "https://via.placeholder.com/100"}
//                 alt={b.title}
//                 className="w-12 h-12 mr-2 rounded-md"
//               />
//               <div className="text-sm">
//                 <Link to={`/single-blog/${b._id}`}>{b.title}</Link>
//               </div>
//             </li>
//           ))}
//       </ul>
//       <h3 className="text-lg font-bold mb-2 text-left border-b">Categories</h3>
//       <ul className="mb-4">
//         {blog?.category && (
//           <li key={blog.category} className="mb-2 text-left">
//             {blog.category}
//           </li>
//         )}
//       </ul>
//       <h3 className="text-lg font-bold mb-2 text-left border-b">Tags</h3>
//       <div className="flex flex-wrap">
//         {blog?.tags?.map((tag, index) => (
//           <button
//             key={index}
//             className="text-xs bg-gray-200 text-gray-700 p-2 mr-2 mb-2 rounded"
//           >
//             {tag}
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   const handlePreviousNextNavigation = (direction) => {
//     const currentIndex = relatedBlogs.findIndex((b) => b._id === blog?._id);
//     if (direction === "previous") {
//       const prevIndex =
//         currentIndex === 0 ? relatedBlogs.length - 1 : currentIndex - 1;
//       navigate(`/single-blog/${relatedBlogs[prevIndex]._id}`);
//     } else {
//       const nextIndex =
//         currentIndex === relatedBlogs.length - 1 ? 0 : currentIndex + 1;
//       navigate(`/single-blog/${relatedBlogs[nextIndex]._id}`);
//     }
//   };

//   if (!blog) return <div>Loading...</div>;

//   const currentIndex = relatedBlogs.findIndex((b) => b._id === blog?._id);
//   const previousBlog =
//     relatedBlogs[
//       (currentIndex - 1 + relatedBlogs.length) % relatedBlogs.length
//     ];
//   const nextBlog = relatedBlogs[(currentIndex + 1) % relatedBlogs.length];

//   return (
//     <div>
//       {/* Top Banner */}
//       <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] xl:h-[280px] overflow-hidden shadow-sm pt-16 sm:pt-20 md:pt-24">
//         <img
//           src={one}
//           alt="Camera Blog Banner"
//           className="absolute inset-0 w-full h-full object-cover object-center"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
//           <h1 className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-center leading-snug tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
//             Explore camera tips, gear reviews,
//             <br className="sm:hidden" />
//             and photography hacks from our pros.
//           </h1>
//         </div>
//       </div>

//       <motion.div
//         className="max-w-7xl mx-auto p-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 gap-3">
//           <h1 className="text-2xl sm:text-3xl font-bold text-left w-full lg:w-auto">
//             {blog.title}
//           </h1>
//           <div className="flex space-x-2 text-xl">
//             <FaTh
//               className={`cursor-pointer ${
//                 view === "wide" ? "text-red-500" : "text-gray-500"
//               }`}
//               onClick={() => setView("wide")}
//             />
//             <FaAlignLeft
//               className={`cursor-pointer ${
//                 view === "left-sidebar" ? "text-red-500" : "text-gray-500"
//               }`}
//               onClick={() => setView("left-sidebar")}
//             />
//             <FaAlignRight
//               className={`cursor-pointer ${
//                 view === "right-sidebar" ? "text-red-500" : "text-gray-500"
//               }`}
//               onClick={() => setView("right-sidebar")}
//             />
//           </div>
//         </div>

//         <p className="text-gray-600 mb-4 text-left text-sm sm:text-base">
//           Published on {new Date(blog.publishedDate).toLocaleDateString()}
//         </p>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {view === "left-sidebar" && (
//             <div className="lg:w-1/4 w-full order-1 lg:order-none">
//               {renderSidebar()}
//             </div>
//           )}
//           <div className="flex-1 order-2">
//             <motion.img
//               src={
//                 blog.featuredImage
//                   ? `${globalBackendRoute}/${blog.featuredImage.replace(
//                       /\\/g,
//                       "/"
//                     )}`
//                   : "https://via.placeholder.com/800x400"
//               }
//               alt={blog.title}
//               className="w-full h-[200px] sm:h-[240px] md:h-[480px] lg:h-[420px] xl:h-[460px] object-contain object-center rounded-lg mb-4"
//               loading="lazy"
//               decoding="async"
//             />
//             {renderDescription()}

//             {/* Previous / Next Navigation Section */}
//             <div className="mt-10 border-t pt-6">
//               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//                 <div
//                   onClick={() => handlePreviousNextNavigation("previous")}
//                   className="cursor-pointer flex items-center border p-2 rounded hover:bg-gray-100 w-full sm:w-1/2"
//                 >
//                   <FaArrowLeft className="mr-2 text-xl" />
//                   <img
//                     src={
//                       previousBlog?.featuredImage ||
//                       "https://via.placeholder.com/100"
//                     }
//                     alt="Previous"
//                     className="w-14 h-14 object-cover rounded mr-3"
//                   />
//                   <span className="font-medium">{previousBlog?.title}</span>
//                 </div>
//                 <div
//                   onClick={() => handlePreviousNextNavigation("next")}
//                   className="cursor-pointer flex items-center border p-2 rounded hover:bg-gray-100 w-full sm:w-1/2"
//                 >
//                   <span className="font-medium">{nextBlog?.title}</span>
//                   <img
//                     src={
//                       nextBlog?.featuredImage ||
//                       "https://via.placeholder.com/100"
//                     }
//                     alt="Next"
//                     className="w-14 h-14 object-cover rounded ml-3"
//                   />
//                   <FaArrowRight className="ml-2 text-xl" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           {view === "right-sidebar" && (
//             <div className="lg:w-1/4 w-full order-3">{renderSidebar()}</div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SingleBlog;

//

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaTh,
  FaAlignLeft,
  FaAlignRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import globalBackendRoute from "../../../../camera_superadmin/src/config/Config";
import one from "../../assets/images_and_videos/5.jpg";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [view, setView] = useState("right-sidebar");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/single-blogs/${id}`
        );
        setBlog(preprocessBlogDescription(response.data));
      } catch (error) {
        console.error(
          "Error fetching the blog:",
          error.response || error.message
        );
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const response = await axios.get(`${globalBackendRoute}/api/all-blogs`);
        setRelatedBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      }
    };

    fetchRelatedBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = relatedBlogs.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(relatedBlogs);
    }
  }, [searchTerm, relatedBlogs]);

  const preprocessBlogDescription = (blog) => {
    if (!blog || !blog.body) return blog;
    const paragraphs = blog.body.split("\n");
    const sections = [];
    let currentSection = [];

    paragraphs.forEach((paragraph) => {
      const trimmed = paragraph.trim();
      if (trimmed.endsWith("?")) {
        if (currentSection.length > 0) {
          sections.push(currentSection);
          currentSection = [];
        }
        sections.push([{ type: "question", text: trimmed }]);
      } else if (
        currentSection.length > 0 &&
        currentSection[0].type === "question"
      ) {
        sections.push([{ type: "answer", text: trimmed }]);
      } else {
        currentSection.push({ type: "text", text: trimmed });
      }
    });

    if (currentSection.length > 0) sections.push(currentSection);
    return { ...blog, processedBody: sections };
  };

  const renderDescription = () => {
    if (!blog || !blog.processedBody) return null;
    return blog.processedBody.map((section, index) => (
      <div key={index} className="mb-8">
        {section.map((content, idx) => {
          if (content.type === "question") {
            return (
              <p key={idx} className="font-bold text-lg mb-4 mt-6">
                {content.text}
              </p>
            );
          } else if (content.type === "answer") {
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-blue-500 pl-4 text-gray-700 italic mb-6"
              >
                {content.text}
              </blockquote>
            );
          } else {
            return (
              <p key={idx} className="text-gray-800 text-lg mb-4">
                {content.text}
              </p>
            );
          }
        })}
      </div>
    ));
  };

  const renderSidebar = () => (
    <div className="p-4 mt-4 lg:w-80 border border-gray-200 rounded-md sticky top-20">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <h3 className="text-lg font-bold mb-4 text-left border-b">
        Latest Blogs
      </h3>
      <ul className="mb-4">
        {filteredBlogs
          .filter((b) => b._id !== blog?._id)
          .map((b) => (
            <li
              key={b._id}
              className="flex items-center mb-4 cursor-pointer border-b"
              onClick={() => navigate(`/single-blog/${b._id}`)}
            >
              <img
                src={b.featuredImage || "https://via.placeholder.com/100"}
                alt={b.title}
                className="w-12 h-12 mr-2 rounded-md"
              />
              <div className="text-sm">
                <Link to={`/single-blog/${b._id}`}>{b.title}</Link>
              </div>
            </li>
          ))}
      </ul>
      <h3 className="text-lg font-bold mb-2 text-left border-b">Categories</h3>
      <ul className="mb-4">
        {blog?.category && (
          <li key={blog.category} className="mb-2 text-left">
            {blog.category}
          </li>
        )}
      </ul>
      <h3 className="text-lg font-bold mb-2 text-left border-b">Tags</h3>
      <div className="flex flex-wrap">
        {blog?.tags?.map((tag, index) => (
          <button
            key={index}
            className="text-xs bg-gray-200 text-gray-700 p-2 mr-2 mb-2 rounded"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );

  const handlePreviousNextNavigation = (direction) => {
    const currentIndex = relatedBlogs.findIndex((b) => b._id === blog?._id);
    if (direction === "previous") {
      const prevIndex =
        currentIndex === 0 ? relatedBlogs.length - 1 : currentIndex - 1;
      navigate(`/single-blog/${relatedBlogs[prevIndex]._id}`);
    } else {
      const nextIndex =
        currentIndex === relatedBlogs.length - 1 ? 0 : currentIndex + 1;
      navigate(`/single-blog/${relatedBlogs[nextIndex]._id}`);
    }
  };

  if (!blog) return <div>Loading...</div>;

  const currentIndex = relatedBlogs.findIndex((b) => b._id === blog?._id);
  const previousBlog =
    relatedBlogs[
      (currentIndex - 1 + relatedBlogs.length) % relatedBlogs.length
    ];
  const nextBlog = relatedBlogs[(currentIndex + 1) % relatedBlogs.length];

  return (
    <div>
      {/* Top Banner */}
      <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] xl:h-[280px] overflow-hidden shadow-sm pt-16 sm:pt-20 md:pt-24">
        <img
          src={one}
          alt="Camera Blog Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
          <h1 className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-center leading-snug tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Explore camera tips, gear reviews,
            <br className="sm:hidden" />
            and photography hacks from our pros.
          </h1>
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-left w-full lg:w-auto">
            {blog.title}
          </h1>
          <div className="flex space-x-2 text-xl">
            <FaTh
              className={`cursor-pointer ${
                view === "wide" ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => setView("wide")}
            />
            <FaAlignLeft
              className={`cursor-pointer ${
                view === "left-sidebar" ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => setView("left-sidebar")}
            />
            <FaAlignRight
              className={`cursor-pointer ${
                view === "right-sidebar" ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => setView("right-sidebar")}
            />
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-left text-sm sm:text-base">
          Published on {new Date(blog.publishedDate).toLocaleDateString()}
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {view === "left-sidebar" && (
            <div className="lg:w-1/4 w-full order-1 lg:order-none">
              {renderSidebar()}
            </div>
          )}
          <div className="flex-1 order-2">
            <motion.img
              src={
                blog.featuredImage
                  ? `${globalBackendRoute}/${blog.featuredImage.replace(
                      /\\/g,
                      "/"
                    )}`
                  : "https://via.placeholder.com/800x400"
              }
              alt={blog.title}
              className="w-full  max-h-[50vh] sm:max-h-[30vh] md:max-h-[50vh] lg:max-h-[50vh] object-contain rounded mb-4"
              loading="lazy"
              decoding="async"
            />
            {renderDescription()}

            {/* Previous / Next Navigation Section */}
            <div className="mt-10 border-t pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div
                  onClick={() => handlePreviousNextNavigation("previous")}
                  className="cursor-pointer flex items-center  p-2 rounded hover:bg-gray-100 w-full sm:w-1/2"
                >
                  <FaArrowLeft className="mr-2 text-xl text-red-500" />
                  <img
                    src={
                      previousBlog?.featuredImage ||
                      "https://via.placeholder.com/100"
                    }
                    alt="Previous"
                    className="w-14 h-14 object-cover rounded mr-3"
                  />
                  <span className="font-medium">{previousBlog?.title}</span>
                </div>
                <div
                  onClick={() => handlePreviousNextNavigation("next")}
                  className="cursor-pointer flex items-center  p-2 rounded hover:bg-gray-100 w-full sm:w-1/2"
                >
                  <span className="font-medium">{nextBlog?.title}</span>
                  <img
                    src={
                      nextBlog?.featuredImage ||
                      "https://via.placeholder.com/100"
                    }
                    alt="Next"
                    className="w-14 h-14 object-cover rounded ml-3"
                  />
                  <FaArrowRight className="ml-2 text-xl text-red-500" />
                </div>
              </div>
            </div>
          </div>
          {view === "right-sidebar" && (
            <div className="lg:w-1/4 w-full order-3">{renderSidebar()}</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SingleBlog;
