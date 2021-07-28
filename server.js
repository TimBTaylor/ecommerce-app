const express = require("express");
const db = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config/.env" });
db();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
