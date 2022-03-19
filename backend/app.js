const express = require('express');
const app = express();
const morgan = require('morgan');
const connectDB = require('../config/db');

const {
    addProduct,
    getProducts
} = require('../controllers/product.controllers');


// Body parser
app.use(express.json());


// загрузит переменные из .env
require('dotenv/config')


// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}


// ENV variables
const api = process.env.API_URL


// Routes
app.get(`${api}/products`, getProducts);
app.post(`${api}/products`, addProduct);


// Connect to DB
connectDB();


// Start server
app.listen(4000, () => {
    console.log(api)
    console.log('Hello from EXPRESS js, have a look: http://localhost:4000/')
})