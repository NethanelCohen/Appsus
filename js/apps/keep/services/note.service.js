
import {storageService} from '../../../services/storage.service.js'
import { utilService } from "../../../services/util.services.js";

export const noteService = {
    createNote,

}

const KEY = 'notes_DB';


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
    }
}