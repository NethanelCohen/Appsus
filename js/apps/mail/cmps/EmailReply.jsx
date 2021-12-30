
import { storageService } from '../../../services/storage.service.js'
import { emailService } from "../services/email.service.js";

const { Link } = ReactRouterDOM;

export class EmailReply extends React.Component {
    state = {

    }

    handleChange = ({target}) => {
        const field = target.name
        console.log("field: ", field);

    }

    handleSendMail = (to, subject, body) => {
        let mails = storageService.loadFromStorage('mails_DB');
        const newMail = emailService.createMail(subject, body, to);
        console.log("newMail: ", newMail);
        this.props.replyClicked()
    }

    render() {
        const {loggedinUser} = this.props
        
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', outline: '2px solid #1a73e8', backgroundColor: 'white', fontWeight: '800', width: '1000px', height: '700px' }} className="reply-to-mail">
                <button onClick={this.props.replyClicked}>x</button>
                {/* <h4>reply to: {this.props.mail.id}</h4> */}
                <form onSubmit={() => this.handleSendMail}></form>
                <h4>New Message</h4>
                <label htmlFor="sendTo">To: </label>
                <input type='email' name='sendTo' onChange={() => this.handleChange}/>
                <label htmlFor="sendBy">From: </label>
                <input onChange={(ev) => this.handleChange} type='email' name='sendBy' placeholder={loggedinUser.email}/>
                <p style={{fontSize: '12px'}} >Created at: {new Date().toTimeString()}</p>
                <h6>Add your reply here</h6>
                <button>send</button>
            </div>
        )
    }
}


