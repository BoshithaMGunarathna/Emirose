const express = require('express');
const serviceController = require('../controllers/serviceController');
const uploadServiceMiddleware = require("../middlewares/uploadServicesMiddleware");

const router = express.Router();

router.post("/", uploadServiceMiddleware.single("Image"), serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.get('/withSub/:serviceId', serviceController.getServiceWithSubServices);
router.put("/:id", uploadServiceMiddleware.single("Image"), serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;
