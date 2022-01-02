import { noteService } from '../services/note.service.js';
import { DynamicImage } from '../../../../cmps/DynamicImage.jsx';

export class TodoNote extends React.Component {
  state = {
    newNote: {
      type: 'note-todos',
      label: '',
      todos: [
        {
          txt: '',
          doneAt: null,
        },
      ],
      style: {
        backgroundColor: '#C8E3D4',
      },
    },
  };

  handleAddTodo = () => {
    const todo = { txt: '', doneAt: null };
    this.setState((prevState) => ({
      newNote: { ...prevState.newNote, todos: [...prevState.todos, todo] },
    }));
  };

  handleChange = ({ name, value }) => {
    const field = name;
    if (field === 'label') {
      return this.setState((prevState) => ({
        newNote: { ...prevState.newNote, [field]: value },
      }));
    }
    if (field === 'txt') {
      let { todos } = this.state.newNote;
      todos[todos.length - 1].txt = value;
      this.setState({ todos: todos });
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
    noteService
      .createNote(newNote)
      .then((notes) => this.setState({ notes }, this.props.handleClick));
    this.props.loadNotes();
    this.props.handleNoteBackground('#C8E3D4');
  };

  render() {
    const { backgroundColor } = this.state.newNote.style;
    const { todos } = this.state.newNote;
    return (
      <div
        style={{ textAlign: 'start', backgroundColor: `${backgroundColor}` }}
        className="new-txt-note">
        <form onSubmit={(ev) => this.handleNoteAdd(ev)}>
          <input
            autoComplete="off"
            style={{
              width: '100%',
              textAlign: 'start',
              cursor: 'text',
              backgroundColor: `${backgroundColor}`,
              fontSize: '1.4rem',
            }}
            name="label"
            placeholder="Todo's label..."
            onChange={(ev) => {
              this.handleChange(ev.target);
            }}
          />
          <ul>
            {todos.map((todo, idx) => (
              <li key={idx}>
                <textarea
                  autoComplete="off"
                  placeholder="todo?"
                  rows={2}
                  name="txt"
                  type="text"
                  style={{
                    width: '100%',
                    textAlign: 'start',
                    cursor: 'text',
                    fontSize: '.8rem',
                    backgroundColor: `${backgroundColor}`,
                    listStyleType: 'square',
                  }}
                  onChange={(ev) => {
                    this.handleChange(ev.target);
                  }}></textarea>
              </li>
            ))}
          </ul>
          <button className="save-note-todo">
            {' '}
            <DynamicImage
              txt=""
              src="../../../assets/img/diskette.png"
              classname=" save-note"
            />
          </button>
        </form>
        <div className="flex note-buttons ">
          <input
            className="color-input"
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
          <button className="add-note-button" onClick={this.handleAddTodo}>
            {' '}
            <DynamicImage
              txt=""
              src="../../../assets/img/checklist.png"
              classname=" add-note-img"
            />
          </button>
          <button onClick={this.props.handleClick}>
            <DynamicImage
              txt=""
              src="../../../assets/img/cancel.png"
              classname=" delete-note"
            />
          </button>
        </div>
      </div>
    );
  }
}

{
  /* <li key={idx}> */
}
{
  /* <input autocomplete="off"
                            style={{textAlign: 'start', cursor: 'text', backgroundColor: `${backgroundColor}`, listStyleType: 'square'}} name='txt' placeholder='todo' onChange={(ev) => { this.handleChange(ev.target) }} />
                            </li> */
}
