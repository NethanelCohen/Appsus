
import { storageService } from '../../../services/storage.service.js'
import { utilService } from "../../../services/util.services.js";

export const noteService = {
    query,
    createNote,

}

const KEY = 'notes_DB';
const notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [{
                txt: "Driving liscence",
                doneAt: null
            },
            {
                txt: "Coding power",
                doneAt: 187111111
            }]
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    }
]

function query() {
    const notes = storageService.loadFromStorage(KEY);
    return Promise.resolve(notes);
}


function createNote(type, body, title, backgroundColor) {
    return {
        id: utilService.makeId(),
        type,
        info: {
            body,
            title,
        },
        style: {
            backgroundColor
        }
    }
}


function createNotes() {
    let notes = storageService.loadFromStorage(KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: 'note-txt',
                info: {
                    body: 'Insert note text here',
                    title: 'First note',
                },
                style: {
                    backgroundColor: '#f7d794'
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                info: {
                    body: 'Insert note text here',
                    title: 'Second note',
                },
                style: {
                    backgroundColor: '#63cdda'
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                info: {
                    body: 'Insert note text here',
                    title: 'Third note',
                },
                style: {
                    backgroundColor: '#f8a5c2'
                }
            }
        ]
        notes = notes.map(note => createNote(note.id, note.info.body, note.info.title, note.info.style))
        _saveNoteToStorage(notes);
    }
}


function _saveNoteToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}