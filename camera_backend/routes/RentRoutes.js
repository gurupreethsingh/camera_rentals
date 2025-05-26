const express = require("express");
const router = express.Router();
const RentController = require("../controllers/RentController");

// Create new rent entry
router.post("/add-renting-details", RentController.createRentDetails);

// Get all rent entries
router.get("/get-all-rent-details", RentController.getAllRentDetails);

// Get rent details by product ID
router.get(
  "/get-rent-details-by-product/:productId",
  RentController.getRentDetailsByProduct
);

// Get rent details by rent ID
router.get("/get-rent-details-by-id/:id", RentController.getRentDetailsById);

// Update rent details by product ID
router.put(
  "/update-rent-details-by-product/:productId",
  RentController.updateRentDetailsByProduct
);

// Update rent details by rent ID
router.put(
  "/update-rent-details-by-id/:id",
  RentController.updateRentDetailsById
);

// Delete rent entry by rent ID
router.delete("/delete-rent-by-id/:id", RentController.deleteRentDetailsById);

// Count total rent entries
router.get("/count-all-rent-details", RentController.countAllRentDetails);

module.exports = router;

// ✅ Sample Route Access Summary:
// Operation	               Method	  Route
// Add new rent details	POST	            /api/add-rent-details
// Get all rent details	          GET	/api/get-all-rent-details
// Get rent by product ID	    GET	/api/get-rent-details-by-product/:id
// Get rent by rent ID	          GET	/api/get-rent-details-by-id/:id
// Update rent by product ID	    PUT	/api/update-rent-details-by-product/:id
// Update rent by rent ID	    PUT	/api/update-rent-details-by-id/:id
// Delete rent by rent ID	    DELETE	/api/delete-rent-by-id/:id
// Count all rent entries	    GET	/api/count-all-rent-details
