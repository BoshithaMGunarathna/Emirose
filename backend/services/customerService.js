const db = require('../db/db'); 

exports.createCustomer = async (customerData) => {
    const { Name, Email, Password, Address1, Address2, Address3, City, District, Postal_Code } = customerData;
    const [result] = await db.query(
        "INSERT INTO customers (Name, Email, Password, Address1, Address2, Address3, City, District, Postal_Code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [Name, Email, Password, Address1, Address2, Address3, City, District, Postal_Code]
    );
    return { id: result.insertId, ...customerData };
};

exports.findCustomerByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM customers WHERE Email = ?", [email]);
    return rows[0];
};
