import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";
import {
  FaHome,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaUpload,
  FaUsers,
  FaDoorOpen,
  FaRulerCombined,
  FaMoneyBillWave,
  FaTags,
  FaClipboardList,
  FaUserTie,
  FaFileContract,
  FaPen,
  FaBuilding,
} from "react-icons/fa";

export default function AddVenue() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
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
  const [galleryImages, setGalleryImages] = useState([]);

  const numericFields = [
    "max_guests",
    "number_of_rooms",
    "area_sqft",
    "base_price",
    "discount_percentage",
    "additional_charges",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (numericFields.includes(name)) {
      // Allow only numbers or decimal points
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, val]) => {
        if (key === "category_tags" || key === "amenities") return;
        data.append(key, val);
      });

      data.append(
        "category_tags",
        JSON.stringify(formData.category_tags.split(",").map((t) => t.trim()))
      );
      data.append(
        "amenities",
        JSON.stringify(formData.amenities.split(",").map((a) => a.trim()))
      );

      if (mainImage) data.append("main_image", mainImage);
      galleryImages.forEach((img) => data.append("gallery_images", img));

      const res = await axios.post(
        `${globalBackendRoute}/api/add-venue`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 201) {
        alert("Venue created successfully");
        navigate("/all-venues");
      }
    } catch (err) {
      console.error("Venue creation failed", err);
      setMessage("Failed to create venue. Please check your inputs.");
    }
  };

  const renderField = (label, name, icon, placeholder, type = "text") => {
    const isNumeric = numericFields.includes(name);
    return (
      <div className="flex flex-col mb-4">
        <label className="font-medium text-gray-700 flex items-center gap-2">
          {icon} {label}
        </label>
        <input
          type={isNumeric ? "number" : type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className="mt-1 px-4 py-2 rounded border shadow-sm focus:ring focus:outline-none"
          min={isNumeric ? 0 : undefined}
          required
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Venue</h2>

      {message && (
        <div className="col-span-2 text-red-600 font-semibold border border-red-300 bg-red-50 px-4 py-2 rounded mb-4">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        {renderField("Venue Name", "venue_name", <FaHome />, "e.g., Taj Villa")}
        {renderField("Slug", "slug", <FaTags />, "e.g., taj-villa")}

        {/* Description */}
        <div className="flex flex-col mb-4 col-span-2">
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <FaPen /> Description
          </label>
          <textarea
            name="description"
            placeholder="Full venue description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 px-4 py-2 rounded border shadow-sm focus:ring focus:outline-none"
            required
          ></textarea>
        </div>

        {/* Type */}
        <div className="flex flex-col mb-4">
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <FaBuilding /> Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 px-4 py-2 rounded border shadow-sm focus:ring focus:outline-none"
          >
            <option value="villa">Villa</option>
            <option value="hotel">Hotel</option>
            <option value="resort">Resort</option>
            <option value="banquet">Banquet</option>
            <option value="apartment">Apartment</option>
            <option value="hall">Hall</option>
            <option value="other">Other</option>
          </select>
        </div>

        {renderField("City", "city", <FaMapMarkerAlt />, "e.g., Mumbai")}
        {renderField("Address", "address", <FaMapMarkerAlt />, "Full address")}
        {renderField("State", "state", <FaMapMarkerAlt />, "e.g., Maharashtra")}
        {renderField("Pincode", "pincode", <FaMapMarkerAlt />, "e.g., 400001")}
        {renderField(
          "Contact Email",
          "contact_email",
          <FaEnvelope />,
          "example@venue.com"
        )}
        {renderField(
          "Contact Phone",
          "contact_phone",
          <FaPhone />,
          "e.g., 9876543210"
        )}
        {renderField("Website", "website", <FaGlobe />, "https://example.com")}
        {renderField("Max Guests", "max_guests", <FaUsers />, "e.g., 300")}
        {renderField("Rooms", "number_of_rooms", <FaDoorOpen />, "e.g., 10")}
        {renderField(
          "Area (sqft)",
          "area_sqft",
          <FaRulerCombined />,
          "e.g., 5000"
        )}
        {renderField(
          "Base Price",
          "base_price",
          <FaMoneyBillWave />,
          "e.g., 10000"
        )}
        {renderField(
          "Discount %",
          "discount_percentage",
          <FaTags />,
          "e.g., 10"
        )}
        {renderField(
          "Category Tags",
          "category_tags",
          <FaTags />,
          "Comma separated"
        )}
        {renderField(
          "Amenities",
          "amenities",
          <FaClipboardList />,
          "Comma separated"
        )}
        {renderField(
          "Policies",
          "policies",
          <FaClipboardList />,
          "Rules and conditions"
        )}
        {renderField(
          "Owner Name",
          "owner_name",
          <FaUserTie />,
          "e.g., John Doe"
        )}
        {renderField(
          "Ownership Doc URL",
          "ownership_proof_doc_url",
          <FaFileContract />,
          "Link to document"
        )}
        {renderField(
          "T&C URL",
          "terms_and_conditions_url",
          <FaFileContract />,
          "Link to T&C"
        )}

        {/* Main Image */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaUpload /> Main Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])}
            className="border rounded px-4 py-2 text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />
        </div>

        {/* Gallery Images */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaUpload /> Gallery Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryImages([...e.target.files])}
            className="border rounded px-4 py-2 text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-indigo-700"
          >
            Add Venue Details
          </button>
        </div>
      </form>
    </div>
  );
}
