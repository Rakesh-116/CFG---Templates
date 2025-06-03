import express from "express";
import cors from "cors";
import connectDB from "./database/db.connect.js";
import routes from "./routes/routes.js";
import dotenv from "dotenv";

// Initialize app
const app = express();

// Initialize dotenv
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// Routes
app.use("/api", routes);

// Basic route
app.get("/", (req, res) => {
  res.send("Authentication API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
