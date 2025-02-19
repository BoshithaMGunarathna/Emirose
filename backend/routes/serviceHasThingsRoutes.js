const express = require('express');
const serviceHasThingsController = require('../controllers/serviceHasThingsController');

const router = express.Router();

router.post("/", serviceHasThingsController.createServiceHasThing);
router.get("/:serviceId", serviceHasThingsController.getAllServiceHasThings);
router.get("/thing/:id", serviceHasThingsController.getServiceHasThingById);
router.put("/thing/:id", serviceHasThingsController.updateServiceHasThing);
router.put("/:serviceId", serviceHasThingsController.updateBulkServiceHasThings);
router.delete("/thing/:id", serviceHasThingsController.deleteServiceHasThing);

module.exports = router;
