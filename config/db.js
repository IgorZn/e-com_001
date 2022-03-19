const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'my-eshop'
    })


    console.log(`MongoDB connedcted: ${conn.connection.host}`)
};

module.exports = connectDB;