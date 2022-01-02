
import { noteService } from '../services/note.service.js';
import { DynamicImage } from '../../../../cmps/DynamicImage.jsx';

export class ImgNote extends React.Component {

    state = {
        newNote: {
            type: 'note-image',
            info: {
                url: '',
                title: ''
            },
            style: {
                backgroundColor: '#C8E3D4'
            }
        }
    }

    handleChange = ({ name, value }) => {
        const field = name;
        if (field === 'title' || field === 'url') {
            return this.setState((prevState) => ({ newNote: { ...prevState.newNote, info: { ...prevState.newNote.info, [field]: value } } }))
        }
        // else if (field === 'backgroundColor') {
        //     this.setState((prevState) => ({ newNote: { ...prevState.newNote, style: { ...prevState.newNote.info, [field]: value } } }))
        // }
        // this.props.handleNoteBackground(value)
    }

    handleNoteAdd = (ev) => {
        ev.preventDefault();
        const { newNote } = this.state;
        noteService.createNote(newNote).then(notes => this.setState({ notes }, this.props.handleClick))
        this.props.loadNotes()
        this.props.handleNoteBackground('#C8E3D4');
    }


    render() {
        const {backgroundColor} = this.state.newNote.style
        const {url} = this.state.newNote.info;
        return (
            <div style={{ textAlign: 'start', backgroundColor: `${backgroundColor}` }} className='new-txt-note'>
                <form onSubmit={(ev) => this.handleNoteAdd(ev)}>
                    <input autoComplete="off" style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`,fontSize: '1.4rem'} } name='title' placeholder='Title' onChange={(ev) => { this.handleChange(ev.target) }} />
                    <input autoComplete="off" style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, fontSize: '.8rem'} } name='url' placeholder='Enter image url...' onChange={(ev) => { this.handleChange(ev.target) }} />
                    {url && <img src={url} style={{width: '200px', height: '200px', margin: '0 auto'}} />}
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
              src="../../../assets/img/diskette.png"
              classname=" save-note"
            />
          </button>
          <button>
          <DynamicImage
          func={this.props.handleClick}
              txt=""
              src="../../../assets/img/cancel.png"
              classname=" delete-note"
            />
          </button>
          </div>
                </form>
            </div>
        )
    }
}