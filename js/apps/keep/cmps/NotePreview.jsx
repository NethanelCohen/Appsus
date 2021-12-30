
// this.props.loadNotes
// this.props.note

export class NotePreview extends React.Component {
  state = {
      note: null
  };
  
  
  
  render() {
    const {note} = this.props;
    console.log("note: ", note.id);

    return <div className="note flex column" style={{backgroundColor: `${note.backgroundColor}`}}>
        <h4>{note.info.title}</h4>
        <h6>{note.info.body}</h6>
    </div>;
  }
}
