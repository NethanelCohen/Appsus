
export function ImgNote({ handleChange, handleNoteAdd, loadNotes, newNote, handleClick }) {

    return (
        <div style={{ textAlign: 'start' }} className='new-img-note'>
            <form onSubmit={(ev) => handleNoteAdd(ev)}>
                <input style={{ width: '100%', textAlign: 'start', cursor: 'text' }} name='title' placeholder='Title' onChange={(ev) => { handleChange(ev.target) }} />
                <input style={{ width: '100%', textAlign: 'start', cursor: 'text' }} name='body' placeholder='Keep your thoughts here' onChange={(ev) => { handleChange(ev.target) }} />
                <button>keep</button>
                <button onClick={handleClick}>✘</button>
            </form>
            <p>type: image</p>
        </div>
    )
}