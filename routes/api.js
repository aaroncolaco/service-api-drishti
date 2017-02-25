'use strict';

const express = require('express');
const multer  = require('multer');
const path = require('path');
const router = express.Router();

const imageController = require('../controllers/imageController')
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

router.get('/', function(req, res) {
  res.send('API route for drishti');
});

router.post('/face-id', upload.single('file'), imageController.getPeopleInImage);

router.post('/upload', upload.single('file'), imageController.firstLevelInfo);


module.exports = router;
