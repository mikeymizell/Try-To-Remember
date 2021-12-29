const fs = require('fs');
const path = require('path');

function addNote(body, notesArray) {
    const entry = body;

    notesArray.push(entry);

    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return entry;
}

function updateNote(body, matchIndex, notesArray) { 
    const entry = body;

    notesArray[matchIndex].text = body;

    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
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

module.exports = {
    addNote,
    updateNote,
    validateNote,
}