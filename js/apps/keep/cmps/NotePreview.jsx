import { storageService } from "../services/storage.service.js";
import { noteService } from "../services/note.service.js";

export class NotePreview extends React.Component {
    
  state = {
      note: null,
      isNoteClicked: false,
      isUpdating: false,
      isMouseOver: false
    };

  componentDidMount() {
    this.loadNote()
  }

  loadNote = (editNote) => {
    if (!editNote) {
      const { note } = this.props
      return this.setState({ note, isNoteClicked: false})
    }
    // return this.setState({ editNote, isNoteClicked: true });
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
    console.log("name: ", name);
    console.log("value: ", value);
    if (name === 'title' || name === 'body' || name === 'url') {
      return this.setState((prevState) => ({ note: {...prevState.note, info: {...prevState.note.info, [name]: value}}}))
    } 
    if (name === 'label') {
      return this.setState((prevState) => ({ note: {...prevState.note, label: value }}));
    }
    // if (name === 'todo') {
    //   return this.setState((prevState) => ({ note: {...prevState.note, todos: {...prevState.note.todos, [name]: value }}}));
    // } 
  }

  handleNoteDelete = (noteId) => {
    noteService.remove(noteId).then(this.props.loadNotes())
  }

  handleNoteUpdate = (removedNote) => {
    let notes = storageService.loadFromStorage('notes_DB');
    notes = notes.filter(note => note.id !== removedNote.id)
    notes = [this.state.note, ...notes];
    storageService.saveToStorage('notes_DB', notes);
    this.setState({isNoteClicked: false, isUpdating: false});
    this.props.loadNotes();
  }

  handleCloseNote = () => {
    this.setState({isNoteClicked: false, isUpdating: false});
  }

  handleMouse = (state) => {
    state === 'on'
      ? this.setState({ isMouseOver: true })
      : this.setState({ isMouseOver: false });
  };

  render() {
    const { note } = this.props;
    const { isNoteClicked } = this.state
    const {isMouseOver} = this.state
    return (<div onClick={this.handleNoteClick} className="note flex column" 
    style={{backgroundColor: `${note.style.backgroundColor}` }}
    onMouseOver={() => this.handleMouse('on')}
        onMouseLeave={() => this.handleMouse('off')}>
      {note.type === 'note-image' && <img src={note.info.url} alt="" style={{width: '100%', height: '80%' }} />}
      {(note.type === 'note-txt' || note.type === 'note-image') && <h4>{note.info.title}</h4>}
      {note.type === 'note-txt' && <h6>{note.info.body}</h6>}
      {note.type === 'note-todos' && <h4>{note.label}</h4>}
      {note.type === 'note-todos' && note.todos.map((todo, idx) => {
        return <li key={idx}>{todo.txt}</li>
      })}
      
      {isMouseOver && 
        <div className="pop-out-btns flex-end">
        <img src="../../../assets/img/delete.png" alt="delete" style={{backgroundColor: `${note.style.backgroundColor}`}} onClick={() => this.handleNoteDelete(note.id)} />
        <img src="../../../assets/img/diskette.png" alt="save" style={{backgroundColor: `${note.style.backgroundColor}`}} onClick={() => this.handleNoteUpdate(note)} />
        <img src="../../../assets/img/cancel.png" alt="save" style={{backgroundColor: `${note.style.backgroundColor}`}} onClick={() => this.handleCloseNote()} />
      </div>
      }
      {isNoteClicked &&
        <div className="pop-out-note" style={{ backgroundColor: `${note.style.backgroundColor}` }} >
          {note.type === 'note-image' &&
            <div className="image-type-note">
              <input name='url' type="text" onChange={(ev) => this.onInputChange(ev.target, note.id)} value={note.info.url} />
              <img src={note.info.url} style={{ width: '100%', height: '80%' }} />
            </div>}
          {(note.type === 'note-txt' || note.type === 'note-image') &&
            <div className="txt-title-type-note">
              <textarea value={this.state.note.info.title} rows={3} name="title" type="text"
              style={{ cursor: 'text', backgroundColor: `${note.style.backgroundColor}` }} 
              onChange={(ev) => this.onInputChange(ev.target, note.id)}>
                </textarea>
            </div>}
          {note.type === 'note-txt' &&
          <div className="txt-body-type-note">
            <textarea value={this.state.note.info.body} rows={8} name="body" type="text"
              style={{ cursor: 'text', backgroundColor: `${note.style.backgroundColor}` }} 
              onChange={(ev) => this.onInputChange(ev.target, note.id)}>
                </textarea>
        </div>}
          {note.type === 'note-todos' && 
          <div className="todo-label-note">
            <textarea value={this.state.note.label} rows={2} name="label" type="text"
              style={{ cursor: 'text', backgroundColor: `${note.style.backgroundColor}` }} 
              onChange={(ev) => this.onInputChange(ev.target, note.id)}>
                </textarea>
        </div>}
          {note.type === 'note-todos' && 
          <div className="todo-li-note">
            <textarea value={this.state.note.todos.txt} rows={2} name="label" type="text"
              style={{ cursor: 'text', backgroundColor: `${note.style.backgroundColor}` }} 
              onChange={(ev) => this.onInputChange(ev.target, note.id)}>
                </textarea>
        </div>}
          {/* {note.todos.map((todo, idx) => {
            return <li key={idx}>{todo.txt}</li>
          })} */}
          <div className="pop-out-btns">
            <img src="../../../assets/img/delete.png" alt="delete" style={{backgroundColor: `${note.style.backgroundColor}`}} onClick={() => this.handleNoteDelete(note.id)} />
            <img src="../../../assets/img/diskette.png" alt="save" style={{backgroundColor: `${note.style.backgroundColor}`}} onClick={() => this.handleNoteUpdate(note)} />
            <img src="../../../assets/img/cancel.png" alt="save" style={{backgroundColor: `${note.style.backgroundColor}`}} onClick={() => this.handleCloseNote()} />
          </div>
        </div>}
    </div>
    )
  }
}