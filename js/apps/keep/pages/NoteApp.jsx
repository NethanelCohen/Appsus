import { NoteList } from '../cmps/NoteList.jsx';

export class NoteApp extends React.Component {
  state = {
    notes: [],
    isNoteClicked: false
  };


  // componentDidMount() {
  //   this.loadNotes()
  // }

  // loadNotes = () => {

  // }


  render() {
    const { notes } = this.state;
    return (
      <div className="note-app-container flex column">
        <div className="add-note flex">
          <input placeholder="What's on your mind..."></input>
          <div>
            <img
              className="img-note-font"
              src="../../../assets/img/font-solid.svg"
              alt=""
            />
          </div>
          <div>
            <img
              className="img-note-image"
              src="../../../assets/img/image-regular.svg"
              alt=""
            />
          </div>
          <div>
            <img
              className="img-note-youtube"
              src="../../../assets/img/youtube-brands.svg"
              alt=""
            />
          </div>
          <div>
            <img
              className="img-note-list"
              src="../../../assets/img/list-solid.svg"
              alt=""
            />
          </div>
        </div>

        <NoteList notes={notes} />
      </div>
    );
  }
}
