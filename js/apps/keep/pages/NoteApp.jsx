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

  handleClick = () => {
    const {isNoteClicked} = this.state;
    !isNoteClicked ? this.setState({isNoteClicked: true}) : this.setState({isNoteClicked: false})
  }

  handleNoteAdd = () => {

  }


  render() {
    const { notes } = this.state;
    const {isNoteClicked} = this.state
    if (!notes) return <h1> No notes </h1>
    return (
      <div className="note-app-container flex column">
        <div className="add-note flex">
          <button style={{opacity: '0', width: '100%'}} onClick={this.handleClick}></button>
            {isNoteClicked && <div style={{textAlign: 'start'}} className='new-note'>
            <form onSubmit={this.handleNoteAdd}>
              <input style={{width: '100%', textAlign: 'start'}} placeholder='Title'/>
              <input placeholder='Keep your thoughts here'/>
              <button>keep</button>
            </form>
            </div>}
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
