const serviceHasThingsService = require('../services/serviceHasSubService');

exports.createServiceHasSub = async (req, res) => {
    try {
        const { Service_idService, SubServices } = req.body;


        if (!Service_idService || !SubServices || !Array.isArray(SubServices)) {
            return res.status(400).json({ error: "Service_idService and SubServices array are required." });
        }

        const createdSubServices = [];
        for (const name of SubServices) {
            const serviceHasThing = await serviceHasThingsService.createServiceHasSub({ Name: name, Service_idService });
            createdSubServices.push(serviceHasThing);
        }

        res.status(201).json(createdSubServices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllServiceHasSub = async (req, res) => {
    try {
        const serviceHasThings = await serviceHasThingsService.getAllServiceHasSub(req.params.serviceId);
        if (!serviceHasThings.length) {
            return res.status(404).json({ message: "No Service Has Things found for this service." });
        }
        res.json(serviceHasThings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getServiceHasSubById = async (req, res) => {
    try {
        const serviceHasThing = await serviceHasThingsService.getServiceHasSubById(req.params.id);
        if (!serviceHasThing) {
            return res.status(404).json({ message: "Service Has Thing not found." });
        }
        res.json(serviceHasThing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//single update
exports.updateServiceHasSub = async (req, res) => {
    try {
        const updatedServiceHasThing = await serviceHasThingsService.updateServiceHasSub(req.params.id, req.body);
        if (!updatedServiceHasThing) {
            return res.status(404).json({ message: "Service Has Thing not found." });
        }
        res.json(updatedServiceHasThing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//bulk update
exports.updateBulkServiceHasSub = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const serviceHasThingsArray = req.body.serviceHasThings;

        if (!Array.isArray(serviceHasThingsArray) || serviceHasThingsArray.length === 0) {
            return res.status(400).json({ error: "Invalid input: serviceHasThings should be a non-empty array." });
        }

        const updatedServiceHasThings = [];

        for (const serviceHasThingData of serviceHasThingsArray) {
            const updatedServiceHasThing = await serviceHasThingsService.updateBulkServiceHasSub(
                serviceHasThingData.idServiceHasThing,
                { ...serviceHasThingData, Service_idService: serviceId }
            );
            updatedServiceHasThings.push(updatedServiceHasThing);
        }

        res.json(updatedServiceHasThings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




exports.deleteServiceHasSub = async (req, res) => {
    try {
        await serviceHasThingsService.deleteServiceHasSub(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
