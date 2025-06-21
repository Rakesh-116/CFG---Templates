import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { generateToken } = require("./streamChat.cjs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Sample NGO context - replace this with your actual NGO information
const ngoContext = `
You are an AI assistant specifically focused on our child care NGO's services and programs.
IMPORTANT GUIDELINES:
- Only answer questions related to our NGO, its services, and child care topics
- If a question is not related to our NGO or child care, politely redirect the conversation back to our services
- Never provide information about technical topics, programming, or subjects unrelated to child care and our NGO
- Be warm and empathetic in your responses, as you're representing a child care organization

Our NGO Information:
We are "Caring Hearts" (example name), a child care NGO dedicated to providing support and care for underprivileged children.

Our Core Services:
1. Educational Support and Scholarships
   - Academic tutoring
   - School supplies provision
   - Scholarship programs for needy students

2. Healthcare and Nutrition Programs
   - Regular health check-ups
   - Nutritious meal programs
   - Health education

3. Safe Housing and Shelter
   - Emergency shelter services
   - Foster care coordination
   - Safe housing programs

4. Counseling and Mental Health Support
   - Child psychology services
   - Trauma counseling
   - Family therapy sessions

5. Skill Development Programs
   - Life skills training
   - Creative arts programs
   - Sports and physical activities

How to Get Help:
- Contact our helpline (example: 0800-CHILD-CARE)
- Visit our centers
- Apply through our website

Remember: Keep all responses focused on these topics and politely redirect any unrelated queries back to our NGO's services.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI assistant for our child care NGO. You must follow these rules strictly:
              1. Only answer questions about our NGO and child care services
              2. For any off-topic questions (like technology, general knowledge, etc.), respond with:
                 "I am specifically trained to help with questions about our child care NGO and services. 
                 Would you like to know more about our [relevant_service] or how we can help children in need?"
              3. Always maintain a professional, caring, and helpful tone
              
              Here is the context about our NGO: ${ngoContext}`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand. I will strictly focus on providing information about our NGO's child care services and politely redirect any off-topic questions back to our core mission of helping children.",
            },
          ],
        },
      ],
    });
    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response;

    const responseText = response.candidates[0].content.parts[0].text;
    console.log("Response from Gemini:", responseText);
    res.json({ response: responseText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Stream Chat token generation endpoint
app.post("/api/stream-token", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const token = generateToken(userId);
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
