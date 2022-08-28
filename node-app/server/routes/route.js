const express = require('express');

const {
  allUsers,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  sortUserId,
  sortUserFName,
  sortUserLastName,
  rowSwapUp,
} = require('../controller/users.js');

const router = express.Router();

router.get('/', allUsers);
router.get('/:id', getUsers);
router.post('/addUser', addUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.post('/sortId', sortUserId);
//router.post('/swapUp/:id', rowSwapUp);
// router.post('/sortFName', sortUserFName);
// router.post('/sortLName', sortUserLastName);

module.exports = router;
