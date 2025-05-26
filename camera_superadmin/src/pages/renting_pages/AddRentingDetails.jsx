import React, { useEffect, useState } from "react";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

export default function AddRentingDetails() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [rentData, setRentData] = useState({
    product: "",
    is_rentable: true,
    rental_type: "daily",
    rental_prices: {
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
    },
    rental_discount: 0,
    rental_min_duration: 1,
    rental_max_duration: 30,
    rental_availability: true,
    blackout_dates: [],
    rental_deposit: 0,
    rental_late_fee_per_day: 0,
    rental_return_policy: "",
    rental_delivery_options: {
      delivery_available: true,
      pickup_available: true,
      delivery_fee: 0,
    },
    renter_verification_required: false,
    rental_terms_url: "",
    rental_insurance_required: false,
    damage_waiver_fee: 0,
    rentable_quantity: 1,
    rating_from_renters: 0,
    maintenance_required: false,
    maintenance_schedule: [],
    rented_periods: [],
  });

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/all-added-products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

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

    if (!rentData.product) {
      setMessage("Please select a product.");
      return;
    }

    try {
      const res = await axios.post(
        `${globalBackendRoute}/api/add-renting-details`,
        rentData
      );
      if (res.status === 201) {
        alert("Renting details added!");
        setMessage("");
        setRentData({
          product: "",
          is_rentable: true,
          rental_type: "daily",
          rental_prices: { hourly: 0, daily: 0, weekly: 0, monthly: 0 },
          rental_discount: 0,
          rental_min_duration: 1,
          rental_max_duration: 30,
          rental_availability: true,
          blackout_dates: [],
          rental_deposit: 0,
          rental_late_fee_per_day: 0,
          rental_return_policy: "",
          rental_delivery_options: {
            delivery_available: true,
            pickup_available: true,
            delivery_fee: 0,
          },
          renter_verification_required: false,
          rental_terms_url: "",
          rental_insurance_required: false,
          damage_waiver_fee: 0,
          rentable_quantity: 1,
          rating_from_renters: 0,
          maintenance_required: false,
          maintenance_schedule: [],
          rented_periods: [],
        });
      }
    } catch (err) {
      console.error("Error adding rent details", err);
      const msg = err?.response?.data?.message || "Failed to add rent details.";
      setMessage(msg);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Add Renting Details</h2>
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Product <span className="text-red-500">*</span>
          </label>
          <select
            name="product"
            value={rentData.product}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.product_name}
              </option>
            ))}
          </select>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rental Type <span className="text-red-500">*</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="rental_prices.hourly"
                value={rentData.rental_prices.hourly}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Daily Rate <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="rental_prices.daily"
                value={rentData.rental_prices.daily}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., 800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weekly Rate
              </label>
              <input
                type="number"
                name="rental_prices.weekly"
                value={rentData.rental_prices.weekly}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., 4000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rate
              </label>
              <input
                type="number"
                name="rental_prices.monthly"
                value={rentData.rental_prices.monthly}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., 5000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount (%)
            </label>
            <input
              type="number"
              name="rental_discount"
              value={rentData.rental_discount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Optional discount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Duration
            </label>
            <input
              type="number"
              name="rental_min_duration"
              value={rentData.rental_min_duration}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., 1 day"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Duration
            </label>
            <input
              type="number"
              name="rental_max_duration"
              value={rentData.rental_max_duration}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., 30 days"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deposit Amount
            </label>
            <input
              type="number"
              name="rental_deposit"
              value={rentData.rental_deposit}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Security deposit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Late Fee / Day
            </label>
            <input
              type="number"
              name="rental_late_fee_per_day"
              value={rentData.rental_late_fee_per_day}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Late return charge"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Fee
            </label>
            <input
              type="number"
              name="rental_delivery_options.delivery_fee"
              value={rentData.rental_delivery_options.delivery_fee}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Fee for delivery (if any)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Damage Waiver Fee
            </label>
            <input
              type="number"
              name="damage_waiver_fee"
              value={rentData.damage_waiver_fee}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Optional fee"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rental Terms URL
            </label>
            <input
              type="text"
              name="rental_terms_url"
              value={rentData.rental_terms_url}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Link to agreement PDF or terms"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rentable Quantity
            </label>
            <input
              type="number"
              name="rentable_quantity"
              value={rentData.rentable_quantity}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Units available for rent"
            />
          </div>
        </div>

        {/* Full-width textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rental Return Policy
          </label>
          <textarea
            name="rental_return_policy"
            value={rentData.rental_return_policy}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
            placeholder="Terms for return, refund or condition"
          ></textarea>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="rental_delivery_options.delivery_available"
              checked={rentData.rental_delivery_options.delivery_available}
              onChange={handleChange}
            />
            Delivery Available
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="rental_delivery_options.pickup_available"
              checked={rentData.rental_delivery_options.pickup_available}
              onChange={handleChange}
            />
            Pickup Available
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="renter_verification_required"
              checked={rentData.renter_verification_required}
              onChange={handleChange}
            />
            Renter Verification Required
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="rental_insurance_required"
              checked={rentData.rental_insurance_required}
              onChange={handleChange}
            />
            Insurance Required
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="maintenance_required"
              checked={rentData.maintenance_required}
              onChange={handleChange}
            />
            Maintenance Required
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="rental_availability"
              checked={rentData.rental_availability}
              onChange={handleChange}
            />
            Currently Available
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:opacity-90"
        >
          Save Renting Details
        </button>
      </form>
    </div>
  );
}
