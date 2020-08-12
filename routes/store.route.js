const express = require("express");
const router = express.Router();
const multer  = require('multer');

const controller = require('../controllers/store.controller');
const upload = multer({ dest: './public/uploads/' });

// params get stores
router.get('/', controller.index);

router.get('/create', controller.toCreate);

router.post('/create', upload.single('avatar'), controller.createStore);

router.get('/:storeId/add-items', controller.toAddItems)

router.post('/:storeId/add-items', controller.postAddItems)

router.get('/:storeId/books', controller.listBooks)

module.exports = router;