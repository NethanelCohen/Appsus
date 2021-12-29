import { emailService } from "../services/email.service.js";
import {DangerButton} from '../../../../cmps/DangerButton.jsx';

const { Link } = ReactRouterDOM;

export class EmailPreview extends React.Component {
    state = {
        isClicked: false,
    };

    extandMailView = () => {
        const { isClicked } = this.state;
        this.props.mail.isRead = true;
        !isClicked ? this.setState({ isClicked: true }) : this.setState({ isClicked: false });
    }

    replyToMail = () => {
        console.log('Reply to mail');
    }

    deleteMail = () => {
        const {mail} = this.props;
        emailService.remove(mail.id).then(this.props.loadMails);
    }

    render() {
        const { mail } = this.props;
        const { isClicked } = this.state;
        return (
            <div className="mail-preview-container flex" onClick={this.extandMailView}>
                {!isClicked && <div className="short-mail-view flex">
                    <h6>CheckBox</h6>
                    <h6>Star</h6>
                    <h6>{mail.subject}</h6>
                    <h6>{mail.body}</h6>
                    <h6>{mail.to}</h6>
                </div>}
                {isClicked && <div className="long-mail-view grid">
                    <div className="long-mail-btn flex">
                        <Link to={`/mail/${mail.id}`}><button>❏</button></Link>
                        <button onClick={this.replyToMail}>reply</button>
                        <DangerButton func={this.deleteMail} txt="Delete"/>
                    </div>
                    <h4 className="subject">{mail.subject}</h4>
                    <h6 className="to">{mail.to}</h6>
                    <h6 className="mail-body" >{mail.body}</h6>
                </div>}
            </div>
        );
    }
}
