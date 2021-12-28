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

function updateNote(body, match ,notesArray) { 
    return entry;
}

app.get('/api/notes', (req, res) => {
   // console.log(notes);
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    const newEntry = addNote(req.body, notes);
    res.json(newEntry);
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