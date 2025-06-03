// const mongoose = require("mongoose");

// const venueSchema = new mongoose.Schema({
//   venue_name: { type: String, required: true }, // e.g., Taj Villa
//   slug: { type: String, unique: true }, // e.g., taj-villa
//   description: { type: String }, // Long description

//   // Category & Type
//   type: {
//     type: String,
//     enum: ["villa", "hotel", "resort", "banquet", "apartment", "hall", "other"],
//     default: "other",
//   },
//   category_tags: [{ type: String }], // e.g., ["luxury", "beachfront", "wedding"]

//   // Location
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String },
//   country: { type: String, default: "India" },
//   pincode: { type: String },
//   coordinates: {
//     lat: { type: Number },
//     lng: { type: Number },
//   },

//   // Contact Info
//   contact_email: { type: String },
//   contact_phone: { type: String },
//   website: { type: String },

//   // Images
//   main_image: { type: String, required: true }, // Single main image path
//   gallery_images: [{ type: String }], // Array of additional images

//   // Capacity & Area
//   max_guests: { type: Number }, // e.g., 300
//   number_of_rooms: { type: Number },
//   area_sqft: { type: Number }, // Total area

//   // Pricing
//   base_price: { type: Number, required: true }, // Starting price
//   price_unit: {
//     type: String,
//     enum: ["per_night", "per_day", "per_hour", "flat"],
//     default: "per_night",
//   },
//   additional_charges: { type: Number, default: 0 }, // Optional additional charges
//   discount_percentage: { type: Number, default: 0 },

//   // Amenities & Features
//   amenities: [{ type: String }], // e.g., ["WiFi", "Pool", "AC", "Parking"]
//   policies: { type: String }, // e.g., "Check-in after 2PM..."

//   // Legal & Ownership
//   owner_name: { type: String },
//   ownership_proof_doc_url: { type: String },
//   terms_and_conditions_url: { type: String },

//   // Booking Info
//   is_available: { type: Boolean, default: true },
//   blackout_dates: [{ type: Date }],

//   // Ratings & Feedback
//   avg_rating: { type: Number, default: 0 },
//   total_reviews: { type: Number, default: 0 },

//   // Admin Metadata
//   is_featured: { type: Boolean, default: false },
//   approval_status: {
//     type: String,
//     enum: ["pending", "approved", "rejected"],
//     default: "pending",
//   },

//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// venueSchema.pre("save", function (next) {
//   this.updatedAt = new Date();
//   next();
// });

// const Venue = mongoose.model("Venue", venueSchema);
// module.exports = Venue;

const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  venue_name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String },

  type: {
    type: String,
    enum: ["villa", "hotel", "resort", "banquet", "apartment", "hall", "other"],
    default: "other",
  },
  category_tags: [{ type: String }],

  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, default: "India" },
  pincode: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },

  contact_email: { type: String },
  contact_phone: { type: String },
  website: { type: String },

  main_image: { type: String },
  gallery_image_1: { type: String },
  gallery_image_2: { type: String },
  gallery_image_3: { type: String },
  gallery_image_4: { type: String },
  gallery_image_5: { type: String },
  gallery_image_6: { type: String },
  gallery_image_7: { type: String },
  gallery_image_8: { type: String },
  gallery_image_9: { type: String },
  gallery_image_10: { type: String },

  max_guests: { type: Number },
  number_of_rooms: { type: Number },
  area_sqft: { type: Number },

  base_price: { type: Number, required: true },
  price_unit: {
    type: String,
    enum: ["per_night", "per_day", "per_hour", "flat"],
    default: "per_night",
  },
  additional_charges: { type: Number, default: 0 },
  discount_percentage: { type: Number, default: 0 },

  amenities: [{ type: String }],
  policies: { type: String },

  owner_name: { type: String },
  ownership_proof_doc_url: { type: String },
  terms_and_conditions_url: { type: String },

  is_available: { type: Boolean, default: true },
  blackout_dates: [{ type: Date }],

  avg_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },

  is_featured: { type: Boolean, default: false },
  approval_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

venueSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
