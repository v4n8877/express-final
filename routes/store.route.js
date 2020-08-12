const express = require("express");
const router = express.Router();
const multer  = require('multer');

const controller = require('../controllers/store.controller');
const upload = multer({ dest: './public/uploads/' });

// params get stores
router.get('/', controller.index);

router.get('/stores/create', controller.toCreate);

router.post('/stores/create', upload.single('avatar'), controller.createStore);

module.exports = router;