
import { noteService } from '../services/note.service.js';

export class TodoNote extends React.Component {

    state = {
        newNote: {
            type: 'note-todos',
            label: '',
            todos: [
                {
                    txt: '',
                    doneAt: null
                }
            ],
            style: {
                backgroundColor: '#C8E3D4'
            }
        }
    }

    handleAddTodo = () => {
        let { todos } = this.state.newNote;
        const todo = { txt: '', doneAt: null }
        this.setState((prevState) => ({ newNote: { ...prevState.newNote, todos: [...prevState.todos, todo] } }))
    }

    handleChange = ({ name, value }) => {
        const field = name;
        console.log("field: ", field);
        if (field === 'label') {
            return this.setState((prevState) => ({ newNote: { ...prevState.newNote, [field]: value } }))
        }
        if (field === 'txt') {
            let { todos } = this.state.newNote
            todos[todos.length - 1].txt = value;
            this.setState({ todos: todos })
        }
        else if (field === 'backgroundColor') {
            this.setState((prevState) => ({ newNote: { ...prevState.newNote, style: { ...prevState.newNote.info, [field]: value } } }))
        }
        this.props.handleNoteBackground(value)
    }

    handleNoteAdd = (ev) => {
        ev.preventDefault();
        const { newNote } = this.state;
        noteService.createNote(newNote).then(notes => this.setState({ notes }, this.props.handleClick))
        this.props.loadNotes()
        this.props.handleNoteBackground('#C8E3D4');
    }


    render() {
        const { backgroundColor } = this.state.newNote.style
        const { todos } = this.state.newNote;
        return (
            <div style={{ textAlign: 'start', backgroundColor: `${backgroundColor}` }} className='new-txt-note'>
                <form onSubmit={(ev) => this.handleNoteAdd(ev)}>
                    <input autocomplete="off" style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, fontSize: '1.4rem' }} name='label' placeholder="Todo's label..." onChange={(ev) => { this.handleChange(ev.target) }} />
                    <ul>
                        {todos.map((todo, idx) => (
                            <li key={idx}>
                            <textarea autocomplete="off" placeholder='todo?' rows={2} name="txt" type="text"
                                style={{ width: '100%', textAlign: 'start', cursor: 'text', fontSize: '.8rem', backgroundColor: `${backgroundColor}`, listStyleType: 'square' }}
                                onChange={(ev) => { this.handleChange(ev.target) }}>
                            </textarea>
                                    </li>
                        ))}
                    </ul>
                    <button>save</button>
                </form>
                <input type="color" name='backgroundColor' style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundImage: 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)' }} onChange={(ev) => { this.handleChange(ev.target) }}></input>
                <button onClick={this.handleAddTodo}>add</button>
                <button onClick={this.props.handleClick}>✘</button>
            </div>
        )
    }
}

{/* <li key={idx}> */ }
{/* <input autocomplete="off"
                            style={{textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, listStyleType: 'square'}} name='txt' placeholder='todo' onChange={(ev) => { this.handleChange(ev.target) }} />
                            </li> */}