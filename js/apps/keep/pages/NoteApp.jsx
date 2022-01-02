import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx'
import { TxtNote } from '../cmps/TxtNote.jsx';
import { ImgNote } from '../cmps/ImgNote.jsx';
import {TodoNote} from '../cmps/TodosNote.jsx'
import { VideoNote } from '../cmps/VideoNote.jsx';

export class NoteApp extends React.Component {
  state = {
    notes: [],
    isNoteClicked: false,
    isNoteUpdating: false,
    type: 'note-txt',
    background: '#C8E3D4'
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
    !isNoteClicked ? this.setState({ isNoteClicked: true, isNoteUpdating: true }) : this.setState({ isNoteClicked: false, isNoteUpdating: false })
    this.setState({background: '#C8E3D4'})
  }

  handleNoteBackground = (value) => {
    this.setState((prevState) => ({...prevState, background: value}));
  }

  handleNoteClickForInput = () => {
    if (this.state.isNoteClicked) this.setState({isNoteClicked: false}, this.loadNotes())
  }

  handleNoteType = ({ className }) => {
    this.setState({type: className, isNoteClicked: true});
  }

  render() {
    const { notes, type, isNoteClicked, background, isNoteUpdating} = this.state;
    if (!notes) return <h1> No notes </h1>
    return (
      <div className="note-app-container flex column">
        <div className='note-type-btn'>
        <div onClick={(ev) => this.handleNoteType(ev.target)}>
              <img
                className="note-txt"
                src="assets/img/font-solid.svg"
                // src="../../../assets/img/font-solid.svg"
                alt=""
              />
            </div>
            <div onClick={(ev) => this.handleNoteType(ev.target)}>
              <img
                className="note-image"
                src="assets/img/image-regular.svg"
                // src="../../../assets/img/image-regular.svg"
                alt=""
              />
            </div>
            <div onClick={(ev) => this.handleNoteType(ev.target)}>
              <img
                className="note-video"
                src="assets/img/youtube-brands.svg"
                // src="../../../assets/img/youtube-brands.svg"
                alt=""
              />
            </div>
            <div onClick={(ev) => this.handleNoteType(ev.target)}>
              <img
                className="note-todos"
                src="assets/img/list-solid.svg"
                // src="../../../assets/img/list-solid.svg"
                alt=""
              />
            </div>      
        </div>
        <div style={{backgroundColor: `${background}`}} className="add-note flex">
        {!isNoteClicked && <input style={{backgroundColor: `${background}`}} defaultValue={'Add new note...'} onClick={this.handleClick} />}
        {isNoteClicked &&
            <React.Fragment>
              {type === 'note-txt' && <TxtNote loadNotes={this.loadNotes} handleNoteBackground={this.handleNoteBackground} handleClick={this.handleClick} />}
              {type === 'note-image' && <ImgNote loadNotes={this.loadNotes} handleNoteBackground={this.handleNoteBackground}  handleClick={this.handleClick} />}
              {type === 'note-todos' && <TodoNote loadNotes={this.loadNotes} handleNoteBackground={this.handleNoteBackground} handleClick={this.handleClick} />}
              {type === 'note-video' && <VideoNote loadNotes={this.loadNotes} handleNoteBackground={this.handleNoteBackground} handleClick={this.handleClick} />}
            </React.Fragment>}
          </div>
        <NoteList notes={notes} isNoteClicked={isNoteClicked} loadNotes={this.loadNotes} handleNoteClickForInput={this.handleNoteClickForInput} />
      </div >
    );
  }
}
