const Rent = require("../models/RentModel");
const Product = require("../models/ProductModel");

// Helper: Validate required fields
const validateRentData = (data) => {
  if (!data.product) return "Product ID is required.";
  if (!data.rental_prices || typeof data.rental_prices !== "object")
    return "Rental prices must be provided.";
  if (!data.rental_prices.daily && !data.rental_prices.hourly)
    return "At least hourly or daily rental price must be provided.";
  return null;
};

// Create Rent Details
exports.createRentDetails = async (req, res) => {
  try {
    const errorMsg = validateRentData(req.body);
    if (errorMsg) return res.status(400).json({ message: errorMsg });

    const exists = await Rent.findOne({ product: req.body.product });
    if (exists)
      return res
        .status(400)
        .json({ message: "Rent already exists for this product." });

    const rent = new Rent({
      product: req.body.product,
      is_rentable: req.body.is_rentable ?? true,
      rental_type: req.body.rental_type || "daily",
      rental_prices: {
        hourly: req.body.rental_prices?.hourly || 0,
        daily: req.body.rental_prices?.daily || 0,
        weekly: req.body.rental_prices?.weekly || 0,
        monthly: req.body.rental_prices?.monthly || 0,
      },
      rental_discount: req.body.rental_discount || 0,
      rental_min_duration: req.body.rental_min_duration || 1,
      rental_max_duration: req.body.rental_max_duration || 30,
      rental_availability: req.body.rental_availability ?? true,
      blackout_dates: req.body.blackout_dates || [],
      rental_deposit: req.body.rental_deposit || 0,
      rental_late_fee_per_day: req.body.rental_late_fee_per_day || 0,
      rental_return_policy: req.body.rental_return_policy || "",
      rental_delivery_options: {
        delivery_available:
          req.body.rental_delivery_options?.delivery_available ?? true,
        pickup_available:
          req.body.rental_delivery_options?.pickup_available ?? true,
        delivery_fee: req.body.rental_delivery_options?.delivery_fee || 0,
      },
      renter_verification_required:
        req.body.renter_verification_required || false,
      rental_terms_url: req.body.rental_terms_url || "",
      rental_insurance_required: req.body.rental_insurance_required || false,
      damage_waiver_fee: req.body.damage_waiver_fee || 0,
      rentable_quantity: req.body.rentable_quantity || 1,
      rating_from_renters: req.body.rating_from_renters || 0,
      maintenance_required: req.body.maintenance_required || false,
      maintenance_schedule: req.body.maintenance_schedule || [],
      rented_periods: req.body.rented_periods || [],
    });

    await rent.save();
    res.status(201).json(rent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create rent entry.", error: error.message });
  }
};

// Get All
exports.getAllRentDetails = async (req, res) => {
  try {
    const rents = await Rent.find().populate("product", "product_name");
    res.status(200).json(rents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch rent details.", error: error.message });
  }
};

// Get by Product ID
exports.getRentDetailsByProduct = async (req, res) => {
  try {
    const rent = await Rent.findOne({ product: req.params.productId }).populate(
      "product",
      "product_name"
    );
    if (!rent)
      return res
        .status(404)
        .json({ message: "No rent details found for this product." });
    res.status(200).json(rent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve rent info.", error: error.message });
  }
};

// Get by Rent ID
exports.getRentDetailsById = async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id).populate(
      "product",
      "product_name"
    );
    if (!rent) return res.status(404).json({ message: "Rent not found." });
    res.status(200).json(rent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rent by ID.", error: error.message });
  }
};

// Update Rent Details by Product ID
exports.updateRentDetailsByProduct = async (req, res) => {
  try {
    const updated = await Rent.findOneAndUpdate(
      { product: req.params.productId },
      {
        $set: {
          is_rentable: req.body.is_rentable ?? true,
          rental_type: req.body.rental_type || "daily",
          rental_prices: {
            hourly: req.body.rental_prices?.hourly || 0,
            daily: req.body.rental_prices?.daily || 0,
            weekly: req.body.rental_prices?.weekly || 0,
            monthly: req.body.rental_prices?.monthly || 0,
          },
          rental_discount: req.body.rental_discount || 0,
          rental_min_duration: req.body.rental_min_duration || 1,
          rental_max_duration: req.body.rental_max_duration || 30,
          rental_availability: req.body.rental_availability ?? true,
          blackout_dates: req.body.blackout_dates || [],
          rental_deposit: req.body.rental_deposit || 0,
          rental_late_fee_per_day: req.body.rental_late_fee_per_day || 0,
          rental_return_policy: req.body.rental_return_policy || "",
          rental_delivery_options: {
            delivery_available:
              req.body.rental_delivery_options?.delivery_available ?? true,
            pickup_available:
              req.body.rental_delivery_options?.pickup_available ?? true,
            delivery_fee: req.body.rental_delivery_options?.delivery_fee || 0,
          },
          renter_verification_required:
            req.body.renter_verification_required || false,
          rental_terms_url: req.body.rental_terms_url || "",
          rental_insurance_required:
            req.body.rental_insurance_required || false,
          damage_waiver_fee: req.body.damage_waiver_fee || 0,
          rentable_quantity: req.body.rentable_quantity || 1,
          rating_from_renters: req.body.rating_from_renters || 0,
          maintenance_required: req.body.maintenance_required || false,
          maintenance_schedule: req.body.maintenance_schedule || [],
          rented_periods: req.body.rented_periods || [],
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Rent entry not found." });
    res.status(200).json({ message: "Updated successfully.", rent: updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed.", error: error.message });
  }
};

// Update Rent Details by Rent ID (FULL ATTRIBUTE MAPPING)
exports.updateRentDetailsById = async (req, res) => {
  try {
    const updated = await Rent.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          is_rentable: req.body.is_rentable ?? true,
          rental_type: req.body.rental_type || "daily",
          rental_prices: {
            hourly: req.body.rental_prices?.hourly || 0,
            daily: req.body.rental_prices?.daily || 0,
            weekly: req.body.rental_prices?.weekly || 0,
            monthly: req.body.rental_prices?.monthly || 0,
          },
          rental_discount: req.body.rental_discount || 0,
          rental_min_duration: req.body.rental_min_duration || 1,
          rental_max_duration: req.body.rental_max_duration || 30,
          rental_availability: req.body.rental_availability ?? true,
          blackout_dates: req.body.blackout_dates || [],
          rental_deposit: req.body.rental_deposit || 0,
          rental_late_fee_per_day: req.body.rental_late_fee_per_day || 0,
          rental_return_policy: req.body.rental_return_policy || "",
          rental_delivery_options: {
            delivery_available:
              req.body.rental_delivery_options?.delivery_available ?? true,
            pickup_available:
              req.body.rental_delivery_options?.pickup_available ?? true,
            delivery_fee: req.body.rental_delivery_options?.delivery_fee || 0,
          },
          renter_verification_required:
            req.body.renter_verification_required || false,
          rental_terms_url: req.body.rental_terms_url || "",
          rental_insurance_required:
            req.body.rental_insurance_required || false,
          damage_waiver_fee: req.body.damage_waiver_fee || 0,
          rentable_quantity: req.body.rentable_quantity || 1,
          rating_from_renters: req.body.rating_from_renters || 0,
          maintenance_required: req.body.maintenance_required || false,
          maintenance_schedule: req.body.maintenance_schedule || [],
          rented_periods: req.body.rented_periods || [],
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Rent not found." });
    res.status(200).json({ message: "Rent entry updated.", rent: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update rent entry.", error: error.message });
  }
};

// Delete by Rent ID
exports.deleteRentDetailsById = async (req, res) => {
  try {
    const deleted = await Rent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Rent not found." });
    res.status(200).json({ message: "Rent entry deleted." });
  } catch (error) {
    res.status(500).json({ message: "Delete failed.", error: error.message });
  }
};

// Count
exports.countAllRentDetails = async (req, res) => {
  try {
    const count = await Rent.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Counting failed.", error: error.message });
  }
};
