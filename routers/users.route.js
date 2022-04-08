const express = require('express');
const {
    addUser,
    getUsers,
    getUser
} = require("../controllers/users.controllers");

const { authorize } = require("../middleware/auth.middleware");
const { protect } = require("../middleware/auth.middleware");


const router = express.Router();

router.route('/')
    .get(protect, authorize('user'), getUsers)
    .post(addUser)

router.route('/:id')
    .get(protect, authorize('admin'), getUser)

module.exports = router;