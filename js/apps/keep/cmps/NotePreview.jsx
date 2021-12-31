// import { TxtNote } from './TxtNote';
// this.props.loadNotes
// this.props.note

import { storageService } from "../services/storage.service.js";
import { noteService } from "../services/note.service.js";

export class NotePreview extends React.Component {
    
  state = {
      note: null,
      isNoteClicked: false,
      isUpdating: false
    };

  componentDidMount() {
    this.loadNote()
  }

  loadNote = (editNote) => {
    if (!editNote) {
      const { note } = this.props
      return this.setState({ note, isNoteClicked: false})
    }
    return this.setState({ editNote, isNoteClicked: true });
  }

  handleNoteClick = () => {
    const {isNoteClicked} = this.state;
    if (this.state.isUpdating === true) return
    this.setState({ isNoteClicked: true, isUpdating: true });
  }

  // handleNoteEdit = (editNote) => {
  //   this.setState({note: { ...prevState.note, editNote, isNoteClicked: true});
  //   console.log(this.state.note);
  // }

  onInputChange = ({name, value}, noteId) => {
      this.setState((prevState) => ({ note: {...prevState.note, info: {...prevState.note.info, [name]: value}}}))
  }

  handleNoteDelete = (noteId) => {
    noteService.remove(noteId).then(this.props.loadNotes())
  }

  handleNoteUpdate = (removedNote) => {
    let notes = storageService.loadFromStorage('notes_DB');
    notes = notes.filter(note => note.id !== removedNote.id)
    notes = [this.state.note, ...notes];
    storageService.saveToStorage('notes_DB', notes);
    this.props.loadNotes();
    this.setState({isNoteClicked: false});
  }

  handleCloseNote = () => {
    this.setState({isNoteClicked: false});
  }

  render() {
    const { note } = this.props;
    const { isNoteClicked } = this.state
    return (<div onClick={this.handleNoteClick} className="note flex column" style={{ cursor: 'pointer', backgroundColor: `${note.style.backgroundColor}` }}>
      {note.type === 'note-image' && <img src={note.info.url} alt="" style={{ width: '100%', height: '80%' }} />}
      {(note.type === 'note-txt' || note.type === 'note-image') && <h4>{note.info.title}</h4>}
      {note.type === 'note-txt' && <h6>{note.info.body}</h6>}
      {note.type === 'note-todos' && <h4>{note.label}</h4>}
      {note.type === 'note-todos' && note.todos.map((todo, idx) => {
        return <li key={idx}>{todo.txt}</li>
      })}
      {isNoteClicked &&
        <div className="pop-out-note" style={{ width: '50%', height: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: `${note.style.backgroundColor}` }} >
          {note.type === 'note-image' &&
            <div className="image-type-note">
              <img src={note.info.url} style={{ width: '100%', height: '80%' }} />
            </div>}
          {(note.type === 'note-txt' || note.type === 'note-image') &&
            <div className="txt-type-note">
              <input name="title" type="text" onChange={(ev) => this.onInputChange(ev.target, note.id)} value={this.state.note.info.title} style={{ border: 'none', cursor: 'text', backgroundColor: `${note.style.backgroundColor}` }} />
            </div>}
          {note.type === 'note-txt' &&
          <div className="txt-type-note">
          <input name="body" type="text" onChange={(ev) => this.onInputChange(ev.target, note.id)} value={this.state.note.info.body} style={{ border: 'none', cursor: 'text', backgroundColor: `${note.style.backgroundColor}` }} />
        </div>}
          {note.type === 'note-todos' && <h4>{note.label}</h4>}
          {note.type === 'note-todos' && note.todos.map((todo, idx) => {
            return <li key={idx}>{todo.txt}</li>
          })}
          <button onClick={() => this.handleNoteDelete(note.id)}>delete</button>
          <button onClick={() => this.handleNoteUpdate(note)}>save</button>
          <button onClick={() => this.handleCloseNote()}>close</button>

        </div>}
    </div>
    )
  }
}