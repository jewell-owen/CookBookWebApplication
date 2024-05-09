// Author: Owen Jewell
// ISU Netid : ojewell@iastate.edu
// Date : April 15, 2024

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");
// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/listRecipes", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("recipe")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});



app.get("/:id", async (req, res) => {
  try {
    const recipeid = req.params.id;
    console.log("Recipe to find: ", recipeid);
    const query = { recipeId: recipeid }; // Update key to recipeId
    const result = await db.collection("recipe").findOne(query);
    if (!result) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addRecipe", async (req, res) => {
  try {
    await client.connect();

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Bad request: No data provided." });
    }

    const title = req.body.title;
    const existingDoc = await db
      .collection("recipe")
      .findOne({ title: title });

    if (existingDoc) {
      return res
        .status(409)
        .send({ error: "Conflict: a recipe with this title already exists" });
    }

    const newDocument = {
      recipeId: req.body.title,
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
    };

    const results = await db.collection("recipe").insertOne(newDocument);
    res.status(200).send(results);
  } catch (error) {
    console.error("Error adding new recipe:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.delete("/deleteRecipe/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await client.connect();
    console.log("Recipe to delete: ", id);

    const query = { recipeId: id }; // Update key to recipeId

    //delete
    const results = await db.collection("recipe").deleteOne(query);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("Error deleting recipe: ", error);
    res.sendStatus(500).send({ message: "Internal Server Error" });
  }
});

app.put("/updateRecipe/:id", async (req, res) => {
  const id = req.params.id;
  const query = { recipeId: id }; // Update key to recipeId
  await client.connect();
  console.log("Recipe to Update :", id);
  // Data for updating the document, typically comes from the request body
  console.log(req.body);
  const updateData = {
    $set: {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
    },
  };
  // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
  const options = {};
  const results = await db
    .collection("recipe")
    .updateOne(query, updateData, options);
  res.status(200);
  res.send(results);
});

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});