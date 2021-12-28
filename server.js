const express = require('express');
const path = require('path');
const fs = require('fs');
const { notes } = require('./data/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

//allows files that needs access to public, the ability to grab any file
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

//parse incoming JSON data
app.use(express.json());

function addNote(body, notesArray) {
    const entry = body;

    notesArray.push(entry);

    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return entry;
}

function updateNote(body, matchIndex, notesArray) { 
    const entry = body;

    notesArray[matchIndex].text = body;

    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return entry;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    };

    if (!note.text || typeof note.text !== 'string') {
        return false;
    };

    return true;
}

app.get('/api/notes', (req, res) => {
   // console.log(notes);
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    let match = false;

    for (i = 0; match !== true || i < notes.length; i++) {
        if (notes[i].title === req.body.title) {
            match = true;

            const updatedEntry = updateNote(req.body.text, i, notes);
            res.json(updatedEntry);
        }
    };

    if (!match) {
        if (!validateNote(req.body)) {
            res.status(400).send('Please fill out text areas.');
        }
        else {
            const newEntry = addNote(req.body, notes);
            res.json(newEntry);
        }  
    }
    else {
        res.end();
    }
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () => {
    console.log(`API server open on port ${PORT}`);
})