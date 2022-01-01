import { EmailPreview } from '../cmps/EmailPreview.jsx';

export function EmailList({
  mails,
  loadMails,
  replyClicked,
  loggedinUser,
  isReplyClicked,
}) {
  function setColorStar({ target }) {
    target.className === 'star off'
      ? (target.className = 'star on')
      : (target.className = 'star off');
  }
  if (!mails.length)
    return <h1 className="empty-messege"> Folder is empty... </h1>;
  return (

      <table className="mails-list">
        <thead>
      <tr className="mail-header flex">
        <td><input type="checkbox" /></td>
          <td
          className= "star off"
          // onClick={(ev) => {
            // this.props.setColorStar(ev);
            // emailService.isMailStared(mail.id);
          // }}
          >
          &#9733;
        </td>
        <td>Subject</td>
        <td>Sender</td>
        <td>Body</td>
        <td>Date</td>
      </tr>
      </thead>
      <tbody>
      {mails.map((mail) => (
        <EmailPreview
          key={mail.id}
          mail={mail}
          loadMails={loadMails}
          setColorStar={setColorStar}
          isReplyClicked={isReplyClicked}
          loggedinUser={loggedinUser}
          replyClicked={replyClicked}
        />
      ))}
      </tbody>
      </table>
  );
}
