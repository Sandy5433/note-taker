const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { parse } = require("path");
const uniqid = require("uniqid");

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
    const parsedData = JSON.parse(data); //converts data from string to array
    res.json(parsedData);
  });
});

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    const newNote = req.body;

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        console.log(data);
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        newNote.id=uniqid();
        parsedData.push(newNote);       

        fs.writeFile("./db/db.json", JSON.stringify(parsedData), () => {
            console.log("Added new note successfully!")
            res.json(parsedData);   
        })
      });
})

app.delete("/api/notes/:id", (req,res) => {
  fs.readFile("./db/db.json", "utf-8", (err, notes) => {
    const deleteId = req.params.id;
    const parsedNotes = JSON.parse(notes)
    const deleteObj = parsedNotes.findIndex(object => {
      return object.id === deleteId;
    });
    parsedNotes.splice(deleteObj, 1);
    console.log(notes);

    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), () => {
      console.log("note deleted!")
      res.json("parsedNotes");
    })
  
  }); 
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.listen(3001, () => {
  console.log("Server is now online!");
});