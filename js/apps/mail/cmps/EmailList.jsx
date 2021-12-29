
import {EmailPreview} from '../cmps/EmailPreview.jsx'

export function EmailList({mails}) {
    console.log(mails);
    if (!mails.length) return <h1> Inbox is empty... </h1>
    return (
        <section className='mails-list grid'>
            {mails.map(mail => <EmailPreview key={mail.id} mail={mail} />)}
        </section>
    )
}