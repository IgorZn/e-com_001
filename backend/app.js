const express = require('express');
const app = express();
const errHandler = require("../utils/errHandlerExpress.utils");
const morgan = require('morgan');
const connectDB = require('../config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');


// Mount routes
const categories = require('../routers/categories.route');
const orders = require('../routers/orders.route');
const products = require('../routers/products.route');
const users = require('../routers/users.route');
const auth = require('../routers/auth.route');


// Body parser
app.use(express.json());



// загрузит переменные из .env
require('dotenv/config')
const path = require("path");


// Middleware
app.use(cors())
app.options('*', cors())


// Cookie parser
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}


// ENV variables
const api = process.env.API_URL
const PORT = process.env.PORT

// File upload
console.log('public >>>', path.join(__dirname, '..', 'public'))
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Mount routes
app.use(`${api}/categories`, categories);
app.use(`${api}/orders`, orders);
app.use(`${api}/products`, products);
app.use(`${api}/users`, users);
app.use(`${api}/auth`, auth);


// Connect to DB
connectDB();

// Error Handler
app.use(errHandler)

// Start server
app.listen(PORT, () => {
    console.log(api)
    console.log(`Hello! Visit me - http://localhost:${PORT}`)
})

process.on('unhandledRejection', (err, promose) => {
    console.log(`Err: ${err.message}`)
    // Exit
    server.close( () => process.exit(1))
});