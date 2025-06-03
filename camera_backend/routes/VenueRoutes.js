const express = require("express");
const router = express.Router();
const VenueController = require("../controllers/VenueController");

router.post(
  "/add-venue",
  VenueController.venueUpload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_image_1", maxCount: 1 },
    { name: "gallery_image_2", maxCount: 1 },
    { name: "gallery_image_3", maxCount: 1 },
    { name: "gallery_image_4", maxCount: 1 },
    { name: "gallery_image_5", maxCount: 1 },
    { name: "gallery_image_6", maxCount: 1 },
    { name: "gallery_image_7", maxCount: 1 },
    { name: "gallery_image_8", maxCount: 1 },
    { name: "gallery_image_9", maxCount: 1 },
    { name: "gallery_image_10", maxCount: 1 },
  ]),
  VenueController.createVenue
);

router.get("/all-venues", VenueController.getAllVenues);
router.get("/get_venue_by_id/:id", VenueController.getVenueById);

router.put(
  "/update-venue/:id",
  VenueController.venueUpload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_image_1", maxCount: 1 },
    { name: "gallery_image_2", maxCount: 1 },
    { name: "gallery_image_3", maxCount: 1 },
    { name: "gallery_image_4", maxCount: 1 },
    { name: "gallery_image_5", maxCount: 1 },
    { name: "gallery_image_6", maxCount: 1 },
    { name: "gallery_image_7", maxCount: 1 },
    { name: "gallery_image_8", maxCount: 1 },
    { name: "gallery_image_9", maxCount: 1 },
    { name: "gallery_image_10", maxCount: 1 },
  ]),
  VenueController.updateVenueById
);

router.delete("/delete-venue/:id", VenueController.deleteVenue);
router.post("/delete-venue-image/:id", VenueController.deleteVenueImageByKey);
router.get("/venue-count", VenueController.countVenues);

router.get("/search-venues", VenueController.searchVenues);
router.get("/venues-by-city/:city", VenueController.getVenuesByCity);
router.get("/venues-available", VenueController.getAvailableVenues);
router.get("/venues-unavailable", VenueController.getUnavailableVenues);
router.get("/venues-paginated", VenueController.getPaginatedVenues);

module.exports = router;
