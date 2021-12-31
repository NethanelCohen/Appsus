import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx'
import { TxtNote } from '../cmps/TxtNote.jsx';
import { ImgNote } from '../cmps/ImgNote.jsx';
import { VideoNote } from '../cmps/VideoNote.jsx'
import { ListNote } from '../cmps/NoteList.jsx'



export class NoteApp extends React.Component {
  state = {
    notes: [],
    isNoteClicked: false,
    type: 'note-txt',
    background: 'white'
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

  handleNoteBackground = (value) => {
    this.setState((prevState) => ({...prevState, background: value}));
  }

  // handleChange = ({ name, value }) => {
  //   this.setState((prevState) => ({ newNote: { ...prevState.newNote, info: { ...prevState.newNote.info, [name]: value } } }))
  // }

  // handleNoteAdd = (ev) => {
  //   ev.preventDefault();
  //   const { newNote } = this.state;
  //   noteService.createNote(newNote).then(notes => this.setState({ notes }))
  // }

  // handleTypeClick = () => {
  //   this.setState({ isNoteClicked: true })
  // }

  handleNoteType = ({ className }) => {
    console.log("className: ", className);

    this.setState({type: className});
    // this.setState((prevState) => ({ newNote: { ...prevState.newNote, type: className } }));
  }


  render() {
    const { notes, type, isNoteClicked, background} = this.state;
    if (!notes) return <h1> No notes </h1>
    return (
      <div className="note-app-container flex column">
        <div style={{backgroundColor: `${background}`}} className="add-note flex">
        {!isNoteClicked && <button style={{ opacity: '1', backgroundColor: 'none', cursor: 'text', width: '100%' }} onClick={this.handleClick}></button>}
        {isNoteClicked &&
            <React.Fragment>
              {type === 'note-txt' && <TxtNote loadNotes={this.loadNotes} handleNoteBackground={this.handleNoteBackground} handleClick={this.handleClick} />}
              {type === 'note-image' && <ImgNote loadNotes={this.loadNotes} handleNoteBackground={this.handleNoteBackground}  handleClick={this.handleClick} />}
              {type === 'note-list' && <ListNote />}
              {type === 'note-video' && <VideoNote />}
            </React.Fragment>}
            <div onClick={(ev) => this.handleNoteType(ev.target)}>
              <img
                className="note-txt"
                src="../../../assets/img/font-solid.svg"
                alt=""
              />
            </div>
            <div onClick={(ev) => this.handleNoteType(ev.target)}>
              <img
                className="note-image"
                src="../../../assets/img/image-regular.svg"
                alt=""
              />
            </div>
            <div onClick={(ev) => this.handleNoteType(ev.target)}>
              <img
                className="note-video"
                src="../../../assets/img/youtube-brands.svg"
                alt=""
              />
            </div>
            <div onClick={(ev) => this.handleNoteType(ev.target)}>
              <img
                className="note-list"
                src="../../../assets/img/list-solid.svg"
                alt=""
              />
            </div>
          </div>
        <NoteList notes={notes} loadNotes={this.loadNotes} />
      </div >
    );
  }
}
