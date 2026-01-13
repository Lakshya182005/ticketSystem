const express = require("express");
const router = express.Router();

const {
  newCategory,
  categoryList,
  deleteCategory,
} = require("../controllers/category.controllers");
const { validateId } = require("../middleware/validateId");
const { auth } = require("../middleware/auth");

router.post("/", auth, newCategory);
router.get("/", categoryList);
router.delete("/:id", auth, validateId(), deleteCategory);

module.exports = router;
