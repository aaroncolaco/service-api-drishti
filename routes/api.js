'use strict';

const express = require('express');
const multer  = require('multer');
const path = require('path');
const router = express.Router();

const imageController = require('../controllers/imageController')
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

/* All these routes start with `/api` */

router.get('/', function(req, res) {
  res.send('API route for drishti');
});

router.post('/v2/first-level', upload.single('photo'), imageController.firstLevelInfo);


module.exports = router;
