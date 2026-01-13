const express = require("express");
const router = express.Router();
const { validateId } = require("../middleware/validateId");
const {
  createTicket,
  myTickets,
  allTickets,
  findTicket,
  changeStatus,
  changeSeverity,
  changeCategory,
  assignAgent,
} = require("../controllers/ticket.controllers");

const { auth } = require("../middleware/auth");

router.post("/", auth, createTicket);
router.get("/my", auth, myTickets);
router.get("/", auth, allTickets);
router.get("/:id", auth, findTicket);
router.patch("/:id/status", auth, validateId(), changeStatus);
router.patch("/:id/severity", auth, validateId(), changeSeverity);
router.patch("/:id/category", auth, validateId(), changeCategory);
router.patch("/:id/assign", auth, validateId(), assignAgent);

module.exports = router;
