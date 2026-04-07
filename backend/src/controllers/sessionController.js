const {
  createSessionRecord,
  getSessionById,
  listSessionsForUser,
  updateSessionContent,
  addPasteEvent,
} = require("../services/sessionService");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

const createSession = async (req, res) => {
  try {
    const { userId, content, typingMetadata } = req.body || {};

    if (!isNonEmptyString(userId)) {
      return res.status(400).json({ error: "userId is required" });
    }

    if (typeof content !== "string") {
      return res.status(400).json({ error: "content must be a string" });
    }

    if (typingMetadata !== undefined && !isPlainObject(typingMetadata)) {
      return res.status(400).json({ error: "typingMetadata must be an object" });
    }

    const saved = await createSessionRecord({
      userId: userId.trim(),
      content,
      typingMetadata: typingMetadata || {},
    });

    return res.status(201).json(saved);
  } catch (error) {
    console.error("createSession error:", error.message);
    return res.status(500).json({ error: "Server error while creating session" });
  }
};

const listSessions = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!isNonEmptyString(userId)) {
      return res.status(400).json({ error: "userId query param is required" });
    }

    const sessions = await listSessionsForUser(userId.trim());
    return res.json({ sessions });
  } catch (error) {
    console.error("listSessions error:", error.message);
    return res.status(500).json({ error: "Server error while listing sessions" });
  }
};

const getSession = async (req, res) => {
  try {
    const session = await getSessionById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.json(session);
  } catch (error) {
    console.error("getSession error:", error.message);
    return res.status(500).json({ error: "Server error while fetching session" });
  }
};

// PATCH /api/sessions/:id/text
// Body: { content: string }
const updateText = async (req, res) => {
  try {
    const { content } = req.body;

    if (typeof content !== "string") {
      return res.status(400).json({ error: "content must be a string" });
    }

    const session = await updateSessionContent(req.params.id, content);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.json(session);
  } catch (error) {
    console.error("updateText error:", error.message);
    return res.status(500).json({ error: "Server error while updating session text" });
  }
};

// POST /api/sessions/:id/paste-event
// Body: { timestamp, charCount, wordCount, lineCount, cursorStart?, cursorEnd? }
const addPaste = async (req, res) => {
  try {
    const { timestamp, charCount, wordCount, lineCount, cursorStart, cursorEnd } =
      req.body || {};

    if (
      typeof timestamp !== "number" ||
      typeof charCount !== "number" ||
      typeof wordCount !== "number" ||
      typeof lineCount !== "number"
    ) {
      return res.status(400).json({
        error: "timestamp, charCount, wordCount, and lineCount are required numbers",
      });
    }

    const session = await addPasteEvent(req.params.id, {
      timestamp,
      charCount,
      wordCount,
      lineCount,
      cursorStart,
      cursorEnd,
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.status(201).json(session);
  } catch (error) {
    console.error("addPaste error:", error.message);
    return res.status(500).json({ error: "Server error while recording paste event" });
  }
};

module.exports = {
  createSession,
  listSessions,
  getSession,
  updateText,
  addPaste,
};
