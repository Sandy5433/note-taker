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

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const parsedData = JSON.parse(data);
    // console.log(parsedData);
    res.json(parsedData);
  });
});


app.post("/api/notes", (req, res) => {
    console.log(req.body)

    const newNote = req.body;

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const parsedData = JSON.parse(data);

        parsedData.push(newNote);

        console.log(parsedData);

        fs.writeFile("./db/db.json", JSON.stringify(parsedData), () => {
            console.log("Added new note successfully!")
            res.json(parsedData);
            
        })

      });
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.listen(3001, () => {
  console.log("Server is now online!");
});