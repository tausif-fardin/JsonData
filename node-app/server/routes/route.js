const express = require('express');

const { allUsers, getUsers, addUser, updateUser, deleteUser } = require('../controller/users.js');

const router = express.Router();

router.get('/', allUsers);
router.get('/:id', getUsers);
router.post('/addUser', addUser);
router.put('/updateUser/:id', updateUser);
router.post('/deleteUser/:id', deleteUser);


module.exports = router;