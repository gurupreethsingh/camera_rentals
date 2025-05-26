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
import { MdEdit } from "react-icons/md";
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
  const [newGalleryImages, setNewGalleryImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/get-venue/${id}`
        );
        const data = response.data;

        data.amenities = Array.isArray(data.amenities)
          ? data.amenities.join(", ")
          : data.amenities;
        data.category_tags = Array.isArray(data.category_tags)
          ? data.category_tags.join(", ")
          : data.category_tags;

        // Ensure all gallery image paths are unique but keep duplicates if needed
        data.gallery_images = Array.isArray(data.gallery_images)
          ? data.gallery_images
          : [];

        setVenueData(data);
        setUpdatedFields(data);
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };
    fetchVenueData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      const tagsArray =
        typeof updatedFields.category_tags === "string"
          ? updatedFields.category_tags.split(",").map((t) => t.trim())
          : updatedFields.category_tags || [];

      const amenitiesArray =
        typeof updatedFields.amenities === "string"
          ? updatedFields.amenities.split(",").map((a) => a.trim())
          : updatedFields.amenities || [];

      const numericFields = [
        "max_guests",
        "number_of_rooms",
        "area_sqft",
        "base_price",
        "discount_percentage",
        "additional_charges",
      ];

      Object.entries(updatedFields).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          if (numericFields.includes(key)) {
            formData.append(key, parseInt(val) || 0);
          } else if (key === "category_tags") {
            formData.append("category_tags", JSON.stringify(tagsArray));
          } else if (key === "amenities") {
            formData.append("amenities", JSON.stringify(amenitiesArray));
          } else {
            formData.append(key, val);
          }
        }
      });

      if (newMainImage) formData.append("main_image", newMainImage);
      newGalleryImages.forEach((file) => {
        formData.append("gallery_images", file);
      });

      const res = await axios.put(
        `${globalBackendRoute}/api/update-venue/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Venue updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating venue:", error);
      alert("Failed to update the venue. Please try again.");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    return `${globalBackendRoute}/${imagePath.replace(/\\/g, "/")}`;
  };

  const safe = (val) =>
    val === null || val === undefined || val === "" ? "NA" : val;

  if (!venueData) return <div className="text-center py-8">Loading...</div>;

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
    <div className="containerWidth my-6">
      <div className="flex flex-col sm:flex-row sm:items-start items-center gap-6">
        <div className="w-full sm:w-1/3 space-y-4">
          <img
            src={getImageUrl(venueData.main_image)}
            alt={venueData.venue_name || "Venue"}
            className="w-full h-48 object-cover rounded-xl border"
          />

          {editMode && (
            <>
              <ModernFileInput
                label="Update Main Image"
                multiple={false}
                onFileSelect={(file) => setNewMainImage(file)}
              />

              <ModernFileInput
                label="Update Gallery Images"
                multiple={true}
                maxFiles={10}
                onFileSelect={(files) => setNewGalleryImages(files)}
              />
            </>
          )}

          {venueData.gallery_images?.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {venueData.gallery_images.map((img, i) => (
                <img
                  key={`${img}-${i}-${Math.random()}`}
                  src={getImageUrl(img)}
                  alt={`Gallery ${i}`}
                  className="w-full h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
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
    </div>
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
