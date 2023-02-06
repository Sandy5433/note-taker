const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { parse } = require("path");

// middleware
app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.listen(3001, () => {
  console.log("Server is now online!");
});