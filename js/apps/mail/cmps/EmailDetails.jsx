
import {emailService} from '../services/email.service.js';

// const {Link} = ReactRouterDOM;


export function EmailDetails({mail}) {

    function goBackToList() {
        this.props.history.push('/mail');
    }

    function deleteMail() {
        emailService.remove(mail.id).then(goBackToList())
    }

    return (
        <section className="mail-details">
            <button onClick={goBackToList()}>back</button>
            <h1>{mail.subject}</h1>
            <div className="mail-inner-btn">
                <button onClick={deleteMail()}>delete</button> 
            </div>
            <div className="mail-description">
            <h4>{mail.to}</h4>
            <h4>{mail.sentAt}</h4>
            </div>
            <h2>{mail.body}</h2>
        </section>
    )
 }
