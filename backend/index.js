const express = require("express");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const port = 5050;
connectDB().then(() => {});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});