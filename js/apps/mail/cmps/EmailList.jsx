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
    <section className="mails-list grid">
      <div className="mail-header flex">
        <input type="checkbox" />
        <h6
          className= "star off"
          // onClick={(ev) => {
            // this.props.setColorStar(ev);
            // emailService.isMailStared(mail.id);
          // }}
          >
          &#9733;
        </h6>
        <h6>Subject</h6>
        <h6>Sender</h6>
        <h6>Body</h6>
        <h6>Date</h6>
      </div>
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
    </section>
  );
}
