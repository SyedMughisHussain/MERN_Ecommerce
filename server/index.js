import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDb from "./db/connectdb.js";

import userRoutes from "./routes/user.routes.js"

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());


app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectDb()
  .then(() => {})
  .catch((err) => {
    console.log("Error: ", err);
  });
