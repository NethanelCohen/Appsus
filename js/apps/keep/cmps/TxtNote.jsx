
import { noteService } from '../services/note.service.js';

export class TxtNote extends React.Component {

    state = {
        newNote: {
            type: 'note-txt',
            info: {
                title: '',
                body: ''
            },
            style: {
                backgroundColor: 'White'
            }
        }
    }

    handleChange = ({ name, value }) => {
        const field = name;
        if (field === 'title' || field === 'body') {
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
        noteService.createNoteTxt(newNote).then(notes => this.setState({ notes }, this.props.handleClick))
        this.props.loadNotes()
        this.props.handleNoteBackground('white');
    }


    render() {
        const {backgroundColor} = this.state.newNote.style
        return (
            <div style={{ textAlign: 'start', backgroundColor: `${backgroundColor}` }} className='new-txt-note'>
                <form onSubmit={(ev) => this.handleNoteAdd(ev)}>
                    <input style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, borderBottom: '1px solid white'} } name='title' placeholder='Title' onChange={(ev) => { this.handleChange(ev.target) }} />
                    <input style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`,  borderBottom: '1px solid white' }} name='body' placeholder="What's on your mind" onChange={(ev) => { this.handleChange(ev.target) }} />
                    <input type="color" name='backgroundColor' style={{width: '40px', height:'40px', borderRadius: '50%', backgroundImage: 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)'}} onChange={(ev) => { this.handleChange(ev.target) }}></input>
                    <button>keep</button>
                    <button onClick={this.props.handleClick}>✘</button>
                </form>
                <p>type: text</p>
            </div>
        )
    }
}