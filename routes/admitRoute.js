const express = require('express');
// const fileUpload = require('express-fileupload');
const admitController = require('../controllers/admitController');

const router = express.Router();

// router.use(fileUpload());

// Route to create a new Admit document
router.post('/admits', admitController.createAdmit);

// Route to update an existing Admit document
router.put('/admits/:id', admitController.updateAdmit);
//get data
router.get('/admits',admitController.getAdmit);
router.get('/admits/:id',admitController.getSpecificAdmitCard);
module.exports = router;
