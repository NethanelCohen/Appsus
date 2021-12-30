
export function TxtNote ({note}){

        
    return(
        <div className="note flex column" style={{backgroundColor: `${note.backgroundColor}`}}>
        <h4>{note.info.title}</h4>
        <h6>{note.info.body}</h6>
    </div>
    )
}