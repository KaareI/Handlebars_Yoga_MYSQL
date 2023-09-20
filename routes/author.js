const express = require('express');

const router = express.Router();

const authorController = require('../controllers/author');
router.get('/:idx', authorController.getArticleByAuthor);

module.exports = router;