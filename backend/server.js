const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const db = require('./db/db');

require('dotenv').config();
dotenv.config();
const app = express();


const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceHasThingsRoutes = require('./routes/serviceHasSubRoutes');
const customerRoutes = require('./routes/customerRoutes');
const quoteRoutes = require('./routes/quoteRoutes');



app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/productImages', express.static('productImages'));
app.use('/api/services', serviceRoutes);
app.use('/api/service-has-things', serviceHasThingsRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/quotes', quoteRoutes);



const PORT = process.env.PORT || 5000;
db.getConnection()
    .then(() => console.log("✅ Database Connected Successfully!"))
    .catch((err) => console.error("❌ Database Connection Failed:", err));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ${process.env.BASE_URL}`);
});