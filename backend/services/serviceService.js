const db = require('../db/db');

exports.createService = async (serviceData) => {
    const { Name, Description, Image } = serviceData;
    const [result] = await db.query(
        "INSERT INTO services (Name, Description, Image) VALUES (?, ?, ?)",
        [Name, Description, Image]
    );

    return { id: result.insertId, ...serviceData };
};

exports.getAllServices = async (baseURL) => {
    const [rows] = await db.query("SELECT * FROM services");

    return rows.map(service => ({
        ...service,
        image: service.Image ? `${baseURL}${service.Image}` : null,
    }));
};

exports.getServiceById = async (id, baseURL) => {
    const [rows] = await db.query("SELECT * FROM services WHERE idService = ?", [id]);
    if (rows.length === 0) return null;

    const service = rows[0];
    return {
        ...service,
        image: service.Image ? `${baseURL}${service.Image}` : null,
    };
};

exports.updateService = async (id, serviceData) => {
    const { Name, Description, Image } = serviceData;
    await db.query(
        "UPDATE services SET Name = ?, Description = ?, Image = ? WHERE idService = ?",
        [Name, Description, Image, id]
    );
    return { id, ...serviceData };
};

exports.deleteService = async (id) => {
    await db.query("DELETE FROM services WHERE idService = ?", [id]);
    return { id };
};
