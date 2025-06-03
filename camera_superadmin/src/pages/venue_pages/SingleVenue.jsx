// ✅ This is the enhanced version of SingleVenue.jsx fully aligned with your SingleAddedProduct.jsx structure
// Includes: main image update, gallery image replace/delete, controlled form fields, complete update logic

import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaTags,
  FaMapMarkerAlt,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaDoorOpen,
  FaRulerCombined,
  FaMoneyBillWave,
  FaClipboardList,
  FaUserTie,
  FaFileContract,
  FaBuilding,
} from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import ModernFileInput from "../../components/common_components/ModernFileInput";
import ModernTextInput from "../../components/common_components/MordernTextInput";

export default function SingleVenue() {
  const [venueData, setVenueData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({});
  const [newMainImage, setNewMainImage] = useState(null);
  const [newGalleryImages, setNewGalleryImages] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get_venue_by_id/${id}`
        );
        setVenueData(res.data);

        const dataCopy = { ...res.data };
        delete dataCopy._id;
        setUpdatedFields(dataCopy);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };
    fetchVenue();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      Object.entries(updatedFields).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          formData.append(key, val);
        }
      });
      if (newMainImage) formData.append("main_image", newMainImage);
      Object.entries(newGalleryImages).forEach(([key, file]) => {
        if (file && file.size <= 5 * 1024 * 1024) {
          formData.append(key, file);
        }
      });

      await axios.put(
        `${globalBackendRoute}/api/update-venue/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Venue updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error updating venue:", err);
      alert("Failed to update venue");
    }
  };

  const deleteGalleryImage = async (imageKey) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.post(`${globalBackendRoute}/api/delete-venue-image/${id}`, {
        imageKey,
      });
      alert("Image deleted successfully.");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting image:", err);
      alert("Failed to delete image");
    }
  };

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "https://via.placeholder.com/150";
    return `${globalBackendRoute}/${imgPath.replace(/\\/g, "/")}`;
  };

  const safe = (val) =>
    val === null || val === undefined || val === "" ? "NA" : val;

  if (!venueData) return <div className="text-center py-8">Loading...</div>;

  const imageFields = Array.from(
    { length: 10 },
    (_, i) => `gallery_image_${i + 1}`
  );

  const allFields = [
    { icon: <FaHome />, label: "Venue Name", key: "venue_name" },
    { icon: <FaTags />, label: "Slug", key: "slug" },
    { icon: <FaClipboardList />, label: "Description", key: "description" },
    { icon: <FaBuilding />, label: "Type", key: "type" },
    { icon: <FaMapMarkerAlt />, label: "Address", key: "address" },
    { icon: <FaMapMarkerAlt />, label: "City", key: "city" },
    { icon: <FaMapMarkerAlt />, label: "State", key: "state" },
    { icon: <FaMapMarkerAlt />, label: "Pincode", key: "pincode" },
    { icon: <FaGlobe />, label: "Country", key: "country" },
    { icon: <FaEnvelope />, label: "Email", key: "contact_email" },
    { icon: <FaPhone />, label: "Phone", key: "contact_phone" },
    { icon: <FaGlobe />, label: "Website", key: "website" },
    { icon: <FaUsers />, label: "Max Guests", key: "max_guests" },
    { icon: <FaDoorOpen />, label: "Rooms", key: "number_of_rooms" },
    { icon: <FaRulerCombined />, label: "Area (sqft)", key: "area_sqft" },
    { icon: <FaMoneyBillWave />, label: "Base Price", key: "base_price" },
    { icon: <FaTags />, label: "Discount %", key: "discount_percentage" },
    { icon: <FaClipboardList />, label: "Amenities", key: "amenities" },
    { icon: <FaClipboardList />, label: "Policies", key: "policies" },
    { icon: <FaUserTie />, label: "Owner", key: "owner_name" },
    {
      icon: <FaFileContract />,
      label: "Ownership Doc",
      key: "ownership_proof_doc_url",
    },
    {
      icon: <FaFileContract />,
      label: "T&C URL",
      key: "terms_and_conditions_url",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="containerWidth my-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start items-center gap-6">
        <div className="w-full sm:w-1/3 space-y-4">
          <img
            src={getImageUrl(venueData.main_image)}
            alt="Venue"
            className="w-full h-48 object-cover rounded-xl border"
          />

          {editMode && (
            <ModernFileInput
              label="Update Main Image"
              multiple={false}
              onFileSelect={(file) => setNewMainImage(file)}
            />
          )}

          <div className="grid grid-cols-3 gap-2 mt-4">
            {imageFields.map((key) => (
              <div key={key} className="flex flex-col items-center gap-1">
                {venueData[key] && (
                  <>
                    <img
                      src={getImageUrl(venueData[key])}
                      alt={key}
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                    {editMode && (
                      <button
                        className="text-red-600 text-xs"
                        onClick={() => deleteGalleryImage(key)}
                      >
                        <MdDelete className="inline mr-1" /> Delete
                      </button>
                    )}
                  </>
                )}
                {editMode && (
                  <ModernFileInput
                    label={`Replace ${key}`}
                    multiple={false}
                    onFileSelect={(file) =>
                      setNewGalleryImages((prev) => ({ ...prev, [key]: file }))
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full sm:w-2/3">
          <h3 className="subHeadingTextMobile lg:subHeadingText mb-4">
            Venue Details
          </h3>

          <div className="border-t border-gray-200 divide-y divide-gray-100">
            {allFields.map((field, idx) => (
              <VenueField
                key={idx}
                icon={field.icon}
                label={field.label}
                value={
                  editMode && field.key ? (
                    <ModernTextInput
                      value={updatedFields[field.key] || ""}
                      onChange={(e) =>
                        setUpdatedFields((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    safe(updatedFields[field.key])
                  )
                }
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => (editMode ? handleUpdate() : setEditMode(true))}
              className="primaryBtn w-fit px-6 py-2 rounded-full flex items-center gap-2"
            >
              <MdEdit /> {editMode ? "Save Changes" : "Edit Venue"}
            </button>

            <Link
              to="/all-venues"
              className="secondaryBtn w-fit px-6 py-2 rounded-full"
            >
              Back to All Venues
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VenueField({ icon, label, value }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}
