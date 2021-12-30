import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx';

export class NoteApp extends React.Component {
  state = {
    notes: [],
    isNoteClicked: false
  };


  componentDidMount() {
    this.loadNotes()
  }

  loadNotes = () => {
    noteService.query().then(notes => {
      this.setState({notes})
    });
  }


  render() {
    const { notes } = this.state;
    console.log("notes: ", notes);
    if (!notes) return <h1> No notes </h1>
    return (
      <div className="note-app-container flex column">
        <div className="add-note flex">
          <input placeholder="What's on your mind..."></input>
          <div onClick={()=>console.log('txt Note')}>
            <img
              className="img-note-txt"
              src="../../../assets/img/font-solid.svg"
              alt=""
            />
          </div>
          <div onClick={()=>console.log('image Note')}>
            <img
              className="img-note-image"
              src="../../../assets/img/image-regular.svg"
              alt=""
            />
          </div>
          <div onClick={()=>console.log('video Note')}>
            <img
              className="img-note-video"
              src="../../../assets/img/youtube-brands.svg"
              alt=""
            />
          </div>
          <div onClick={()=>console.log('list Note')}>
            <img
              className="img-note-list"
              src="../../../assets/img/list-solid.svg"
              alt=""
            />
          </div >
        </div>
        <NoteList notes={notes} loadNotes={this.loadNotes}/>
      </div>
    );
  }
}
