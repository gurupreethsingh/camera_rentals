const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true,
  },

  // Core rental logic
  is_rentable: { type: Boolean, default: true },
  rental_type: {
    type: String,
    enum: ["hourly", "daily", "weekly", "monthly"],
    default: "daily",
  },
  rental_prices: {
    hourly: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
    weekly: { type: Number, default: 0 },
    monthly: { type: Number, default: 0 },
  },

  rental_discount: { type: Number, default: 0 },
  rental_min_duration: { type: Number, default: 1 }, // e.g., 1 day
  rental_max_duration: { type: Number, default: 30 },
  rental_availability: { type: Boolean, default: true },
  blackout_dates: [{ type: Date }],
  rental_deposit: { type: Number, default: 0 },
  rental_late_fee_per_day: { type: Number, default: 0 },
  rental_return_policy: { type: String },

  // Delivery / Pickup options
  rental_delivery_options: {
    delivery_available: { type: Boolean, default: true },
    pickup_available: { type: Boolean, default: true },
    delivery_fee: { type: Number, default: 0 },
  },

  // Verification & legal
  renter_verification_required: { type: Boolean, default: false },
  rental_terms_url: { type: String }, // ✅ added for agreement PDF or URL
  rental_insurance_required: { type: Boolean, default: false }, // ✅ insurance

  // Damage control
  damage_waiver_fee: { type: Number, default: 0 }, // ✅ optional waiver

  // Inventory for rentals
  rentable_quantity: { type: Number, default: 1 }, // ✅ units available for rent

  // Ratings (separate from main product rating)
  rating_from_renters: { type: Number, default: 0 }, // ✅ renter-based rating

  // Maintenance
  maintenance_required: { type: Boolean, default: false },
  maintenance_schedule: [
    {
      start_date: Date,
      end_date: Date,
      notes: String,
    },
  ],

  // History / booking data
  rented_periods: [
    {
      start_date: Date,
      end_date: Date,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["booked", "cancelled", "completed"] },
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

rentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Rent = mongoose.model("Rent", rentSchema);
module.exports = Rent;
