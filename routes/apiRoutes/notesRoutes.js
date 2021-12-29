const { notes } = require('../../data/db.json');
const router = require("express").Router();
const { addNote, updateNote, validateNote } = require('../../lib/notes');

router.get('/api/notes', (req, res) => {
    console.log('here');
    res.json(notes);
})

router.post('/api/notes', (req, res) => {
    let match = false;
    let entry = req.body
    let i = 0;

    notes.forEach(noteData => {
        if (noteData.title === entry.title) {
            match = true;

            entry = req.body.text;

            const updatedEntry = updateNote(entry, i, notes);
            res.json(updatedEntry);
        }
        i++;
    })

    if (!match) {
        if (!validateNote(entry)) {
            res.status(400).send('Please fill out text areas.');
        }
        else {
            const newEntry = addNote(entry, notes);
            res.json(newEntry);
        }  
    }
    else {
        res.end();
    };
})

module.exports = router;