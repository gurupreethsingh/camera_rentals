const Venue = require("../models/VenueModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Add at top

// Create upload directory if not exists
const venueUploadDir = path.join("uploads", "venues");
if (!fs.existsSync(venueUploadDir))
  fs.mkdirSync(venueUploadDir, { recursive: true });

// Multer config
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

// Create Venue
exports.createVenue = async (req, res) => {
  try {
    const mainImagePath =
      req.files?.main_image?.[0]?.path.replace(/\\/g, "/") || "";
    const galleryImagesPaths =
      req.files?.gallery_images?.map((f) => f.path.replace(/\\/g, "/")) || [];

    const categoryTagsParsed = safeParseArray(req.body.category_tags);
    const amenitiesParsed = safeParseArray(req.body.amenities);

    const venue = new Venue({
      venue_name: req.body.venue_name,
      slug: req.body.slug,
      description: req.body.description,
      type: req.body.type || "other",
      category_tags: categoryTagsParsed,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country || "India",
      pincode: req.body.pincode,
      coordinates: req.body.coordinates,
      contact_email: req.body.contact_email,
      contact_phone: req.body.contact_phone,
      website: req.body.website,
      main_image: mainImagePath,
      gallery_images: galleryImagesPaths,
      max_guests: req.body.max_guests,
      number_of_rooms: req.body.number_of_rooms,
      area_sqft: req.body.area_sqft,
      base_price: req.body.base_price,
      price_unit: req.body.price_unit || "per_night",
      additional_charges: req.body.additional_charges || 0,
      discount_percentage: req.body.discount_percentage || 0,
      amenities: amenitiesParsed,
      policies: req.body.policies,
      owner_name: req.body.owner_name,
      ownership_proof_doc_url: req.body.ownership_proof_doc_url,
      terms_and_conditions_url: req.body.terms_and_conditions_url,
      is_available: req.body.is_available ?? true,
      blackout_dates: req.body.blackout_dates || [],
      avg_rating: req.body.avg_rating || 0,
      total_reviews: req.body.total_reviews || 0,
      is_featured: req.body.is_featured || false,
      approval_status: req.body.approval_status || "pending",
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

// Get all venues
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

// Get single venue by ID
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

// Update venue
exports.updateVenueById = async (req, res) => {
  try {
    const updatedFields = {
      venue_name: req.body.venue_name,
      slug: req.body.slug,
      description: req.body.description,
      type: req.body.type || "other",
      category_tags: safeParseArray(req.body.category_tags),
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country || "India",
      pincode: req.body.pincode,
      coordinates: req.body.coordinates,
      contact_email: req.body.contact_email,
      contact_phone: req.body.contact_phone,
      website: req.body.website,
      max_guests: req.body.max_guests,
      number_of_rooms: req.body.number_of_rooms,
      area_sqft: req.body.area_sqft,
      base_price: req.body.base_price,
      price_unit: req.body.price_unit || "per_night",
      additional_charges: req.body.additional_charges || 0,
      discount_percentage: req.body.discount_percentage || 0,
      amenities: safeParseArray(req.body.amenities),
      policies: req.body.policies,
      owner_name: req.body.owner_name,
      ownership_proof_doc_url: req.body.ownership_proof_doc_url,
      terms_and_conditions_url: req.body.terms_and_conditions_url,
      is_available: req.body.is_available ?? true,
      blackout_dates: req.body.blackout_dates || [],
      avg_rating: req.body.avg_rating || 0,
      total_reviews: req.body.total_reviews || 0,
      is_featured: req.body.is_featured || false,
      approval_status: req.body.approval_status || "pending",
      updatedAt: new Date(),
    };

    if (req.files["main_image"]) {
      updatedFields.main_image = req.files["main_image"][0].path.replace(
        /\\/g,
        "/"
      );
    }

    if (req.files["gallery_images"]) {
      updatedFields.gallery_images = req.files["gallery_images"].map((f) =>
        f.path.replace(/\\/g, "/")
      );
    }

    const updated = await Venue.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true,
      }
    );
    if (!updated) return res.status(404).json({ message: "Venue not found." });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update venue.", error: err.message });
  }
};

// Delete venue
exports.deleteVenue = async (req, res) => {
  try {
    const deleted = await Venue.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Venue not found." });
    res.status(200).json({ message: "Venue deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete venue.", error: err.message });
  }
};

// Count venues
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

// 🔧 Helper to safely parse arrays from strings
function safeParseArray(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
