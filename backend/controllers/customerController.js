const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const customerService = require('../services/customerService');

exports.signup = async (req, res) => {
    try {
        const { Name, Email, Password, Address1, Address2, Address3, City, District, Postal_Code } = req.body;

        if (!Name || !Email || !Password) {
            return res.status(400).json({ error: "Name, Email, and Password are required." });
        }

        const existingCustomer = await customerService.findCustomerByEmail(Email);
        if (existingCustomer) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const customer = await customerService.createCustomer({
            Name,
            Email,
            Password: hashedPassword,
            Address1,
            Address2,
            Address3,
            City,
            District,
            Postal_Code
        });

        res.status(201).json({ message: "Customer created successfully", customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ error: "Email and Password are required." });
        }

        const customer = await customerService.findCustomerByEmail(Email);
        if (!customer) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(Password, customer.Password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
