// import { TxtNote } from './TxtNote';
// this.props.loadNotes
// this.props.note

export class NotePreview extends React.Component {
  state = {
    note: null
  };

  componentDidMount() {
    this.loadNote()
  }

  loadNote = () => {
    const { note } = this.props
    this.setState({ note })
  }

  render() {
    const { note } = this.props;
    return <div className="note flex column" style={{ backgroundColor: `${note.style.backgroundColor}` }}>
      {note.type === 'note-image' && <img src={note.info.url} alt="" style={{width: '100%', height: '80%'}} />}
      {(note.type === 'note-txt' || note.type === 'note-image') && <h4>{note.info.title}</h4>}
      {note.type === 'note-txt' && <h6>{note.info.body}</h6>}
      {note.type === 'note-todos' && <h4>{note.label}</h4>}
      {note.type === 'note-todos' && note.todos.map((todo, idx) => {
        return <li key={idx}>{todo.txt}</li>
      })}
    </div>
  }
}