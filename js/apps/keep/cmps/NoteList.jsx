import { NotePreview } from './NotePreview.jsx';


export function NoteList({ notes }) {

  // if (!notes.length) return <h1 className="empty-messege"> There Are No Notes Go Ahead And Create One </h1>;
  return (
    <section className="note-list">
      {/* { notes.map((note) => (
        <NotePreview  />
      ))} */}
    </section>
  );
}

