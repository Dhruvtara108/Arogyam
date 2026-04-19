// server/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy users array
let users = [
  { email: "test@example.com", password: "123456", username: "Test User" },
  { email: "john@example.com", password: "password", username: "John Doe" }
];

// Routes

// Signup
app.post("/signup", (req, res) => {
  const { email, password, username } = req.body;

  // Check if email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Add new user
  users.push({ email, password, username });
  res.status(200).json({ message: "Signup successful", username });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return res.status(200).json({ message: "Login successful", username: user.username });
  } else {
    return res.status(401).json({ message: "Login failed" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
