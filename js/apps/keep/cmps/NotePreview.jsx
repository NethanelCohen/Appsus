import { storageService } from "../../../services/storage.service.js";
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
      return this.setState({ note, isNoteClicked: false })
    }
  }

  handleNoteClick = () => {
    if (this.state.isUpdating === true) return
    this.props.handleNoteClickForInput()
    // if (this.props.isNoteClicked === true) this.setState({isNoteClicked: false, isUpdating: false })
    this.setState({ isNoteClicked: true, isUpdating: true });
  }

  onInputChange = ({ name, value }, idx) => {
    if (name === 'title' || name === 'body' || name === 'url') {
      if (value.includes('youtube')) {
        let baseUrl = 'https://www.youtube.com/embed/'
        let modified = value.substring(value.indexOf('=')+1);
        value = baseUrl + modified;
      }
      return this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, [name]: value } } }))
    }
    if (name === 'label') {
      return this.setState((prevState) => ({ note: { ...prevState.note, label: value } }));
    }
    if (name === 'todo') {
      let tempTodos = this.state.note.todos;
      tempTodos[idx].txt = value
      if (!tempTodos[idx].txt.length) {
        delete tempTodos[idx];
      } 
      this.setState({ todos: tempTodos});
    }
  }

  handleAddTodo = () => {
    let tempTodos = this.state.note.todos;
    if (tempTodos[tempTodos.length-1].txt === '') return;
    tempTodos.push({ txt: '', doneAt: null})
    this.setState({ todos: tempTodos});
  }

  handleNoteDelete = (noteId) => {
    noteService.remove(noteId).then(this.props.loadNotes())
  }

  handleNoteUpdate = (removedNote) => {
    // ev.stopPropagation()
    let notes = storageService.loadFromStorage('notes_DB');
    notes = notes.filter(note => {return note.id !== removedNote.id})
    notes = [this.state.note, ...notes];
    storageService.saveToStorage('notes_DB', notes);
    this.setState({ isNoteClicked: false, isUpdating: false });
    this.props.loadNotes();
  }

  handleCloseNote = () => {
    this.setState({ isNoteClicked: false, isUpdating: false });
  }

  handleMouse = (state) => {
    state === 'on'
      ? this.setState({ isMouseOver: true })
      : this.setState({ isMouseOver: false });
  };

  render() {
    const { note } = this.props;
    const { isNoteClicked } = this.state
    const { isMouseOver } = this.state
    return (
      <div onClick={this.handleNoteClick} className="note flex column"
      style={{ backgroundColor: `${note.style.backgroundColor}` }}
      onMouseOver={() => this.handleMouse('on')}
      onMouseLeave={() => this.handleMouse('off')}>
      {note.type === 'note-image' && <img src={note.info.url} alt="" style={{ marginBottom: '1rem', width: '100%', height: '80%' }} />}
      {note.type === 'note-video' && <iframe src={note.info.url} alt="" style={{ marginBottom: '1rem', width: '100%', height: '80%' }}></iframe>}
      {(note.type === 'note-txt' || note.type === 'note-image') && <h4 style={{ marginBottom: '1rem' }} >{note.info.title}</h4>}
      {note.type === 'note-txt' && <h6 style={{ marginBottom: '1rem' }}>{note.info.body}</h6>}
      {note.type === 'note-todos' && <h4 style={{ marginBottom: '1rem' }}>{note.label}</h4>}
      {note.type === 'note-todos' && note.todos.map((todo, idx) => {
        return <li key={idx}>{todo.txt}</li>
      })}
      {isMouseOver &&
        <div className="pop-out-btns">
          <img src="/assets/img/delete.png" alt="delete" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleNoteDelete(note.id)} />
          {/* <img src="../../../assets/img/delete.png" alt="delete" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleNoteDelete(note.id)} /> */}
        </div>}
      {isNoteClicked &&
        <div className="pop-out-note" style={{ backgroundColor: `${note.style.backgroundColor}` }} >
          
          {note.type === 'note-image' &&
            <div className="image-type-note">
              <textarea value={note.info.url} rows={3} name="url" type="text"
                style={{ width: '100%'}}
                onChange={(ev) => this.onInputChange(ev.target, note.id)}>
              </textarea>
              <img src={this.state.note.info.url} style={{ width: '100%', height: '80%'}} />
            </div>}
            {note.type === 'note-video' && 
            <div className="video-type-note">
              <iframe name='url' allowFullScreen frameBorder="0" src={this.state.note.info.url} style={{width: '100%', height: '300', margin: 'auto'}}></iframe>            
              <textarea value={note.info.url} rows={3} name="url" type="text"
                style={{ width: '100%'}}
                onChange={(ev) => this.onInputChange(ev.target, note.id)}>
              </textarea>
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
            {note.todos.map((todo, idx) => {
              return <li key={todo.id}>
                <textarea value={this.state.note.todos[idx].txt} name="todo" type="text"
                  style={{ cursor: 'text', backgroundColor: `${note.style.backgroundColor}` }}
                  onChange={(ev) => this.onInputChange(ev.target, idx)}>
                </textarea>
              </li>
            })}
            <button onClick={this.handleAddTodo}>+</button>
          </div>
          }
          <div className="pop-out-btns">
            <img src="./assets/img/delete.png" alt="delete" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleNoteDelete(note.id)} />
            {/* <img src="../../../assets/img/delete.png" alt="delete" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleNoteDelete(note.id)} /> */}
            <img src="./assets/img/diskette.png" alt="save" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleNoteUpdate(note)} />
            {/* <img src="../../../assets/img/diskette.png" alt="save" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleNoteUpdate(note)} /> */}
            <img src="./assets/img/cancel.png" alt="cancel" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleCloseNote()} />
            {/* <img src="../../../assets/img/cancel.png" alt="cancel" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleCloseNote()} /> */}
            {/* <img src="../../../assets/img/reply.png" alt="send" style={{ backgroundColor: `${note.style.backgroundColor}` }} onClick={() => this.handleComposeNote()} /> */}
          </div>
        </div>}
        </div>

        )
  }
}