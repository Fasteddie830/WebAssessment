const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')
const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantControllers.js');

/* Landing */

router.get("/", controller.landing_page);
router.post("/", controller.update_entry);

/* Normal Views */

router.get('/lunch', controller.lunch);
router.get('/dinner', controller.dinner);
router.get('/contact', controller.show_contact_page);
router.get('/about', controller.show_about_page);

/* register routes */

router.get('/JGyyx5Eyj3Re', controller.show_register_page);
router.post('/register', controller.post_new_user);

/* login routes */

router.get('/JGyyx5Eyj3Ln', controller.show_login_page);
router.post('/Login', login, controller.handle_login);

/* staff portal */

router.get('/JGyyx5Eyj3', controller.show_JGyyx5Eyj3_page);

//authenticated pages

router.get("/loggedIn",verify, controller.loggedIn_landing);
router.get("/JGyyx5Eyj3L", verify, controller.loggedIn_lunch);
router.get("/JGyyx5Eyj3D", verify, controller.loggedIn_dinner);
router.get("/JGyyx5Eyj3A", verify, controller.loggedIn_about);

/* logout route */

router.get("/logout",verify, controller.logout);

/* new entry route */
router.post('/new', verify, controller.post_new_entry);

/* update entry routes */

router.get('/JGyyx5Eyj3D', verify, controller.updated_dinner_page);
router.get('/JGyyx5Eyj3L', verify, controller.updated_lunch_page);
router.post('/update', verify, controller.update_entry);

/* delete entry routes */

router.get('/delete', verify, controller.updated_dinner_page);
router.get('/delete', verify, controller.updated_lunch_page);
router.post('/delete', verify, controller.delete_entry);

/* error handling routes */
/* 
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

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
 */
module.exports = router;