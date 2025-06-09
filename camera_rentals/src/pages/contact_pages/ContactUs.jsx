// // "use client";

// // import React, { useState } from "react";
// // import { Switch } from "@headlessui/react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { FaUser, FaEnvelope, FaPhone, FaComment } from "react-icons/fa";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // import email from "../../assets/contactpage_images/email.svg";
// // import phone from "../../assets/contactpage_images/phone.svg";
// // import address from "../../assets/contactpage_images/address.svg";
// // import globalBackendRoute from "../../config/Config";

// // const ContactUs = () => {
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     message_text: "",
// //     agreeToLicense: false,
// //   });

// //   const navigate = useNavigate();
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === "checkbox" ? checked : value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post(
// //         `${globalBackendRoute}/add-contact-message`,
// //         formData
// //       );
// //       if (response.status === 201) {
// //         setSubmitted(true);
// //         toast.success(
// //           "Message successfully sent! You will be notified within 24 hours.",
// //           {
// //             position: "top-right",
// //           }
// //         );
// //         setFormData({
// //           firstName: "",
// //           lastName: "",
// //           email: "",
// //           phone: "",
// //           message_text: "",
// //           agreeToLicense: false,
// //         });
// //         navigate("/contact-us");
// //       }
// //     } catch (error) {
// //       console.error("Error submitting contact message:", error);
// //       toast.error(
// //         "There was an issue submitting your message. Please try again.",
// //         {
// //           position: "top-right",
// //         }
// //       );
// //     }
// //   };

// //   return (
// //     <div>
// //       <ToastContainer />
// //       <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-5/6 mx-auto pt-5 pb-5 gap-10">
// //         {/* Contact Form Section */}
// //         <div className="w-full md:w-1/2 p-5  rounded-lg">
// //           <h2 className="text-xl font-bold text-red-500 mb-3">Contact Us</h2>
// //           <p className="text-4xl text-gray-900 mb-4 font-bold ">Get In Touch</p>
// //           <p className="text-lg text-gray-800 mb-6">
// //             When, while lovely valley teems with vapour around me and meridian
// //             the upper impenetrable.
// //           </p>

// //           <form onSubmit={handleSubmit}>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label
// //                   htmlFor="first_name"
// //                   className="block text-gray-700 font-medium mb-1"
// //                 >
// //                   First Name
// //                 </label>
// //                 <input
// //                   id="firstName"
// //                   name="firstName"
// //                   type="text"
// //                   value={formData.firstName}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   placeholder="First name"
// //                 />
// //               </div>
// //               <div>
// //                 <label
// //                   htmlFor="lastName"
// //                   className="block text-gray-700 font-medium mb-1"
// //                 >
// //                   Last Name
// //                 </label>
// //                 <input
// //                   id="lastName"
// //                   name="lastName"
// //                   type="text"
// //                   value={formData.lastName}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   placeholder="Last name"
// //                 />
// //               </div>
// //             </div>

// //             <div className="mb-4">
// //               <label
// //                 htmlFor="email"
// //                 className="block text-gray-700 font-medium mb-1"
// //               >
// //                 Email
// //               </label>
// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Your email"
// //                 required
// //               />
// //             </div>

// //             <div className="mb-4">
// //               <label
// //                 htmlFor="phone"
// //                 className="block text-gray-700 font-medium mb-1"
// //               >
// //                 Phone
// //               </label>
// //               <input
// //                 id="phone"
// //                 name="phone"
// //                 type="tel"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Your phone"
// //                 required
// //               />
// //             </div>

// //             <div className="mb-4">
// //               <label
// //                 htmlFor="message"
// //                 className="block text-gray-700 font-medium mb-1"
// //               >
// //                 Your Message
// //               </label>
// //               <textarea
// //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Your Message"
// //                 id="message_text"
// //                 name="message_text"
// //                 rows={4}
// //                 value={formData.message_text}
// //                 onChange={handleChange}
// //                 required
// //               ></textarea>
// //             </div>

// //             <button
// //               type="submit"
// //               className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded shadow-lg transition-all duration-200"
// //             >
// //               Submit Form
// //             </button>
// //           </form>
// //         </div>

// //         {/* Google Maps and Register Section */}
// //         <div className="w-full md:w-1/2 flex flex-col gap-6">
// //           <p className="text-4xl font-bold text-gray-800">Visit Our Store</p>
// //           {/* Google Maps Section */}
// //           <div className="h-96 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
// //             <iframe
// //               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.599258635925!2d77.57704956430813!3d12.99238005173825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c7b245a9%3A0x41bcb92d6e83e60!2sBangalore%20Palace!5e0!3m2!1sen!2sin!4v1698522816618!5m2!1sen!2sin"
// //               width="100%"
// //               height="100%"
// //               style={{ border: 0 }}
// //               allowFullScreen=""
// //               loading="lazy"
// //               title="Google Maps"
// //             ></iframe>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="shipping_section p-4">
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
// //           {/* Card 1 */}
// //           <div className="flex justify-center items-center p-4 ">
// //             <img src={email} className="w-16 h-16 mr-4 text-red-500" />
// //             <div className="flex items-center">
// //               <h5 className="text-lg font-bold">Email</h5>
// //               <p className="text-md text-gray-600 ms-2">info@bonmillette.com</p>
// //             </div>
// //           </div>

// //           {/* Card 2 */}
// //           <div className="flex justify-center items-center p-4 ">
// //             <img src={phone} alt="Easy Returns" className="w-16 h-16 mr-4" />
// //             <div className="flex items-center">
// //               <h5 className="text-lg font-bold">Phone</h5>
// //               <p className="text-md text-gray-600 ms-2">+91 9035098282</p>
// //             </div>
// //           </div>

// //           {/* Card 3 */}
// //           <div className="flex justify-center items-center p-4 ">
// //             <img src={address} alt="24/7 Support" className="w-16 h-16 mr-4" />
// //             <div className="flex items-center">
// //               <h5 className="text-lg font-bold"> </h5>
// //               <p className="text-md text-gray-600 ms-2">
// //                 <span className="font-bold text-dark">Address :</span>Shed No
// //                 45, Katha No 125, Hanumantha Nagar, Srigandadha Kavalu
// //                 Sunkadakatte, Bengaluru - 560091
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContactUs;

// //

// // "use client";

// // import React, { useState, useCallback } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // import email from "../../assets/contactpage_images/email.svg";
// // import phone from "../../assets/contactpage_images/phone.svg";
// // import address from "../../assets/contactpage_images/address.svg";
// // import globalBackendRoute from "../../config/Config";
// // import one from "../../assets/images_and_videos/4.jpg";

// // const ContactUs = () => {
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     message_text: "",
// //     agreeToLicense: false,
// //   });

// //   const navigate = useNavigate();

// //   const handleChange = useCallback((e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   }, []);

// //   const handleSubmit = useCallback(
// //     async (e) => {
// //       e.preventDefault();
// //       try {
// //         const { status } = await axios.post(
// //           `${globalBackendRoute}/add-contact-message`,
// //           formData,
// //           { timeout: 5000 }
// //         );
// //         if (status === 201) {
// //           toast.success("Message sent! You'll hear from us within 24 hrs.");
// //           setFormData({
// //             firstName: "",
// //             lastName: "",
// //             email: "",
// //             phone: "",
// //             message_text: "",
// //             agreeToLicense: false,
// //           });
// //           navigate("/contact-us");
// //         }
// //       } catch (err) {
// //         toast.error("Submission failed. Try again.");
// //       }
// //     },
// //     [formData, navigate]
// //   );

// //   return (
// //     <div>
// //       <ToastContainer autoClose={3000} pauseOnHover={false} />
// //       {/* Top Banner */}
// //       <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] xl:h-[280px] overflow-hidden shadow-sm pt-16 sm:pt-20 md:pt-24">
// //         <img
// //           src={one}
// //           alt="Camera Blog Banner"
// //           className="absolute inset-0 w-full h-full object-cover object-center"
// //         />
// //         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
// //           <h1 className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-center leading-snug tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
// //             Explore camera tips, gear reviews,
// //             <br className="sm:hidden" />
// //             and photography hacks from our pros.
// //           </h1>
// //         </div>
// //       </div>
// //       <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-5/6 mx-auto pt-5 pb-5 gap-10">
// //         <div className="w-full md:w-1/2 p-5 rounded-lg">
// //           <h2 className="text-xl font-bold text-red-500 mb-3">Contact Us</h2>
// //           <p className="text-4xl text-gray-900 mb-4 font-bold">Get In Touch</p>

// //           <form onSubmit={handleSubmit}>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               {["firstName", "lastName"].map((field) => (
// //                 <div key={field}>
// //                   <label
// //                     htmlFor={field}
// //                     className="block text-gray-700 font-medium mb-1"
// //                   >
// //                     {field === "firstName" ? "First Name" : "Last Name"}
// //                   </label>
// //                   <input
// //                     id={field}
// //                     name={field}
// //                     type="text"
// //                     value={formData[field]}
// //                     onChange={handleChange}
// //                     required={field === "firstName"}
// //                     placeholder={
// //                       field === "firstName" ? "First name" : "Last name"
// //                     }
// //                     className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
// //                   />
// //                 </div>
// //               ))}
// //             </div>

// //             {[
// //               {
// //                 id: "email",
// //                 type: "email",
// //                 required: true,
// //                 placeholder: "Your email",
// //               },
// //               {
// //                 id: "phone",
// //                 type: "tel",
// //                 required: true,
// //                 placeholder: "Your phone",
// //               },
// //             ].map(({ id, type, required, placeholder }) => (
// //               <div className="mb-4" key={id}>
// //                 <label
// //                   htmlFor={id}
// //                   className="block text-gray-700 font-medium mb-1"
// //                 >
// //                   {id.charAt(0).toUpperCase() + id.slice(1)}
// //                 </label>
// //                 <input
// //                   id={id}
// //                   name={id}
// //                   type={type}
// //                   value={formData[id]}
// //                   onChange={handleChange}
// //                   required={required}
// //                   placeholder={placeholder}
// //                   className="w-full px-4 py-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //               </div>
// //             ))}

// //             <div className="mb-4">
// //               <label
// //                 htmlFor="message_text"
// //                 className="block text-gray-700 font-medium mb-1"
// //               >
// //                 Your Message
// //               </label>
// //               <textarea
// //                 id="message_text"
// //                 name="message_text"
// //                 rows={4}
// //                 value={formData.message_text}
// //                 onChange={handleChange}
// //                 placeholder="Your Message"
// //                 required
// //                 className="w-full px-4 py-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               ></textarea>
// //             </div>

// //             <button
// //               type="submit"
// //               className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded shadow-lg transition-all duration-200"
// //             >
// //               Submit Form
// //             </button>
// //           </form>
// //         </div>

// //         <div className="w-full md:w-1/2 flex flex-col gap-6">
// //           <p className="text-4xl font-bold text-gray-800">Visit Our Store</p>
// //           <div className="h-96 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
// //             <iframe
// //               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.599258635925!2d77.57704956430813!3d12.99238005173825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c7b245a9%3A0x41bcb92d6e83e60!2sBangalore%20Palace!5e0!3m2!1sen!2sin!4v1698522816618!5m2!1sen!2sin"
// //               width="100%"
// //               height="100%"
// //               style={{ border: 0 }}
// //               allowFullScreen
// //               loading="lazy"
// //               title="Google Maps"
// //             ></iframe>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="shipping_section p-4">
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //           {[
// //             { img: email, label: "Email", value: "info@camerarentals.com" },
// //             { img: phone, label: "Phone", value: "+91 9538596766" },
// //             {
// //               img: address,
// //               label: "Address",
// //               value:
// //                 "Shed No 45, 3rd main, Hesaraghatta Road, Bagalagunte, Bengaluru - 560091",
// //             },
// //           ].map(({ img, label, value }, idx) => (
// //             <div key={idx} className="flex justify-center items-center p-4">
// //               <img
// //                 src={img}
// //                 className="w-16 h-16 mr-4"
// //                 loading="lazy"
// //                 alt={label}
// //               />
// //               <div className="flex items-center">
// //                 <h5 className="text-lg font-bold">{label}</h5>
// //                 <p className="text-md text-gray-600 ms-2">{value}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContactUs;

// //

// "use client";

// import React, { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import email from "../../assets/contactpage_images/email.svg";
// import phone from "../../assets/contactpage_images/phone.svg";
// import address from "../../assets/contactpage_images/address.svg";
// import globalBackendRoute from "../../config/Config";
// import one from "../../assets/images_and_videos/4.jpg";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message_text: "",
//     agreeToLicense: false,
//   });

//   const navigate = useNavigate();

//   const handleChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }, []);

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       try {
//         const { status } = await axios.post(
//           `${globalBackendRoute}/add-contact-message`,
//           formData,
//           { timeout: 5000 }
//         );
//         if (status === 201) {
//           toast.success("Message sent! You'll hear from us within 24 hrs.");
//           setFormData({
//             firstName: "",
//             lastName: "",
//             email: "",
//             phone: "",
//             message_text: "",
//             agreeToLicense: false,
//           });
//           navigate("/contact-us");
//         }
//       } catch (err) {
//         toast.error("Submission failed. Try again.");
//       }
//     },
//     [formData, navigate]
//   );

//   return (
//     <div>
//       <ToastContainer autoClose={3000} pauseOnHover={false} />
//       {/* Top Banner */}
//       <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] xl:h-[280px] overflow-hidden shadow-sm pt-16 sm:pt-20 md:pt-24">
//         <img
//           src={one}
//           alt="Camera Blog Banner"
//           className="absolute inset-0 w-full h-full object-cover object-center"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
//           <h1 className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-center leading-snug tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
//             Contact Us - For Any Camera Needs,
//             <br className="sm:hidden" />
//             Find Us On Google Map.
//           </h1>
//         </div>
//       </div>
//       <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-5/6 mx-auto pt-5 pb-5 gap-10">
//         <div className="w-full md:w-1/2 p-5 rounded-lg">
//           <h2 className="text-xl font-bold text-red-500 mb-3">Contact Us</h2>
//           <p className="text-4xl text-gray-900 mb-4 font-bold">Get In Touch</p>

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {[
//                 { id: "firstName", label: "First Name" },
//                 { id: "lastName", label: "Last Name" },
//               ].map(({ id, label }) => (
//                 <div key={id}>
//                   <label
//                     htmlFor={id}
//                     className="block text-gray-700 font-medium mb-1"
//                   >
//                     {label}
//                     {id === "firstName" && (
//                       <span className="text-red-600"> *</span>
//                     )}
//                   </label>
//                   <input
//                     id={id}
//                     name={id}
//                     type="text"
//                     value={formData[id]}
//                     onChange={handleChange}
//                     required={id === "firstName"}
//                     placeholder={label}
//                     className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
//                   />
//                 </div>
//               ))}
//             </div>

//             {[
//               {
//                 id: "email",
//                 type: "email",
//                 required: true,
//                 placeholder: "Your email",
//               },
//               {
//                 id: "phone",
//                 type: "tel",
//                 required: true,
//                 placeholder: "Your phone",
//               },
//             ].map(({ id, type, required, placeholder }) => (
//               <div className="mb-4" key={id}>
//                 <label
//                   htmlFor={id}
//                   className="block text-gray-700 font-medium mb-1"
//                 >
//                   {id.charAt(0).toUpperCase() + id.slice(1)}
//                   {required && <span className="text-red-600"> *</span>}
//                 </label>
//                 <input
//                   id={id}
//                   name={id}
//                   type={type}
//                   value={formData[id]}
//                   onChange={handleChange}
//                   required={required}
//                   placeholder={placeholder}
//                   className="w-full px-4 py-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             ))}

//             <div className="mb-4">
//               <label
//                 htmlFor="message_text"
//                 className="block text-gray-700 font-medium mb-1"
//               >
//                 Your Message<span className="text-red-600"> *</span>
//               </label>
//               <textarea
//                 id="message_text"
//                 name="message_text"
//                 rows={4}
//                 value={formData.message_text}
//                 onChange={handleChange}
//                 placeholder="Your Message"
//                 required
//                 className="w-full px-4 py-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded shadow-lg transition-all duration-200"
//             >
//               Submit Form
//             </button>
//           </form>
//         </div>

//         <div className="w-full md:w-1/2 flex flex-col gap-6 shadow-lg">
//           <p className="text-4xl font-bold text-gray-800">Visit Our Store</p>
//           <div className="h-96 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.599258635925!2d77.57704956430813!3d12.99238005173825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c7b245a9%3A0x41bcb92d6e83e60!2sBangalore%20Palace!5e0!3m2!1sen!2sin!4v1698522816618!5m2!1sen!2sin"
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               allowFullScreen
//               loading="lazy"
//               title="Google Maps"
//             ></iframe>
//           </div>
//         </div>
//       </div>

//       <div className="shipping_section p-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             { img: email, label: "Email", value: "info@camerarentals.com" },
//             { img: phone, label: "Phone", value: "+91 9538596766" },
//             {
//               img: address,
//               label: "Address",
//               value:
//                 "Shed No 45, 3rd main, Hesaraghatta Road, Bagalagunte, Bengaluru - 560091",
//             },
//           ].map(({ img, label, value }, idx) => (
//             <div
//               key={idx}
//               className="flex justify-center items-center p-2 shadow-lg border-b rounded-lg"
//             >
//               <img
//                 src={img}
//                 className="w-16 h-8 mr-4"
//                 loading="lazy"
//                 alt={label}
//               />
//               <div className="flex items-center">
//                 {/* <h5 className="text-lg font-bold">{label}</h5> */}
//                 <p className="text-md text-gray-900 font-bold ms-2">{value}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

//

"use client";

import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import email from "../../assets/contactpage_images/email.svg";
import phone from "../../assets/contactpage_images/phone.svg";
import address from "../../assets/contactpage_images/address.svg";
import one from "../../assets/images_and_videos/4.jpg";
import globalBackendRoute from "../../config/Config";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message_text: "",
    agreeToLicense: false,
  });

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post(
          `${globalBackendRoute}/api/add-contact-message`,
          formData
        );
        console.log("API response:", response.data);

        if (response.status === 201) {
          toast.success("Message sent! You'll hear from us within 24 hrs.");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message_text: "",
            agreeToLicense: false,
          });
          navigate("/contact-us");
        }
      } catch (err) {
        console.error(
          "Form submission error:",
          err.response?.data || err.message
        );
        toast.error("Submission failed. Try again.");
      }
    },
    [formData, navigate]
  );

  return (
    <div>
      <ToastContainer autoClose={3000} pauseOnHover={false} />

      {/* Banner */}
      <div className="relative w-full h-[240px] overflow-hidden shadow-sm pt-16">
        <img
          src={one}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-2">
          <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">
            Contact Us - For Any Camera Needs
            <br className="sm:hidden" /> Find Us On Google Map
          </h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-5/6 mx-auto pt-5 pb-5 gap-10">
        <div className="w-full md:w-1/2 p-5 rounded-lg">
          <h2 className="text-xl font-bold text-red-500 mb-3">Contact Us</h2>
          <p className="text-4xl text-gray-900 mb-4 font-bold">Get In Touch</p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {["firstName", "lastName"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1">
                    {field === "firstName" ? "First Name" : "Last Name"}
                    {field === "firstName" && (
                      <span className="text-red-600"> *</span>
                    )}
                  </label>
                  <input
                    name={field}
                    type="text"
                    value={formData[field]}
                    onChange={handleChange}
                    required={field === "firstName"}
                    placeholder={
                      field === "firstName" ? "First name" : "Last name"
                    }
                    className="w-full px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            {["email", "phone"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-gray-700 font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  name={field}
                  type={field === "email" ? "email" : "tel"}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  placeholder={`Your ${field}`}
                  className="w-full px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Your Message <span className="text-red-600">*</span>
              </label>
              <textarea
                name="message_text"
                rows={4}
                value={formData.message_text}
                onChange={handleChange}
                required
                placeholder="Your message"
                className="w-full px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded shadow-lg transition-all duration-200"
            >
              Submit Form
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 shadow-lg">
          <p className="text-4xl font-bold text-gray-800">Visit Our Store</p>
          <div className="h-96 rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.599258635925!2d77.57704956430813!3d12.99238005173825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c7b245a9%3A0x41bcb92d6e83e60!2sBangalore%20Palace!5e0!3m2!1sen!2sin!4v1698522816618!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="shipping_section p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { img: email, value: "info@camerarentals.com" },
            { img: phone, value: "+91 9538596766" },
            {
              img: address,
              value:
                "Shed No 45, 3rd main, Hesaraghatta Road, Bagalagunte, Bengaluru - 560091",
            },
          ].map(({ img, value }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 shadow-md rounded-lg"
            >
              <img src={img} className="w-10 h-10" alt="icon" loading="lazy" />
              <p className="text-gray-900 font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
