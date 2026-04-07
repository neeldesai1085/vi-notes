const WritingSession = require("../models/WritingSession");

async function createSessionRecord({ userId, content, typingMetadata }) {
  const session = await WritingSession.create({
    userId,
    content,
    typingMetadata: typingMetadata || {},
  });
  return session;
}

async function getSessionById(id) {
  return WritingSession.findById(id);
}

async function listSessionsForUser(userId) {
  return WritingSession.find({ userId }).sort({ createdAt: -1 });
}

async function updateSessionContent(id, content) {
  return WritingSession.findByIdAndUpdate(
    id,
    { content },
    { new: true }
  );
}

async function addPasteEvent(id, pasteEvent) {
  return WritingSession.findByIdAndUpdate(
    id,
    {
      $push: { pasteEvents: pasteEvent },
      $inc: { totalPastedChars: pasteEvent.charCount },
    },
    { new: true }
  );
}

module.exports = {
  createSessionRecord,
  getSessionById,
  listSessionsForUser,
  updateSessionContent,
  addPasteEvent,
};
