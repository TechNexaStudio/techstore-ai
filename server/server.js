const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Server health check
app.get("/", (req, res) => {
  res.json({
    message: "TechStore AI server is running",
  });
});

// Gemini AI chat
console.log("API CHAT ROUTE LOADED");
app.post("/api/chat", async (req, res) => {
  console.log("CHAT REQUEST RECEIVED:", req.body);
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    res.status(500).json({
      error: "Unable to generate AI response",
    });
  }
});

app.listen(PORT, () => {
  console.log(`TechStore AI server running on http://localhost:${PORT}`);
});