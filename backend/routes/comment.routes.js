const express = require('express');
const router = express.Router();

const { newComment } = require('../controllers/comment.controller');
const { auth } = require('../middlewares/requireAuth');

router.post('/tickets/:id/comments', auth, validateId(), newComment);

module.exports = router;
