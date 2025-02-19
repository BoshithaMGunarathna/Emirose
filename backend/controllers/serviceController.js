const serviceService = require('../services/serviceService');

exports.createService = async (req, res) => {
    try {
        console.log(req.body);
        const { Name, Description, Image } = req.body;

        if (!Name || !Description || !Image) {
            return res.status(400).json({ error: "Name, Description, and Image are required." });
        }

        const service = await serviceService.createService({ Name, Description, Image });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const baseURL = `${req.protocol}://${req.get("host")}/service-images/`;
        const services = await serviceService.getAllServices(baseURL);
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const baseURL = `${req.protocol}://${req.get("host")}/service-images/`;
        const service = await serviceService.getServiceById(req.params.id, baseURL);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const updatedService = await serviceService.updateService(req.params.id, req.body);
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await serviceService.deleteService(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
