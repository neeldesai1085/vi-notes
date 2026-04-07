const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.length === 0) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
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
