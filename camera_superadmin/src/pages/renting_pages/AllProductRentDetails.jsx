import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaClock,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaToggleOn,
  FaGlobe,
  FaPercent,
  FaHandHoldingUsd,
  FaUndo,
  FaTruck,
  FaClipboardCheck,
  FaFileContract,
  FaShieldAlt,
  FaTools,
  FaUsers,
  FaCubes,
  FaStar,
  FaInfoCircle,
  FaRoute,
} from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

export default function AllProductRentDetails() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [rentDetails, setRentDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/all-added-products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      axios
        .get(
          `${globalBackendRoute}/api/get-rent-details-by-product/${selectedProductId}`
        )
        .then((res) => setRentDetails(res.data))
        .catch(() => setRentDetails(null));
    }
  }, [selectedProductId]);

  const safe = (val) =>
    val === null || val === undefined || val === "" ? "NA" : val.toString();

  const iconColor = "text-indigo-600";

  const fieldMap = rentDetails && [
    {
      label: "Rental Type",
      value: rentDetails.rental_type,
      icon: <FaClock className={iconColor} />,
    },
    {
      label: "Hourly Rate",
      value: rentDetails.rental_prices?.hourly,
      icon: <FaMoneyBillWave className={iconColor} />,
    },
    {
      label: "Daily Rate",
      value: rentDetails.rental_prices?.daily,
      icon: <FaMoneyBillWave className={iconColor} />,
    },
    {
      label: "Weekly Rate",
      value: rentDetails.rental_prices?.weekly,
      icon: <FaMoneyBillWave className={iconColor} />,
    },
    {
      label: "Monthly Rate",
      value: rentDetails.rental_prices?.monthly,
      icon: <FaMoneyBillWave className={iconColor} />,
    },
    {
      label: "Discount (%)",
      value: rentDetails.rental_discount,
      icon: <FaPercent className={iconColor} />,
    },
    {
      label: "Min Duration",
      value: rentDetails.rental_min_duration,
      icon: <FaCalendarAlt className={iconColor} />,
    },
    {
      label: "Max Duration",
      value: rentDetails.rental_max_duration,
      icon: <FaCalendarAlt className={iconColor} />,
    },
    {
      label: "Deposit",
      value: rentDetails.rental_deposit,
      icon: <FaHandHoldingUsd className={iconColor} />,
    },
    {
      label: "Late Fee Per Day",
      value: rentDetails.rental_late_fee_per_day,
      icon: <FaUndo className={iconColor} />,
    },
    {
      label: "Return Policy",
      value: rentDetails.rental_return_policy,
      icon: <FaClipboardCheck className={iconColor} />,
    },
    {
      label: "Delivery Fee",
      value: rentDetails.rental_delivery_options?.delivery_fee,
      icon: <FaTruck className={iconColor} />,
    },
    {
      label: "Rentable Quantity",
      value: rentDetails.rentable_quantity,
      icon: <FaCubes className={iconColor} />,
    },
    {
      label: "Renter Rating",
      value: rentDetails.rating_from_renters,
      icon: <FaStar className={iconColor} />,
    },
    {
      label: "Damage Waiver Fee",
      value: rentDetails.damage_waiver_fee,
      icon: <FaShieldAlt className={iconColor} />,
    },
    {
      label: "Rental Terms URL",
      value: rentDetails.rental_terms_url,
      icon: <FaFileContract className={iconColor} />,
    },
    {
      label: "Verification Required",
      value: rentDetails.renter_verification_required ? "Yes" : "No",
      icon: <FaClipboardCheck className={iconColor} />,
    },
    {
      label: "Insurance Required",
      value: rentDetails.rental_insurance_required ? "Yes" : "No",
      icon: <FaShieldAlt className={iconColor} />,
    },
    {
      label: "Delivery Available",
      value: rentDetails.rental_delivery_options?.delivery_available
        ? "Yes"
        : "No",
      icon: <FaTruck className={iconColor} />,
    },
    {
      label: "Pickup Available",
      value: rentDetails.rental_delivery_options?.pickup_available
        ? "Yes"
        : "No",
      icon: <FaBoxOpen className={iconColor} />,
    },
    {
      label: "Rental Available",
      value: rentDetails.rental_availability ? "Yes" : "No",
      icon: <FaToggleOn className={iconColor} />,
    },
    {
      label: "Maintenance Required",
      value: rentDetails.maintenance_required ? "Yes" : "No",
      icon: <FaTools className={iconColor} />,
    },
    {
      label: "Blackout Dates",
      value: rentDetails.blackout_dates?.length
        ? rentDetails.blackout_dates
            .map((d) => new Date(d).toLocaleDateString())
            .join(", ")
        : "None",
      icon: <FaCalendarAlt className={iconColor} />,
    },
  ];

  return (
    <div className="containerWidth py-8">
      <h2 className="text-2xl font-semibold mb-4">
        View Product Rental Details
      </h2>

      {/* Product Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select a product to view rent details{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Select Product --</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.product_name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Rent Details */}
      {rentDetails ? (
        <div className="border-t border-gray-200 divide-y divide-gray-100 mt-6">
          {fieldMap.map((field, index) => (
            <div
              key={index}
              className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4"
            >
              <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
                {field.icon} {field.label}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {safe(field.value)}
              </dd>
            </div>
          ))}

          {/* Edit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() =>
                navigate(`/update-rent-details/${selectedProductId}`)
              }
              className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700"
            >
              Edit Rent Details
            </button>
          </div>
        </div>
      ) : selectedProductId ? (
        <p className="text-red-500 text-center">
          No rent details found for selected product.
        </p>
      ) : null}
    </div>
  );
}
