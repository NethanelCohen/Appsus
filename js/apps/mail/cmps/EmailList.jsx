import { EmailPreview } from '../cmps/EmailPreview.jsx';

export function EmailList({ mails }) {
  console.log(mails);
  if (!mails.length) return <h1> Inbox is empty... </h1>;
  return (
    <section className="mails-list grid">
      <table>
        <thead>
          <tr>
            <th>CheckBox</th>
            <th>Star</th>
            <th>Sender</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {mails.map((mail) => <EmailPreview key={mail.id} mail={mail} />)}
         </tbody>
      </table> 
         </section>
  );
}
