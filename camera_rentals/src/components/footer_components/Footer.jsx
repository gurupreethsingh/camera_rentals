// import React from "react";
// import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="text-gray-900 pt-12 px-4 sm:px-8 md:px-12">
//       <div className="max-w-9xl mx-auto">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-red-700 text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="/about-us"
//                   className="text-gray-700 hover:text-gray-900 font-base text-sm"
//                 >
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/contact-us"
//                   className="text-gray-700 hover:text-gray-900 font-base text-sm"
//                 >
//                   Contact Us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/careers"
//                   className="text-gray-700 hover:text-gray-900 font-base text-sm"
//                 >
//                   Careers
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-red-700 text-sm font-bold mb-4">Support</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="/help-center"
//                   className="text-gray-700 hover:text-gray-900 font-base text-sm"
//                 >
//                   Help Center
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/privacy-policy"
//                   className="text-gray-700 hover:text-gray-900 font-base text-sm"
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/terms-of-service"
//                   className="text-gray-700 hover:text-gray-900 font-base text-sm"
//                 >
//                   Terms of Service
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Social Media */}
//           <div>
//             <h3 className="text-red-700 text-sm font-bold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a
//                 href="#"
//                 className="text-gray-500 hover:text-gray-900 font-semibold"
//               >
//                 <FaFacebookF />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-500 hover:text-gray-900 font-semibold"
//               >
//                 <FaTwitter />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-500 hover:text-gray-900 font-semibold"
//               >
//                 <FaGithub />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-500 hover:text-gray-900 font-semibold"
//               >
//                 <FaLinkedinIn />
//               </a>
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <h3 className="text-red-700 text-sm font-bold mb-4">Address</h3>
//             <p className="text-gray-700 mb-2 font-base text-sm">
//               Camera Rentals, Hesaraghatta Road, T-Dasarahalli, Bangalore
//               560073.
//             </p>
//             <p className="text-gray-700 mb-1 font-base text-sm">
//               Phone: 9538596766
//             </p>
//             <p className="text-gray-700 font-base text-sm">
//               Website: www.camerarentals.com
//             </p>
//           </div>

//           {/* Subscription Form */}
//           <div className=" rounded-xl w-full max-w-md mx-auto">
//             <h3 className="text-red-700  text-sm font-bold mb-3 flex items-center gap-2">
//               Signup For Camera Needs
//             </h3>
//             <p className="text-sm text-gray-600 mb-4">
//               Get updates on latest camera gear, rental deals & exclusive
//               discounts.
//             </p>
//             <form className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your email address"
//                 className="w-full sm:flex-1 border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
//               />
//               <input
//                 type="submit"
//                 value="Subscribe"
//                 className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer transition"
//               />
//             </form>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-gray-700 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center text-center">
//           <p className="text-sm font-bold">
//             &copy; 2025 Ecoders, Inc. All rights reserved.
//           </p>
//           <p className="text-sm mt-2 md:mt-0 font-bold">
//             Developed And Maintained By Ecoders Bengaluru
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

//

//

"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import backendGlobalRoute from "../../config/config.js";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscriptionType] = useState("weekly"); // can be changed if needed
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendGlobalRoute}/api/subscribe`, {
        email,
        subscriptionType,
      });
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response);
        setMessage(error.response.data.message);
      } else {
        console.error("Network Error:", error.message);
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <footer className="text-gray-900 pt-12 px-4 sm:px-8 md:px-12">
      <div className="max-w-9xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-red-700 text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about-us"
                  className="text-gray-700 hover:text-gray-900 font-base text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-700 hover:text-gray-900 font-base text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-700 hover:text-gray-900 font-base text-sm"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-red-700 text-sm font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/help-center"
                  className="text-gray-700 hover:text-gray-900 font-base text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-700 hover:text-gray-900 font-base text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="text-gray-700 hover:text-gray-900 font-base text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-red-700 text-sm font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 font-semibold"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 font-semibold"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 font-semibold"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 font-semibold"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-red-700 text-sm font-bold mb-4">Address</h3>
            <p className="text-gray-700 mb-2 font-base text-sm">
              Camera Rentals, Hesaraghatta Road, T-Dasarahalli, Bangalore
              560073.
            </p>
            <p className="text-gray-700 mb-1 font-base text-sm">
              Phone: 9538596766
            </p>
            <p className="text-gray-700 font-base text-sm">
              Website: www.camerarentals.com
            </p>
          </div>

          {/* Subscription Form - Replaced with actual form */}
          <div className="rounded-xl w-full max-w-md mx-auto">
            <h3 className="text-red-700 text-sm font-bold mb-3 flex items-center gap-2">
              Signup For Camera Needs
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get updates on latest camera gear, rental deals & exclusive
              discounts.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <input
                type="submit"
                value="Subscribe"
                className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer transition"
              />
            </form>
            {message && (
              <p className="text-sm mt-2 text-green-600 font-semibold">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-sm font-bold">
            &copy; 2025 Ecoders, Inc. All rights reserved.
          </p>
          <p className="text-sm mt-2 md:mt-0 font-bold">
            Developed And Maintained By Ecoders Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
