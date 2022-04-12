const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')
const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbookControllers.js');

router.get("/", controller.landing_page);

router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);

router.get('/login', controller.show_login_page);
router.post('/login', login, controller.handle_login);

router.get("/logout",verify, controller.logout);

router.get('/guestbook', controller.entries_list);
//router.get('/new', controller.new_entry);
//router.get('/new', controller.new_entries);
router.get('/new', verify, controller.show_new_entries);
router.post('/new', controller.post_new_entry);

router.get('/posts/:author', controller.show_user_entries);

router.get('/about', function(req, res) {
    res.redirect('/about.html');
})

//router.get('/peter', controller.peters_entries);
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



module.exports = router;