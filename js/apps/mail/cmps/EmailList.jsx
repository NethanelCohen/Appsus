import { EmailPreview } from '../cmps/EmailPreview.jsx';

export function EmailList({ mails, loadMails }) {
  console.log('mails in list', mails);
  function setColorStar({ target }) {
    target.className === 'star off'
      ? (target.className = 'star on')
      : (target.className = 'star off');
  }
  if (!mails.length) return <h1 className="empty-messege"> Folder is empty... </h1>;
  return (
    <section className="mails-list grid">
      <div className="mail-header flex">
        <h6>CheckBox</h6>
        <h6 className={'star off'} onClick={(ev) => setColorStar(ev)}>
          &#9733;
        </h6>
        <h6>Subject</h6>
        <h6>Sender</h6>
        <h6>Body</h6>
        <h6>Date</h6>
      </div>
      { mails.map((mail) => (
        <EmailPreview key={mail.id} mail={mail} loadMails={loadMails} setColorStar={setColorStar} />
      ))}
    </section>
  );
}
