const express = require('express');

const { allUsers, getUsers, addUser } = require('../controller/users.js');

const router = express.Router();

router.get('/', allUsers);
router.get('/:id', getUsers);

router.post('/addUser', addUser);
module.exports = router;