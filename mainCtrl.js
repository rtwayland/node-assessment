const users = require('./users.json');

module.exports = {
    get(req, res) {
        var filteredArray;
        // console.log(req.params.privilege);
        // console.log(isNaN(req.params.privilege));
        // var filteredArray = [];
        // if (req.query.age) {
        //   for (var i = 0; i < users.length; i++) {
        //     if (users[i].age == req.query.age) {
        //       filteredArray.push(users[i]);
        //     }
        //   }
        //     // filteredArray = users.filter((value) => value.age == req.query.age);
        // } else if (req.query.language) {
        //   for (var i = 0; i < users.length; i++) {
        //     if (users[i].language.toLowerCase() == req.query.language.toLowerCase()) {
        //       filteredArray.push(users[i]);
        //     }
        //   }
        //     // filteredArray = users.filter((value) => value.language == req.query.language.toLowerCase());
        // } else if (req.query.city) {
        //   for (var i = 0; i < users.length; i++) {
        //     if (users[i].city.toLowerCase() == req.query.city.toLowerCase()) {
        //       filteredArray.push(users[i]);
        //     }
        //   }
        // } else if (req.query.state) {
        //   for (var i = 0; i < users.length; i++) {
        //     if (users[i].state.toLowerCase() == req.query.state.toLowerCase()) {
        //       filteredArray.push(users[i]);
        //     }
        //   }
        //     // filteredArray = users.filter((value) => value.state.toLowerCase() == req.query.state.toLowerCase());
        // } else if (req.query.gender) {
        //   for (var i = 0; i < users.length; i++) {
        //     if (users[i].gender.toLowerCase() == req.query.gender.toLowerCase()) {
        //       filteredArray.push(users[i]);
        //     }
        //   }
        //     // filteredArray = users.filter((value) => value.gender.toLowerCase() == req.query.gender.toLowerCase());
        // } else if (req.params.filter && isNaN(req.params.filter)) {
        //   for (var i = 0; i < users.length; i++) {
        //     if (users[i].type.toLowerCase() == req.params.filter.toLowerCase()) {
        //       filteredArray.push(users[i]);
        //     }
        //   }
        //     // filteredArray = users.filter((value) => value.type == req.params.filter);
        // } else if (req.params.filter && !isNaN(req.params.filter)) {
        //   for (var i = 0; i < users.length; i++) {
        //     if (users[i].id == req.params.filter) {
        //       filteredArray.push(users[i]);
        //     }
        //   }
        //     // filteredArray = users.filter((value) => value.id == req.params.filter);
        // } else {
        //     filteredArray = users;
        // }

        if (req.query.age) {
            filteredArray = users.filter((value) => value.age == req.query.age);
        } else if (req.query.language) {
            filteredArray = users.filter((value) => value.language == req.query.language.toLowerCase());
        } else if (req.query.city) {
            filteredArray = users.filter((value) => value.city.toLowerCase() == req.query.city.toLowerCase());
        } else if (req.query.state) {
            filteredArray = users.filter((value) => value.state.toLowerCase() == req.query.state.toLowerCase());
        } else if (req.query.gender) {
            filteredArray = users.filter((value) => value.gender.toLowerCase() == req.query.gender.toLowerCase());
        } else if (req.params.filter && isNaN(req.params.filter)) {
            filteredArray = users.filter((value) => value.type == req.params.filter);
        } else if (req.params.filter && !isNaN(req.params.filter)) {
            filteredArray = users.filter((value) => value.id == req.params.filter);
        } else {
            filteredArray = users;
        }

        if (req.params.filter && !isNaN(req.params.filter) && filteredArray.length <= 0) {
          res.status(404).send('User not found');
        } else {
          res.status(200).json(filteredArray);
        }
    },
    add(req, res) {
        var newId = users.slice(-1)[0].id + 1;
        var type = req.params.privilege ? req.params.privilege : req.body.type;
        // console.log(req.body.favorites);
        let user = {
            "id": newId,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "gender": req.body.gender,
            "language": req.body.language,
            "age": req.body.age,
            "city": req.body.city,
            "state": req.body.state,
            "type": type,
            "favorites": [req.body.favorites]
        }

        users.push(user);
        res.status(200).json(user);
    },
    edit(req, res) {
        var user;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                users[i].language = req.body.language;
                user = users[i];
                break;
            }
        }

        res.status(200).json(user);
    },
    addForum(req, res) {
        var user;
        var forum = req.body.add;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                users[i].favorites.push(forum);
                user = users[i];
                break;
            }
        }
        res.status(200).json(user);
    },
    delete(req, res) {
        var forum = req.query.favorite;
        // console.log('Forum to add: ');
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                for (var j = 0; j < users[i].favorites.length; j++) {
                    if (users[i].favorites[j] === forum) {
                        users[i].favorites.splice(j, 1);
                        break;
                    }
                }
                user = users[i];
                break;
            }
        }
        res.status(200).json(user);
    },
    deleteUser(req, res) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                users.splice(i, 1);
                break;
            }
        }
        res.status(200).json(users);
    },
    editUser(req, res) {
        var user;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                for (var key in users[i]) {
                    switch (key) {
                        case "first_name":
                            users[i][key] = req.body.first_name;
                            break;
                        case "last_name":
                            users[i][key] = req.body.last_name;
                            break;
                        case "email":
                            users[i][key] = req.body.email;
                            break;
                        case "gender":
                            users[i][key] = req.body.gender;
                            break;
                        case "language":
                            users[i][key] = req.body.language;
                            break;
                        case "age":
                            users[i][key] = req.body.age;
                            break;
                        case "city":
                            users[i][key] = req.body.city;
                            break;
                        case "state":
                            users[i][key] = req.body.state;
                            break;
                        case "type":
                            users[i][key] = req.body.type;
                            break;
                        case "favorites":
                            users[i][key] = req.body.favorites;
                            break;
                        default:
                            break;
                    }
                }
                user = users[i];
                break;
            }
        }
        res.status(200).json(user);
    }
}
