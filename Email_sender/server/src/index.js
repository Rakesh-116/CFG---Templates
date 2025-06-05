const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const senderMailRoute = require("./routes/sendEmail.routes.js");

// Load environment variables
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use("/api/v1/", senderMailRoute);

app.listen(port, () => {
  console.log(`App is listening at port no.: ${port}`);
});
