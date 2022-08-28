//All users
require('dotenv').config();

const mysql = require('mysql');

//Create connection

const conn = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

const allUsers = (request, response) => {
  conn.query('SELECT * FROM users', (error, result) => {
    if (error) throw error;
    response.json(result);
  });
};

//Get users by id

const getUsers = (req, res, next) => {
  const filters = req.query;
  const filteredUsers = data.filter((user) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredUsers);
};

// Add user

const addUser = (req, res) => {
  console.log(req.body);
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
  };
  let sql = 'INSERT INTO users SET ?';
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
};

//Update user

const updateUser = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError('No user id found', 404));
  }
  conn.query(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, gender = ? WHERE id=?',
    [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.gender,
      req.params.id,
    ],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: 'success',
        message: 'user updated!',
      });
    }
  );
};

//delete user
const deleteUser = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError('No user id found', 404));
  }
  conn.query(
    'DELETE FROM users WHERE id=?',
    [req.params.id],
    function (err, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: 'success',
        message: 'user deleted!',
      });
    }
  );
};

const sortUserId = (req, res, err) => {
  let order = 1;
  if (order === 1) {
    conn.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
      if (error) throw error;
      response.json(result);
    });
    order = 0;
  } else {
    conn.query('SELECT * FROM users ORDER BY id DESC', (error, result) => {
      if (error) throw error;
      response.json(result);
    });
    order = 1;
  }
};

// const rowSwapUp = (req, res, next) => {
//     console.log(req.params.id);
//     if (!req.params.id) {
//         return next(new AppError("No user id found", 404));
//     }
//     conn.query(
//         "UPDATE users t1 INNER JOIN users t2 ON(t1.id, t2.id) IN((?, ?), (?, ?) SET t1.id = t2.id, t1.first_name = t2.first_name,t1.last_name=t2.last_name, t1.email = t2.email, t1.gender = t2.gender"
//         [req.params.id, req.params.id + 1, req.params.id + 1, req.params.id],
//         function (err, data, fields) {
//             if (err) return next(new AppError(err, 500));
//             res.status(201).json({
//                 status: "success",
//                 message: "user swapped!",
//             });
//         }
//     );
// };
// const sortUserFName = (req, res, next) => {

//     if (data[0].first_name > data[1].first_name) {
//         data.sort(function (a, b) {
//             return (a.first_name < b.first_name) ? -1 : 1;
//         });
//     } else {
//         data.sort(function (a, b) {
//             return (a.first_name > b.first_name) ? -1 : 1;
//         });
//     }
// }
// const sortUserLastName = (req, res, next) => {

//     if (data[0].last_name > data[1].last_name) {
//         data.sort(function (a, b) {
//             return (a.last_name < b.last_name) ? -1 : 1;
//         });
//     } else {
//         data.sort(function (a, b) {
//             return (a.last_name > b.last_name) ? -1 : 1;
//         });
//     }
// }

module.exports = {
  allUsers,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  sortUserId,
};
