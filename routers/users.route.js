const express = require('express');
const {
    addUser,
    getUsers
} = require("../controllers/users.controllers");


const router = express.Router();

router.route('/')
    .get(addUser)
    .post(getUsers)


module.exports = router;