const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

const fileUpload = require('express-fileupload');
router.use(fileUpload());

// GET /api/users/check-token
// Insert ensureLoggedIn on all routes that need protecting
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);

// Perform function
router.post('/craft', usersCtrl.craft);

// Save new files
router.post('/craft/save', usersCtrl.saveFile);

module.exports = router;