const express = require("express");
const router = express.Router();
const { validateId } = require("../middleware/validateId");

const { usersList, updateRole } = require("../controllers/user.controllers");

const { auth } = require("../middleware/auth");

router.get("/", auth, usersList);
router.patch("/:id/role", auth, validateId(), updateRole);

module.exports = router;
