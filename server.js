const express = require('express');
const path = require('path');
const fs = require('fs');

const { db } = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3001;

//allows files that needs access to public, the ability to grab any file
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

//parse incoming JSON data
app.use(express.json());

function addNote(body, dbArray) {
    const entry = body;
    dbArray.push(entry);

    return entry;
}

app.get('/api/notes', (req, res) => {
    let note = db;

    console.log(note);
    res.json(note);
})

// app.post('/api/notes', (req, res) => {
//     console.log(req.body);
//     console.log(db);
//     const newEntry = addNote(req.body, db);

//     res.json(newEntry);
// })

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// })

app.listen(PORT, () => {
    console.log(`API server open on port ${PORT}`);
})