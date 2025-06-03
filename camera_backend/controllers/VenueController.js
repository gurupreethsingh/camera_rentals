// VENUE CONTROLLER FULLY UPDATED

const Venue = require("../models/VenueModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Upload directory
const venueUploadDir = path.join("uploads", "venues");
if (!fs.existsSync(venueUploadDir))
  fs.mkdirSync(venueUploadDir, { recursive: true });

// Multer Config
const venueStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, venueUploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${uuidv4()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});
const venueUpload = multer({ storage: venueStorage });
exports.venueUpload = venueUpload;

// Helper functions
const normalize = (f) => f?.path?.replace(/\\/g, "/") || "";
const safeParseArray = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// Fields
const imageKeys = [
  "main_image",
  ...Array.from({ length: 10 }, (_, i) => `gallery_image_${i + 1}`),
];

// CREATE VENUE
exports.createVenue = async (req, res) => {
  try {
    const venue = new Venue({
      ...req.body,
      category_tags: safeParseArray(req.body.category_tags),
      amenities: safeParseArray(req.body.amenities),
      blackout_dates: safeParseArray(req.body.blackout_dates),
    });

    imageKeys.forEach((key) => {
      venue[key] = normalize(req.files[key]?.[0]);
    });

    await venue.save();
    res.status(201).json(venue);
  } catch (err) {
    console.error("❌ Venue creation failed:", err);
    res
      .status(500)
      .json({ message: "Failed to create venue.", error: err.message });
  }
};

// READ ALL VENUES
exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch venues.", error: err.message });
  }
};

// READ SINGLE VENUE
exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found." });
    res.status(200).json(venue);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get venue.", error: err.message });
  }
};

// UPDATE VENUE
exports.updateVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found." });

    const updatedFields = {
      ...req.body,
      category_tags: safeParseArray(req.body.category_tags),
      amenities: safeParseArray(req.body.amenities),
      blackout_dates: safeParseArray(req.body.blackout_dates),
      updatedAt: Date.now(),
    };

    imageKeys.forEach((key) => {
      if (req.files[key]?.[0]) {
        const oldPath = venue[key];
        if (oldPath) {
          const fullPath = path.join(__dirname, "..", oldPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }
        updatedFields[key] = normalize(req.files[key][0]);
      }
    });

    const updated = await Venue.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update venue.", error: err.message });
  }
};

// DELETE VENUE AND IMAGES
exports.deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found." });

    const venueData = venue._doc; // get raw fields, even if undefined normally

    imageKeys.forEach((key) => {
      const imagePath = venueData[key];
      if (typeof imagePath === "string" && imagePath.trim()) {
        const fullPath = path.join(__dirname, "..", imagePath);
        if (fs.existsSync(fullPath)) {
          try {
            fs.unlinkSync(fullPath);
            console.log(`✅ Deleted: ${fullPath}`);
          } catch (err) {
            console.warn(`⚠️ Could not delete ${fullPath}:`, err.message);
          }
        } else {
          console.log(`❌ Not Found: ${fullPath}`);
        }
      } else {
        console.log(`🟡 Skipped ${key}:`, imagePath);
      }
    });

    await Venue.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Venue and all images deleted permanently." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete venue.", error: err.message });
  }
};

// DELETE SINGLE IMAGE BY KEY
exports.deleteVenueImageByKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageKey } = req.body;

    if (!id || !imageKey) {
      return res.status(400).json({ message: "Missing venue ID or image key" });
    }

    const venue = await Venue.findById(id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    const imagePath = venue[imageKey];
    if (!imagePath)
      return res.status(400).json({ message: "Invalid image key" });

    // Delete file from disk
    const filePath = path.join(__dirname, "..", imagePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove field from DB
    venue[imageKey] = undefined;
    await venue.save();

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Error in deleteVenueImageByKey:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// COUNT VENUES
exports.countVenues = async (req, res) => {
  try {
    const count = await Venue.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to count venues.", error: err.message });
  }
};

// SEARCH VENUES
exports.searchVenues = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query)
      return res.status(400).json({ message: "Search query is required" });

    const results = await Venue.find({
      $or: [
        { venue_name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { category_tags: { $regex: query, $options: "i" } },
        { amenities: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to search venues" });
  }
};

// FILTER BY CITY
exports.getVenuesByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const venues = await Venue.find({ city: new RegExp(city, "i") });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch venues by city" });
  }
};

// FILTER BY AVAILABILITY
exports.getAvailableVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ is_available: true });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch available venues" });
  }
};

exports.getUnavailableVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ is_available: false });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch unavailable venues" });
  }
};

// PAGINATION
exports.getPaginatedVenues = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sort || "createdAt";
    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const venues = await Venue.find()
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Venue.countDocuments();
    res.status(200).json({ total, page, limit, venues });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Pagination failed", error: error.message });
  }
};
