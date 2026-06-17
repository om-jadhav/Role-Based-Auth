require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});