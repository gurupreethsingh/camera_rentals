import globalBackendRoute from "../../config/Config";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddVenue() {
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState({
    venue_name: "",
    slug: "",
    description: "",
    type: "villa",
    category_tags: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    max_guests: "",
    number_of_rooms: "",
    area_sqft: "",
    base_price: "",
    price_unit: "per_night",
    additional_charges: "",
    discount_percentage: "",
    amenities: "",
    policies: "",
    owner_name: "",
    ownership_proof_doc_url: "",
    terms_and_conditions_url: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState({
    gallery_image_1: null,
    gallery_image_2: null,
    gallery_image_3: null,
    gallery_image_4: null,
    gallery_image_5: null,
    gallery_image_6: null,
    gallery_image_7: null,
    gallery_image_8: null,
    gallery_image_9: null,
    gallery_image_10: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prev) => ({
      ...prev,
      [name]: name === "venue_name" ? value.trimStart() : value,
    }));
  };

  const handleGalleryChange = (e, key) => {
    setGalleryImages((prev) => ({
      ...prev,
      [key]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(venueData).forEach(([key, val]) => {
        if (["category_tags", "amenities"].includes(key)) return;
        formData.append(key, val);
      });

      formData.append(
        "category_tags",
        JSON.stringify(venueData.category_tags.split(",").map((x) => x.trim()))
      );
      formData.append(
        "amenities",
        JSON.stringify(venueData.amenities.split(",").map((x) => x.trim()))
      );

      if (mainImage) formData.append("main_image", mainImage);
      Object.entries(galleryImages).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const res = await axios.post(
        `${globalBackendRoute}/api/add-venue`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 201) {
        alert("Venue added successfully!");
        navigate("/all-venues");
      } else {
        throw new Error("Venue not created");
      }
    } catch (error) {
      console.error("Add Venue Error:", error);
      setMessage(
        error.response?.data?.message || "Failed to add venue. Try again."
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Add New Venue</h2>
      {message && <p className="text-red-500 text-center">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "venue_name",
            "slug",
            "description",
            "type",
            "category_tags",
            "address",
            "city",
            "state",
            "country",
            "pincode",
            "contact_email",
            "contact_phone",
            "website",
            "max_guests",
            "number_of_rooms",
            "area_sqft",
            "base_price",
            "price_unit",
            "additional_charges",
            "discount_percentage",
            "amenities",
            "policies",
            "owner_name",
            "ownership_proof_doc_url",
            "terms_and_conditions_url",
          ].map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-500">*</span>{" "}
                {key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </label>
              {key === "description" || key === "policies" ? (
                <textarea
                  name={key}
                  rows={3}
                  value={venueData[key]}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              ) : key === "type" ? (
                <select
                  name="type"
                  value={venueData.type}
                  onChange={handleChange}
                  className="block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="villa">Villa</option>
                  <option value="hotel">Hotel</option>
                  <option value="resort">Resort</option>
                  <option value="banquet">Banquet</option>
                  <option value="apartment">Apartment</option>
                  <option value="hall">Hall</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <input
                  type={
                    [
                      "max_guests",
                      "number_of_rooms",
                      "area_sqft",
                      "base_price",
                      "additional_charges",
                      "discount_percentage",
                    ].includes(key)
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={venueData[key]}
                  onChange={handleChange}
                  className="block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500">*</span> Main Venue Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])}
            className="block w-full h-12 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300"
          />
        </div>

        {/* Gallery Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(galleryImages).map((key, idx) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gallery Image {idx + 1}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleGalleryChange(e, key)}
                className="block w-full h-12 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-3 px-4 rounded-lg shadow hover:opacity-90"
        >
          Add Venue
        </button>
      </form>
    </div>
  );
}
