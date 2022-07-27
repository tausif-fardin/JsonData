const express = require('express');

const { allUsers, getUsers, addUser, updateUser, deleteUser, sortUserId, sortUserFName } = require('../controller/users.js');

const router = express.Router();

router.get('/', allUsers);
router.get('/:id', getUsers);
router.post('/addUser', addUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.post('/sortId', sortUserId);
router.post('/sortFName', sortUserFName);



module.exports = router;