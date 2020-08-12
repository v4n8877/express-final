const express = require("express");
const router = express.Router();

const controller = require('../controllers/auth.controller');

// params get users
router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;