import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateRentDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [rentData, setRentData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/get-rent-details-by-product/${productId}`)
      .then((res) => {
        setRentData(res.data);
        setProductName(res.data.product.product_name);
      })
      .catch(() => setMessage("Failed to load rent details."));
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("rental_prices.")) {
      const key = name.split(".")[1];
      setRentData((prev) => ({
        ...prev,
        rental_prices: {
          ...prev.rental_prices,
          [key]: Number(value),
        },
      }));
    } else if (name.startsWith("rental_delivery_options.")) {
      const key = name.split(".")[1];
      setRentData((prev) => ({
        ...prev,
        rental_delivery_options: {
          ...prev.rental_delivery_options,
          [key]: type === "checkbox" ? checked : Number(value),
        },
      }));
    } else {
      setRentData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-rent-details-by-product/${productId}`,
        rentData
      );
      alert("Rent details updated successfully!");
      navigate("/all-products-rent-details");
    } catch (err) {
      const msg = err?.response?.data?.message || "Update failed.";
      setMessage(msg);
    }
  };

  if (!rentData) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Update Renting Details</h2>
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            disabled
            className="w-full border bg-gray-100 rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rental Type
            </label>
            <select
              name="rental_type"
              value={rentData.rental_type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {Object.entries(rentData.rental_prices).map(([key, val]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)} Rate
              </label>
              <input
                type="number"
                name={`rental_prices.${key}`}
                value={val}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}

          {[
            "rental_discount",
            "rental_min_duration",
            "rental_max_duration",
            "rental_deposit",
            "rental_late_fee_per_day",
            "damage_waiver_fee",
            "rental_terms_url",
            "rentable_quantity",
            "rating_from_renters",
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
              <input
                type={field.includes("url") ? "text" : "number"}
                name={field}
                value={rentData[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rental Return Policy
          </label>
          <textarea
            name="rental_return_policy"
            value={rentData.rental_return_policy}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {["delivery_available", "pickup_available"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={`rental_delivery_options.${opt}`}
                checked={rentData.rental_delivery_options[opt]}
                onChange={handleChange}
              />
              {opt.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
          ))}

          {[
            "renter_verification_required",
            "rental_insurance_required",
            "maintenance_required",
            "rental_availability",
          ].map((flag) => (
            <label key={flag} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={flag}
                checked={rentData[flag]}
                onChange={handleChange}
              />
              {flag.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Update Renting Details
        </button>
      </form>
    </div>
  );
}
