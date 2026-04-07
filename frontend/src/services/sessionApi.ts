import api from "./api";

export type PasteLog = {
  timestamp: number;
  charCount: number;
  wordCount: number;
  lineCount: number;
  cursorStart?: number;
  cursorEnd?: number;
};

// POST /api/sessions — creates a new session
export const startSession = async (userId: string) => {
  const response = await api.post("/sessions", {
    userId,
    content: "",
    typingMetadata: {},
  });
  return response.data;
};

// GET /api/sessions/:id — fetch session by Mongoose _id
export const getSessionById = async (sessionId: string) => {
  const response = await api.get(`/sessions/${sessionId}`);
  return response.data;
};

// GET /api/sessions?userId=... — list all sessions for a user
export const listSessionsForUser = async (userId: string) => {
  const response = await api.get(`/sessions`, { params: { userId } });
  return response.data;
};

// PATCH /api/sessions/:id/text — save current editor text
export const updateSessionText = async (sessionId: string, text: string) => {
  const response = await api.patch(`/sessions/${sessionId}/text`, {
    content: text,
  });
  return response.data;
};

// POST /api/sessions/:id/paste-event — record a paste event
export const recordPasteEvent = async (
  sessionId: string,
  payload: PasteLog
) => {
  const response = await api.post(
    `/sessions/${sessionId}/paste-event`,
    payload
  );
  return response.data;
};
