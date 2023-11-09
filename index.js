import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Allow custom origins
app.use(
  cors({
    origin: "http://localhost:5555",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/books", booksRoute);

app.get("/", (request, response) => {
  // console.log(request);
  return response.status(234).send("Welcome to this MERN project");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log("Server is running!!! at port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
