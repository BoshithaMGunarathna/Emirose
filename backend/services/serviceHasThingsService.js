const db = require('../db/db');

exports.createServiceHasThing = async (serviceHasThingData) => {
    const { Name, Service_idService } = serviceHasThingData;
    const [result] = await db.query(
        "INSERT INTO Service_Has_Things (Name, Service_idService) VALUES (?, ?)",
        [Name, Service_idService]
    );

    return { id: result.insertId, ...serviceHasThingData };
};

exports.getAllServiceHasThings = async (serviceId) => {
    const [rows] = await db.query("SELECT * FROM Service_Has_Things WHERE Service_idService = ?", [serviceId]);
    return rows;
};

exports.getServiceHasThingById = async (id) => {
    const [rows] = await db.query("SELECT * FROM Service_Has_Things WHERE idServiceHasThing = ?", [id]);
    if (rows.length === 0) return null;
    return rows[0];
};

exports.updateServiceHasThing = async (id, serviceHasThingData) => {
    const { Name, Service_idService } = serviceHasThingData;
    await db.query(
        "UPDATE Service_Has_Things SET Name = ?, Service_idService = ? WHERE idServiceHasThing = ?",
        [Name, Service_idService, id]
    );
    return { id, ...serviceHasThingData };
};

exports.deleteServiceHasThing = async (id) => {
    await db.query("DELETE FROM Service_Has_Things WHERE idServiceHasThing = ?", [id]);
    return { id };
};
