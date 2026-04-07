const express = require("express");
const router = express.Router();

const {
  createSession,
  listSessions,
  getSession,
  updateText,
  addPaste,
} = require("../controllers/sessionController");

router.post("/", createSession);
router.get("/", listSessions);
router.get("/:id", getSession);
router.patch("/:id/text", updateText);
router.post("/:id/paste-event", addPaste);

module.exports = router;
