const express = require('express');
const router = express.Router();


const { login } = require("../controllers/auth.controllers");

const { addUser } = require("../controllers/users.controllers");


router
    .post('/login', login)
    .post('/register', addUser)


module.exports = router;