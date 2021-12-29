const { Link } = ReactRouterDOM;

export function EmailPreview({ mail }) {
    // let isClicked= false;

    function handleRowClick(id){
        // <Link to={`/mail/${id}`}></Link>
        console.log(id)
    }
  return (
    <tr className="mail-preview" onClick={()=>handleRowClick(mail.id)} >
      <td>CheckBox</td>
      <td>Star</td>
      <td>{mail.subject}</td>
      <td>{mail.body}</td>
      <td>{mail.to}</td>
    </tr>
  );
}
