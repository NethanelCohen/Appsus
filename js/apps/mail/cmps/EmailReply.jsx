import { emailService } from '../services/email.service.js';

export const EmailReply = ({ replyToMail, mail}) => {
    console.log('mail', mail);

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', outline: '2px solid #1a73e8', backgroundColor: 'white', fontWeight: '800', width: '700px', height: '300px' }} className="reply-to-mail">
            <button onClick={() => replyToMail()}>x</button>
            {/* <h4>reply to: {this.props.mail.id}</h4> */}
            <h6>Add your reply here</h6>
        </div>
    )
}


