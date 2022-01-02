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
