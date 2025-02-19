const db = require('../db/db');

exports.createServiceHasSub = async (serviceHasThingData) => {
    const { Name, Service_idService } = serviceHasThingData;
    const [result] = await db.query(
        "INSERT INTO Service_Has_Things (Name, Service_idService) VALUES (?, ?)",
        [Name, Service_idService]
    );

    return { id: result.insertId, ...serviceHasThingData };
};


exports.getAllServiceHasSub = async (serviceId) => {
    try {
        const [rows] = await db.query("SELECT * FROM Service_Has_Things WHERE Service_idService = ?", [serviceId]);
        return rows;
    } catch (error) {
        throw new Error("Error fetching Service Has Things: " + error.message);
    }
};

exports.getServiceHasSubById = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM Service_Has_Things WHERE idServiceHasThing = ?", [id]);
        if (rows.length === 0) return null;
        return rows[0];
    } catch (error) {
        throw new Error("Error fetching Service Has Thing by ID: " + error.message);
    }
};

// single sub service
exports.updateServiceHasSub = async (id, serviceHasThingData) => {
    const { Name, Service_idService } = serviceHasThingData;
    const [result] = await db.query(
        "UPDATE Service_Has_Things SET Name = ?, Service_idService = ? WHERE idServiceHasThing = ?",
        [Name, Service_idService, id]
    );

    if (result.affectedRows === 0) {
        return null; 
    }
    
    return { id, ...serviceHasThingData };
};


//bulk update
exports.updateBulkServiceHasSub = async (id, serviceHasThingData) => {
    const { Name, Service_idService } = serviceHasThingData;
    await db.query(
        "UPDATE Service_Has_Things SET Name = ?, Service_idService = ? WHERE idServiceHasThing = ?",
        [Name, Service_idService, id]
    );
    return { id, ...serviceHasThingData };
};




exports.deleteServiceHasSub = async (id) => {
    await db.query("DELETE FROM Service_Has_Things WHERE idServiceHasThing = ?", [id]);
    return { id };
};
