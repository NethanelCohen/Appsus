import { noteService } from '../services/note.service.js';
import { DynamicImage } from '../../../../cmps/DynamicImage.jsx';

export class TxtNote extends React.Component {
  state = {
    newNote: {
      type: 'note-txt',
      info: {
        title: '',
        body: '',
      },
      style: {
        backgroundColor: '#C8E3D4',
      },
    },
  };

  handleChange = ({ name, value }) => {
    const field = name;
    if (field === 'title' || field === 'body') {
      return this.setState((prevState) => ({
        newNote: {
          ...prevState.newNote,
          info: { ...prevState.newNote.info, [field]: value },
        },
      }));
    } else if (field === 'backgroundColor') {
      this.setState((prevState) => ({
        newNote: {
          ...prevState.newNote,
          style: { ...prevState.newNote.info, [field]: value },
        },
      }));
    }
    this.props.handleNoteBackground(value);
  };

  handleNoteAdd = (ev) => {
    ev.preventDefault();
    const { newNote } = this.state;
    if (!newNote.info.title || !newNote.info.body) {
      this.props.loadNotes();
      return this.props.handleClick();
    }
    noteService.createNote(newNote)
      .then((notes) => this.setState({ notes }, this.props.handleClick));
    this.props.loadNotes();
    this.props.handleNoteBackground('#C8E3D4');
  };

  render() {
    return (
      <div style={{ textAlign: 'start' }} className="new-txt-note">
        <form onSubmit={(ev) => this.handleNoteAdd(ev)}>
          <textarea
            autoComplete="off"
            placeholder="Title?"
            rows={3}
            name="title"
            type="text"
            style={{
              paddingTop: '1.6rem',
              textAlign: 'start',
              cursor: 'text',
              fontSize: '1.4rem',
            }}
            onChange={(ev) => {
              this.handleChange(ev.target);
            }}></textarea>
          <textarea
            autoComplete="off"
            placeholder="What's on your mind"
            rows={4}
            name="body"
            type="text"
            style={{
              width: '100%',
              textAlign: 'start',
              cursor: 'text',
              fontSize: '.8rem',
            }}
            onChange={(ev) => {
              this.handleChange(ev.target);
            }}></textarea>
            <div className="flex note-buttons ">
          <input className="color-input"
            type="color"
            name="backgroundColor"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundImage:
                'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)',
            }}
            onChange={(ev) => {
              this.handleChange(ev.target);
            }}></input>
          <button> <DynamicImage
              txt=""
              src="./assets/img/diskette.png"
              // src="../../../assets/img/diskette.png"
              classname=" save-note"
            />
          </button>
          <button onClick={this.props.handleClick}>
          <DynamicImage
              txt=""
              src="./assets/img/cancel.png"
              // src="../../../assets/img/cancel.png"
              classname=" delete-note"
            />
          </button>
          </div>
        </form>
      </div>
    );
  }
}
