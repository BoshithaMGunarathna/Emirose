const serviceHasThingsService = require('../services/serviceHasThingsService');

exports.createServiceHasThing = async (req, res) => {
    try {
        const serviceHasThing = await serviceHasThingsService.createServiceHasThing(req.body);
        res.status(201).json(serviceHasThing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllServiceHasThings = async (req, res) => {
    try {
        const serviceHasThings = await serviceHasThingsService.getAllServiceHasThings(req.params.serviceId);
        res.json(serviceHasThings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceHasThingById = async (req, res) => {
    try {
        const serviceHasThing = await serviceHasThingsService.getServiceHasThingById(req.params.id);
        if (!serviceHasThing) return res.status(404).json({ message: "Service Has Thing not found" });
        res.json(serviceHasThing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateServiceHasThing = async (req, res) => {
    try {
        const updatedServiceHasThing = await serviceHasThingsService.updateServiceHasThing(req.params.id, req.body);
        res.json(updatedServiceHasThing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteServiceHasThing = async (req, res) => {
    try {
        await serviceHasThingsService.deleteServiceHasThing(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
