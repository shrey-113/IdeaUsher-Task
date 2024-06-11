if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const postRouter = require("./routes/postRouter");
const tagRouter = require("./routes/TagRouter");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));

app.use(cors());
app.use(morgan("dev"));

app.get("/test", async (req, res) => {
  console.log(req.body);
  console.log("Test route hit");
  res.status(200).json({ message: "Message recieved" });
});

app.use("/post", postRouter);
app.use("/tag", tagRouter);

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
