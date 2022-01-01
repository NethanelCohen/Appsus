
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
                backgroundColor: 'White'
            }
        }
    }

    handleAddTodo = () => {
        let {todos} = this.state.newNote;
        // todos.push({txt: '', doneAt: null});
        const todo = {txt: '', doneAt: null}
        this.setState((prevState) => ({ newNote: { ...prevState.newNote, todos: [...prevState.todos, todo ] }}))
    }

    handleChange = ({ name, value }) => {
        const field = name;
        console.log("field: ", field);
        if (field === 'label') {
            return this.setState((prevState) => ({ newNote: { ...prevState.newNote, [field]: value } } ))
        }
        if (field === 'txt') {
            let {todos} = this.state.newNote
            todos[todos.length-1].txt = value; 
            this.setState({todos: todos})
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
        this.props.handleNoteBackground('white');
    }


    render() {
        const {backgroundColor} = this.state.newNote.style
        const {todos} = this.state.newNote;
        return (
            <div style={{ textAlign: 'start', backgroundColor: `${backgroundColor}` }} className='new-txt-note'>
                <form onSubmit={(ev) => this.handleNoteAdd(ev)}>
                    <input style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, borderBottom: '1px solid white'} } name='label' placeholder="Todo's label..." onChange={(ev) => { this.handleChange(ev.target) }} />
                    <ul>
                        {todos.map((todo, idx) => (
                            <li key={idx}>
                            <input style={{ width: '100%', textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, listStyleType: 'space-counter'}} name='txt' placeholder='todo' onChange={(ev) => { this.handleChange(ev.target) }} />
                            </li>
                        ))}
                    </ul>
                    <input type="color" name='backgroundColor' style={{width: '40px', height:'40px', borderRadius: '50%', backgroundImage: 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)'}} onChange={(ev) => { this.handleChange(ev.target) }}></input>
                    <button>keep</button>
                </form>
                    <button onClick={this.props.handleClick}>✘</button>
                    <button onClick={this.handleAddTodo}>add</button>
                <p>type: todos</p>
            </div>
        )
    }
}