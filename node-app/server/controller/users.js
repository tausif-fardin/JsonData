let data = [
    {
        id: 1,
        first_name: "Juanita",
        last_name: "Churchlow",
        email: "jchurchlow0@mysql.com",
        gender: "Female",

    },
    {
        id: 2,
        first_name: "Odie",
        last_name: "Gheorghie",
        email: "ogheorghie1@bing.com",
        gender: "Male"
    },
    {
        id: 3,
        first_name: "Irwin",
        last_name: "Guye",
        email: "iguye2@mac.com",
        gender: "Male"
    },
    {
        id: 4,
        first_name: "Bacy",
        last_name: "Facher",
        email: "dfacher3@ucsd.edu",
        gender: "Female"
    },
    {
        id: 5,
        first_name: "Brenn",
        last_name: "Hancill",
        email: "bhancill4@slideshare.net",
        gender: "Female"
    },
    {
        id: 6,
        first_name: "Juanita",
        last_name: "Churchlow",
        email: "jchurchlow0@mysql.com",
        gender: "Female",

    },
    {
        id: 7,
        first_name: "Odie",
        last_name: "Gheorghie",
        email: "ogheorghie1@bing.com",
        gender: "Male"
    },
    {
        id: 8,
        first_name: "Irwin",
        last_name: "Guye",
        email: "iguye2@mac.com",
        gender: "Male"
    },
    {
        id: 9,
        first_name: "Bacy",
        last_name: "Facher",
        email: "dfacher3@ucsd.edu",
        gender: "Female"
    },
    {
        id: 10,
        first_name: "Brenn",
        last_name: "Hancill",
        email: "bhancill4@slideshare.net",
        gender: "Female"
    },
]

//All users

const allUsers = (req, res, next) => {
    res.send(data);
}

//Get users by id

const getUsers = (req, res, next) => {
    const found = data.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.sendStatus(400);
    }
}

// Add user

const addUser = (req, res, next) => {
    const newUser = {
        id: req.body.id + 1,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender
    }
    data.push(newUser);
    res.send('added users');

}
module.exports = { allUsers, getUsers, addUser };