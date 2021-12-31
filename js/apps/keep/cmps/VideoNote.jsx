import ReactPlayer from 'react-player/youtube'
import { noteService } from '../services/note.service.js';

export class VideoNote extends React.Component {

    state = {
        newNote: {
            type: 'note-video',
            info: {
                youtubeId: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                title: ''
            },
            style: {
                backgroundColor: 'White'
            },
        }
    }

    handleChange = ({ name, value }) => {
        const field = name;
        console.log("field: ", field);
        if (field === 'title' || field === 'youtubeId') {
            return this.setState((prevState) => ({ newNote: { ...prevState.newNote, info: { ...prevState.newNote.info, [field]: value } } }))
        }
        else if (field === 'backgroundColor') {
            this.setState((prevState) => ({ newNote: { ...prevState.newNote, style: { ...prevState.newNote.info, [field]: value } } }))
        }
        this.props.handleNoteBackground(value)
    }

    handleNoteAdd = (ev) => {
        ev.preventDefault();
        const { newNote } = this.state;
        console.log("newNote: ", newNote);
        // noteService.createNote(newNote).then(notes => this.setState({ notes }, this.props.handleClick))
        // this.props.loadNotes()
        // this.props.handleNoteBackground('white');
    }



    render() {
        const {youtubeId} = this.state.newNote.info
        const {backgroundColor} = this.state.newNote.style
        return (

            <div style={{ textAlign: 'start', backgroundColor: `${backgroundColor}` }} className='new-txt-note'>
                <form onSubmit={(ev) => this.handleNoteAdd(ev)}>
                    <input style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, borderBottom: '1px solid white'} } name='title' placeholder='Title' onChange={(ev) => { this.handleChange(ev.target) }} />
                    <input style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, borderBottom: '1px solid white' }} name='url' placeholder='Enter image url...' onChange={(ev) => { this.handleChange(ev.target) }} />
                    <ReactPlayer url={youtubeId} controls={true} />
                    <input type="color" name='backgroundColor' style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundImage: 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)' }} onChange={(ev) => { this.handleChange(ev.target) }}></input>
                    <button>keep</button>
                </form>
                    <button onClick={this.props.handleClick}>✘</button>
                <p>type: video</p>
            </div>
        )
    }
}