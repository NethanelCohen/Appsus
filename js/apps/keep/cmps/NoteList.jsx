import { NotePreview } from './NotePreview.jsx';

export function NoteList({ notes, loadNotes, handleNoteClickForInput, isNoteClicked }) {

  if (!notes.length) return <h1 className="empty-messege-note"> There Are No Notes Go Ahead And Create One </h1>;
  return (
    <section className="notes-list">
      { notes.map((note) => (
        <NotePreview note={note} key={note.id} isNoteClicked={isNoteClicked} loadNotes={loadNotes} handleNoteClickForInput={handleNoteClickForInput} />
      ))}
    </section>
  );
}

