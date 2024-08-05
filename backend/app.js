require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/tasksRoutes");
const connectDB = require("./db/connectDB");

const port = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/v1/tasks/", router);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening to ${port}`);
    });
  } catch (error) {
    console.log(`Server ${error}`);
  }
};

start();
