import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Basic routes for Glitch demo
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running on Glitch!" });
});

app.get("/api/artists", (req, res) => {
  res.json([]);
});

app.get("/api/notifications", (req, res) => {
  res.json([]);
});

app.get("/api/auth/user", (req, res) => {
  res.status(401).json({ message: "Configure database first" });
});

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create HTTP server
const server = createServer(app);

// WebSocket setup
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  
  ws.on("message", (message) => {
    console.log("Received:", message.toString());
  });
  
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Visit: https://your-project.glitch.me`);
});