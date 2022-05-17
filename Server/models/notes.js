const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    sticky: {
        type: String,   
        required: true,
    },
});

const NoteModel = mongoose.model("notes", NoteSchema);
module.exports = NoteModel;