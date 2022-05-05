const RestaurantDAO = require('../models/RestaurantModel');
const db = new RestaurantDAO();
const userDao = require('../models/userModel.js');

db.init();

exports.landing_page = function (req, res) {
    res.render("main/about", {
        title: "About Us"
    });
}

exports.lunch = function (req, res) {
    db.getAvailableEntries("Lunch")
        .then((list) => {
            res.render('main/lunch', {
                'title': 'Lunch',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.dinner = function (req, res) {
    db.getAvailableEntries("Dinner")
        .then((list) => {
            res.render('main/dinner', {
                'title': 'Dinner',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.loggedIn_landing = function (req, res) {
    db.getAllEntries("Lunch")
        .then((list) => {
            res.render("main/lunch", {
                title: "Lunch",
                entries: list,
                user: "user"
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.loggedIn_lunch = function (req, res) {
    db.getAllEntries("Lunch")
        .then((list) => {
            res.render("main/JGyyx5Eyj3L", {
                title: "Lunch",
                entries: list,
                user: "user"
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.loggedIn_dinner = function (req, res) {
    db.getAllEntries("Dinner")
        .then((list) => {
            res.render("main/JGyyx5Eyj3D", {
                title: "Dinner",
                entries: list,
                user: "user"
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.loggedIn_about = function (req, res) {
    res.render("main/about", {
        title: "Achilles Greek Restaurant",
        user: "user"
    });
}

exports.show_register_page = function (req, res) {
    res.render("user/register", {
        title: "Registration"
    });
}

exports.show_about_page = function (req, res) {
    res.render("main/about", {
        title: "Achilles Greek Restaurant"
    });
}

exports.show_JGyyx5Eyj3_page = function (req, res) {
    res.render("main/JGyyx5Eyj3", {
        title: "Staff Portal"
    })
}

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;

    console.log(user, password)

    if (!user || !password) {
        res.send(401, 'no user or no password');
        return;
    }
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401 + " User exists:" + user);
            res.redirect("Login")
            return;
        }
        userDao.create(user, password);
        console.log("register user", user, "password", password);
        res.redirect('/login');
    });
}

exports.show_login_page = function (req, res) {
    res.render("user/login", {
        title: "Login Page"
    });
};

exports.handle_login = function (req, res) {
    res.render("main/about", {
        title: "Achilles Greek Restaurant",
        user: "user"
    });
};

//Logout Clear Cookies
exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
}


//Page with logged-in user
exports.updated_lunch_page = function (req, res) {
    db.getAllEntries("Lunch")
        .then((list) => {
            res.render("main/JGyyx5Eyj3L", {
                title: "Lunch",
                entries: list,
                user: "user"
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
}

exports.updated_dinner_page = function (req, res) {
    db.getAllEntries("Dinner")
        .then((list) => {
            res.render("main/JGyyx5Eyj3D", {
                title: "Dinner",
                entries: list,
                user: "user"
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
}

exports.update_entry = function (req, res) {
    db.updateData(req.body.dish, req.body.description, req.body.price, req.body.contains, req.body._id, req.body.menu, req.body.availability);
    console.log(req.body.title)
    res.redirect('back');
}

exports.delete_entry = function (req, res) {
    db.deleteEntry(req.body._id);
    res.redirect('back')
}

exports.post_new_entry = function (req, res) {
    db.addEntry(req.body.dish, req.body.description, req.body.price, req.body.contains, req.body.menu, req.body.availability);
    res.redirect('back');
}

