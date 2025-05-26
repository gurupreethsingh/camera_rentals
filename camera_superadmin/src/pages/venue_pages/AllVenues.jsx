import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaMapMarkerAlt,
  FaUserTie,
  FaRupeeSign,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllVenues = () => {
  const [venues, setVenues] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/get-all-venues`);
        setVenues(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching venues:", error.message);
        toast.error("Failed to fetch venues.");
      }
    };
    fetchVenues();
  }, []);

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/venues/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const handleImageError = (e) => {
    if (!e.target.dataset.fallback) {
      e.target.src = "https://via.placeholder.com/150";
      e.target.dataset.fallback = "true";
    }
  };

  const handleDeleteVenue = async (venueId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-venue/${venueId}`
      );
      if (res.status === 200) {
        setVenues((prev) => prev.filter((v) => v._id !== venueId));
        toast.success("Venue deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete venue.");
    }
  };

  const filteredVenues = searchQuery.trim()
    ? venues.filter((venue) => {
        const fullText =
          `${venue.venue_name} ${venue.city} ${venue.type}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some((word) => fullText.includes(word));
      })
    : venues;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Venues
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredVenues.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center flex-wrap gap-4">
            <FaThList
              className={`text-xl cursor-pointer ${
                view === "list" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("list")}
            />
            <FaThLarge
              className={`text-xl cursor-pointer ${
                view === "card" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("card")}
            />
            <FaTh
              className={`text-xl cursor-pointer ${
                view === "grid" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("grid")}
            />
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search venues..."
            />
          </div>
        </div>

        <div className="mt-6">
          {filteredVenues.length === 0 ? (
            <p className="text-center text-gray-500">No venues found.</p>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
                  : view === "card"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredVenues.map((venue) => (
                <Link
                  key={venue._id}
                  to={`/single-venue/${venue._id}`}
                  className={
                    view === "list"
                      ? "flex items-center space-x-4 bg-white rounded-lg shadow p-3 relative"
                      : "relative bg-white shadow rounded-lg overflow-hidden"
                  }
                >
                  <img
                    src={getImageUrl(venue.main_image)}
                    alt={venue.venue_name}
                    onError={handleImageError}
                    className={
                      view === "list"
                        ? "w-20 h-20 object-cover rounded-lg"
                        : "w-full h-48 object-cover"
                    }
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteVenue(venue._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <div className={view === "list" ? "" : "p-3 space-y-1"}>
                    <h3 className="subHeadingTextMobile">{venue.venue_name}</h3>
                    <p className="paragraphTextMobile flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {venue.city}
                    </p>
                    <p className="paragraphTextMobile flex items-center">
                      <FaUserTie className="mr-1" />
                      {venue.owner_name}
                    </p>
                    {venue.base_price && (
                      <p className="font-bold text-green-600 flex items-center">
                        <FaRupeeSign /> {venue.base_price} / {venue.price_unit}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllVenues;
