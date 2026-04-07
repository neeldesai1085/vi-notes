const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

const normalizeOrigin = (value) => value.replace(/\/+$/, "").trim();
const allowedOrigin = normalizeOrigin(process.env.CLIENT_URL || "");

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || !allowedOrigin) {
                return callback(null, true);
            }

            if (normalizeOrigin(origin) === allowedOrigin) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    }),
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Vi-Notes backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);

module.exports = app;
