import { storageService } from '../../../services/storage.service.js';
import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx'

export class NoteApp extends React.Component {
  state = {
    notes: [],
    isNoteClicked: false,
    newNote: {
      type: 'note-txt',
      info: {
        title: '',
        body: ''
      }
    }
  };


  componentDidMount() {
    this.loadNotes()
  }

  loadNotes = () => {
    noteService.query().then(notes => {
      this.setState({ notes })
    });
  }

  handleClick = () => {
    const { isNoteClicked } = this.state;
    !isNoteClicked ? this.setState({ isNoteClicked: true }) : this.setState({ isNoteClicked: false })
  }

  handleChange = ({name, value}) => {
    this.setState((prevState) => ({ newNote: { ...prevState.newNote, info: { ...prevState.newNote.info, [name]: value } } }))
  }

  handleNoteAdd = (ev) => {
    ev.preventDefault();
    const { newNote } = this.state;
    noteService.createNote(newNote).then(notes => this.setState({notes}))
  }


  render() {
    const { notes } = this.state;
    const { isNoteClicked } = this.state
    if (!notes) return <h1> No notes </h1>
    return (
      <div className="note-app-container flex column">
        <div className="add-note flex">
          {!isNoteClicked && <button style={{ opacity: '0', width: '100%' }} onClick={this.handleClick}></button>}
          {isNoteClicked && <div style={{ textAlign: 'start' }} className='new-note'>
            <form onSubmit={(ev) => this.handleNoteAdd(ev)}>
              <input style={{ width: '100%', textAlign: 'start' }} name='title' placeholder='Title' onChange={(ev) => { this.handleChange(ev.target) }} />
              <input style={{ width: '100%', textAlign: 'start' }} name='body' placeholder='Keep your thoughts here' onChange={(ev) => { this.handleChange(ev.target) }} />
              <button>keep</button>
              <button onClick={this.handleClick}>✘</button>
            </form>
          </div>}
          <div onClick={() => console.log('txt Note')}>
            <img
              className="img-note-txt"
              src="../../../assets/img/font-solid.svg"
              alt=""
            />
          </div>
          <div onClick={() => console.log('image Note')}>
            <img
              className="img-note-image"
              src="../../../assets/img/image-regular.svg"
              alt=""
            />
          </div>
          <div onClick={() => console.log('video Note')}>
            <img
              className="img-note-video"
              src="../../../assets/img/youtube-brands.svg"
              alt=""
            />
          </div>
          <div onClick={() => console.log('list Note')}>
            <img
              className="img-note-list"
              src="../../../assets/img/list-solid.svg"
              alt=""
            />
          </div >
        </div>
        <NoteList notes={notes} loadNotes={this.loadNotes} />
      </div>
    );
  }
}
