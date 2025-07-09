const express = require("express");
const { addNote , updateNote, getAllNotes, getSingleNote, deleteNote } = require("../controllers/notesControllers.js");

const router = express.Router();

router.post("/add-note", addNote);
router.put("/update-note/:updateId", updateNote);
router.post("/get-all-notes", getAllNotes)
router.get("/get-single-note/:singleId", getSingleNote)
router.delete("/delete-note/:deleteId", deleteNote)

module.exports = router;