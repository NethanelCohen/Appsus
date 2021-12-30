import { TxtNote } from './TxtNote';
// this.props.loadNotes
// this.props.note

export class NotePreview extends React.Component {
  state = {
      note: null
  };
  componentDidMount(){
    this.loadNote()
}

loadNote = () => {
    const {note} = this.props
    this.setState({note})
}


  
  
  render() {
    const {note} = this.props;
    return <div className="note flex column" style={{backgroundColor: `${note.backgroundColor}`}}>
        <h4>{note.info.title}</h4>
        <h6>{note.info.body}</h6>
    </div>;
  }
}
