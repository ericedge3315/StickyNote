const express = require("express");
const app = express();
const mongoose = require('mongoose');
const NoteModel = require('./models/notes');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://StickyNote:password1234@cluster0.jsveq.mongodb.net/Stickynotes?retryWrites=true&w=majority");

app.get("/getNotes", (req, res) => {
    NoteModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
});

app.post("/delNote", async (req, res) => {
  NoteModel.find({subject: req.body.subject}, (err, result) => {
    if (err) {
      res.json(err);
      return;
    } //else {
    //   // tmp = NoteModel.countDocuments({subject: req.body.subject});
    //   NoteModel.deleteOne({subject: req.body.subject});
    //   // if (tmp != NoteModel.countDocuments({subject: "ECE124"})){
    //     //console.log(tmp);
    //     console.log("Delete Complete");
    //   //}
    //   // else{
    //   //   console.log("Delete Fail");
    //   // }
    //   res.json(result);
    // }
  });
  NoteModel.deleteOne({subject: req.body.subject}, (err, result) => {
    if (err) {
      res.json(err);
    }
  });
  NoteModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});


app.post("/createNotes", async (req, res) => {
    const note = req.body;
    const newNote = new NoteModel(note);
    await newNote.save();
  
    res.json(note);
});

// app.delete("/deleteNotes  { subject: subject }", async (req, res) => {
//   const subject = req.body.subject;
//   NoteSchema.findByIdAndRemove(subject, err => {
//     if (err) return res.send(500, err);
//   });
// });

app.listen(3001, () => {
    console.log("Server running at port 3001");
});

