// import React from "react";

// const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   if (totalPages <= 1) return null; // Don't show pagination if only 1 page

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex justify-center mt-6">
//       <nav className="inline-flex space-x-1">
//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             onClick={() => paginate(number)}
//             className={`px-4 py-2 rounded-md border ${
//               currentPage === number
//                 ? "bg-gray-900 text-white"
//                 : "bg-white text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             {number}
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Pagination;

//

// till here original.

//

// ✅ Pagination.jsx updated to match image: right-aligned, styled buttons
import React from "react";

const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-end">
      <nav className="flex space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`w-8 h-8 text-sm rounded-full border font-semibold transition duration-300
              ${
                currentPage === number
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {number}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
