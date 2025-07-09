const notesSchema = require("../models/noteSchema.js");

const addNote = async (req, res) => {
    try {

        console.log(req.body)

        const notesData = new notesSchema(req.body);

        if(!notesData){
           return res.status(404).json({message:"notes data not found."});
        }

        const savedNotes = await notesData.save();
        res.status(200).json({message:"Notes data created successfully.",savedNotes});
    } catch (error) {
        res.status(500).json({message:"Note didn't added due to some errors"});
    }
};


const updateNote = async( req, res ) => {
    try {
        const { updateId } = req.params;
        console.log(updateId)
        const existingNote = await notesSchema.findById(updateId);

        console.log(existingNote)
        if(!existingNote) return res.status(404).json({message:"Note not found"});

        const updatedNote = await notesSchema.findByIdAndUpdate(updateId, req.body, {new:true});
        console.log(updatedNote)
        if(!updatedNote) return res.status(500).json({
            message:"Can't update note."
        });

        res.status(200).json({
            message:"Note updated successfully.",
            updatedNote
        })
    } catch (error) {
        res.status(500).json({message:"Note didn't updated due to some errors"});
    }
}

const getAllNotes = async( req, res ) => {
    try {

        const { userEmail } = req.body;
        const allNotes = await notesSchema.find({ userEmail });

        if(!userEmail) return res.status(404).json({
            message:"User not found"
        })

        if(!allNotes) return res.status(404).json({
            message:"All notes not found"
        })

        res.status(200).json({
            message:"Founded all notes successfully.",
            allNotes
        })
    } catch (error) {
        return res.status(500).json({
            message:"Cannot get all notes.",
            error
        })
    }
}

const getSingleNote = async( req, res ) => {
    try {
        const { singleId } = req.params;
        const singleNote = await notesSchema.findById(singleId);

        if(!singleNote) return res.status(404).json({
            message:"Single note not found."
        })

        res.status(200).json({
            message:"Single note found successfully.",
            singleNote
        })

    } catch (error) {
        return res.status(500).json({
            message:"Cannot get single note.",
            error
        })
    }
}

const deleteNote = async( req, res ) => {
    try {
        const { deleteId } = req.params;
        const noteDeleted = await notesSchema.findByIdAndDelete(deleteId);

        if(!noteDeleted) return res.status(404).json({
            message:"Note not found to be deleted."
        })

        res.status(200).json({
            message:"Note deleted successfully",
            noteDeleted
        })

    } catch (error) {
        return res.status(500).json({
            message:"Cloudn't delete note some error occured.",
            error
        })
    }
}


module.exports = {
    addNote,
    updateNote,
    getAllNotes,
    getSingleNote,
    deleteNote
};