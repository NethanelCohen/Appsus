// import no

export function NotesList() {

    if (!notes.length) return <h1 className="empty-messege"> No Notes Go Ahead And Create One... </h1>;
    return (
      <section className="notes-list grid">
        
        { notes.map((note) => (
          <EmailPreview key={note.id} note={note} />
        ))}
      </section>
    );
  }