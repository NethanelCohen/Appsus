import { EmailPreview } from '../cmps/EmailPreview.jsx';

export function EmailList({ mails, loadMails}) {
  console.log(mails);
  if (!mails.length) return <h1> Inbox is empty... </h1>;
  return (
    <section className="mails-list grid">
      <div className="mail-header flex">
        <h6>CheckBox</h6>
        <h6>Star</h6>
        <h6>Sender</h6>
        <h6>Subject</h6>
        <h6>Date</h6>
      </div>
      {mails.map((mail) => (
        <EmailPreview key={mail.id} mail={mail} loadMails={loadMails} />
      ))}
    </section>
  );
}
