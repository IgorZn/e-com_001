const express = require('express');
const {
    addUser,
    getUsers,
    getUser
} = require("../controllers/users.controllers");


const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(addUser)

router.route('/:id')
    .get(getUser)

module.exports = router;