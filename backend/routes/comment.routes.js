const express = require("express");
const router = express.Router();

const { newComment } = require("../controllers/comment.controllers");
const { auth } = require("../middleware/auth");
const { validateId } = require("../middleware/validateId");

router.post("/tickets/:id/comments", auth, validateId(), newComment);

module.exports = router;
