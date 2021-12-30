import { utilService } from '../../../services/util.services.js';
import { storageService } from '../../../services/storage.service.js'
import { emailService } from "../services/email.service.js";

export class EmailReply extends React.Component {
    state = {
        newMail: {
            subject: '',
            body: '',
            status: 'sent',
            to: ''
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        let value = ev.target.value
        
        if (field === 'sendTo') {
            this.setState((prevState) => ({newMail: { ...prevState.newMail, to: value} }))
            console.log(this.state.newMail);
        }
        else if (field === 'subject') {
            this.setState((prevState) => ({newMail: { ...prevState.newMail, subject: value} }))
            console.log(this.state.newMail);
        }
        else {
            this.setState((prevState) => ({newMail: { ...prevState.newMail, body: value} }))
            console.log(this.state.newMail);
        }
    }

    handleSendMail = (ev) => {
        ev.preventDefault()
        let mails = storageService.loadFromStorage('mails_DB');
        const {subject, body, to, status} = this.state.newMail;
        const sentMail = emailService.createMail(subject, body, to, status);
        console.log("sentMail: ", sentMail);
        // this.props.history.push('/mail')
        // mails = [sentMail, ...mails]
        // storageService.saveToStorage(mails);
        // this.props.loadMails
        // this.props.replyClicked()
        
    }

    render() {
        let { loggedinUser } = this.props

        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', outline: '2px solid black', backgroundColor: '#f1ecec', fontWeight: '800', width: '1000px', height: '700px' }} className="reply-to-mail">
                <button onClick={this.props.replyClicked}>x</button>
                <form onSubmit={(ev) => this.handleSendMail(ev)}>
                <h4>New Message</h4>
                <label htmlFor="sendTo">To: </label>
                <input type='email' name='sendTo' onChange={this.handleChange} />
                <h6>From: {loggedinUser.email}</h6>
                <label htmlFor="subject">Subject: </label>
                <input type='text' name='subject' placeholder={'Enter your text here'} onChange={this.handleChange} />
                <p style={{ fontSize: '12px' }} >Created at: {new Date().toTimeString()}</p>
                <input style={{width: '90%', height: '400px', outline: '1px solid black', backgroundColor: 'white', fontSize: '14px', textAlign: 'left'}} type="text" name='body' onChange={this.handleChange} />
                <button>send</button>
                </form>
            </div>
        )
    }
}


