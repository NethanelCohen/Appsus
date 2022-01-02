

export function ColorPalette({note}) {

    function setBackgroundColor({target}) {
        console.log(target);
    }

    return (
        <div className="note-color">
            <input value={#D6E5FA} style={{backgroundColor: '#D6E5FA'}} onClick={(ev) => setBackgroundColor(ev)}></input>
            <input style={{backgroundColor: '#BAABDA'}}></input>
            <input style={{backgroundColor: '#FFEDB2'}}></input>
            <input style={{backgroundColor: '#FFBF87'}}></input>
            <input style={{backgroundColor: '#B8E9C0'}}></input>
            <input style={{backgroundColor: '#EFB1FF'}}></input>
        </div>
    )
}