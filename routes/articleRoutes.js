// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Define routes
router.get('/', articleController.getArticles);
router.post('/', articleController.createArticle);

module.exports = router;
