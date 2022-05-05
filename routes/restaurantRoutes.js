const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')
const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantControllers.js');

router.get("/", controller.landing_page);
router.post("/", controller.update_entry);

router.get('/lunch', controller.lunch);
router.get('/dinner', controller.dinner);

router.get('/update', controller.updated_dinner_page);
router.get('/update', controller.updated_lunch_page);
router.post('/update', controller.update_entry);

router.get('/delete', controller.updated_dinner_page);
router.get('/delete', controller.updated_lunch_page);
router.post('/delete', controller.delete_entry);

router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get('/about', controller.show_about_page);

router.get('/JGyyx5Eyj3', controller.show_JGyyx5Eyj3_page);

router.get('/login', controller.show_login_page);
router.post('/login', login, controller.handle_login);

//authenticated pages
router.get("/loggedIn",verify, controller.loggedIn_landing);
router.get("/JGyyx5Eyj3L", verify, controller.loggedIn_lunch);
router.get("/JGyyx5Eyj3D", verify, controller.loggedIn_dinner);
router.get("/JGyyx5Eyj3A", verify, controller.loggedIn_about);

router.get("/logout",verify, controller.logout);

//router.get('/guestbook', controller.entries_list);
//router.get('/new', controller.new_entry);
//router.get('/new', controller.new_entries);
/* router.get('/new', verify, controller.show_new_entries); */
router.post('/new', verify, controller.post_new_entry);

/* router.get('/posts/:author', controller.show_user_entries); */


//router.get('/peter', controller.peters_entries);
router.use(function(req, res) {
    res.status(401);
    res.type('text/plain');
    res.send('401 User already registered');
})

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

/* router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
 */


module.exports = router;