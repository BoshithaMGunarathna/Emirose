const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const db = require('./db/db');

require('dotenv').config();
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/productImages', express.static('productImages'));




const PORT = process.env.PORT || 5000;
db.getConnection()
    .then(() => console.log("✅ Database Connected Successfully!"))
    .catch((err) => console.error("❌ Database Connection Failed:", err));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ${process.env.BASE_URL}`);
});