const express = require('express');

const { allUsers, getUsers } = require('../controller/users.js');

const router = express.Router();

router.get('/', allUsers);

module.exports = router;