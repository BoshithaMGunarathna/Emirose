const express = require('express');
const serviceHasThingsController = require('../controllers/serviceHasSubController');

const router = express.Router();

router.post("/", serviceHasThingsController.createServiceHasSub);
router.get("/:serviceId", serviceHasThingsController.getAllServiceHasSub);
router.get("/thing/:id", serviceHasThingsController.getServiceHasSubById);
router.put("/thing/:id", serviceHasThingsController.updateServiceHasSub);
router.put("/:serviceId", serviceHasThingsController.updateBulkServiceHasSub);
router.delete("/thing/:id", serviceHasThingsController.deleteServiceHasSub);

module.exports = router;
