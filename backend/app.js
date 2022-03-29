const express = require('express');
const app = express();
const morgan = require('morgan');
const connectDB = require('../config/db');
const cors = require('cors');


// Mount routes
const categories = require('../routers/categories.route');
const orders = require('../routers/orders.route');
const products = require('../routers/products.route');
const users = require('../routers/users.route');


// Body parser
app.use(express.json());


// загрузит переменные из .env
require('dotenv/config')


// Middleware
app.use(cors())
app.options('*', cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}


// ENV variables
const api = process.env.API_URL
const PORT = process.env.PORT


// Mount routes
app.use(`${api}/categories`, categories);
app.use(`${api}/orders`, orders);
app.use(`${api}/products`, products);
app.use(`${api}/users`, users);


// Connect to DB
connectDB();


// Start server
app.listen(PORT, () => {
    console.log(api)
    console.log(`Hello! Visit me - http://localhost:${PORT}`)
})