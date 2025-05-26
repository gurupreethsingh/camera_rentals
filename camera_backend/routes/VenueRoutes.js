// routes/VenueRoutes.js
const express = require("express");
const router = express.Router();
const VenueController = require("../controllers/VenueController");

// Configure Multer Upload Middleware for main and gallery images
router.post(
  "/add-venue",
  VenueController.venueUpload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 10 },
  ]),
  VenueController.createVenue
);

router.get("/get-all-venues", VenueController.getAllVenues);
router.get("/get-venue/:id", VenueController.getVenueById);

router.put(
  "/update-venue/:id",
  VenueController.venueUpload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 10 },
  ]),
  VenueController.updateVenueById
);

router.delete("/delete-venue/:id", VenueController.deleteVenue);
router.get("/count-venues", VenueController.countVenues);

module.exports = router;
