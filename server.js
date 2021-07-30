require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Connected to database"));

app.use(
  cors({
    origin: "*",
    methods: ["GET, POST, DELETE, PATCH"],
  })
);

app.use(express.json());

app.use("/auth", authRouter);

app.get("/hello", (req, res) => {
  res.send("HELLO");
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
