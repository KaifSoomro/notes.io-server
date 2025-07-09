const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    heading:{
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true
    },
    noteColor: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Notes", notesSchema);