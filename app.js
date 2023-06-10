const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = process.env.DB_CONNECT;
const PORT = process.env.PORT || 3000;

const client = new MongoClient(uri);

async function run() {
  try {
    console.log("db connected");
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: "Back to the Future" };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/addToDo", (req, res) => {
  console.log(req.body);
  res.statusCode = 201;
  res.send({
    message: "Added Successfully",
  });
});

app.listen(PORT, () => console.log("Server Running"));
