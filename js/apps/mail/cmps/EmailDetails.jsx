
import {emailService} from '../services/email.service.js';
import {DangerButton} from '../../../../cmps/DangerButton.jsx';
import {EmailReply} from '../cmps/EmailReply.jsx'

const {Link} = ReactRouterDOM;

export class EmailDetails extends React.Component {

    state = {
        mail: null,
        repliedClicked: false
    }

    componentDidMount() {
        this.loadMail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        console.log('mailId: ', mailId);
        emailService.getMailById(mailId).then(mail => {
            if (!mail) return this.props.history.push('/')
            this.setState({ mail })
        })
    }

    replyToMail = () => {
        const {repliedClicked} = this.state;
        !repliedClicked ?  this.setState({ repliedClicked: true }) : this.setState({ repliedClicked: false })
    }

    deleteMail = () => {
        const {mail} = this.state;
        emailService.remove(mail.id).then(this.props.history.push('/mail'))
    }


    render() {
        const {mail} = this.state;
        const {repliedClicked} = this.state;
        if (!mail) return <h1>There is no mail!</h1>
        const date = new Date(mail.sentAt).toLocaleDateString("en-US") + ' ' + new Date(mail.sentAt).toLocaleTimeString("en-US");
        return (
            <section className="mail-details">
                <div className="mail-inner-btn">
                <Link to={'/mail'}><button>⏎</button></Link>
                <button onClick={this.replyToMail}>reply</button>
                <DangerButton func={this.deleteMail} txt="Delete"/>
                </div>
                <h1>{mail.subject}</h1>
                <div className="mail-description">
                <h4>{mail.to}</h4>
                <h4>{date}</h4>
                {repliedClicked && <EmailReply />}
                </div>
                <h2>{mail.body}</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo architecto consequatur cumque atque explicabo autem odio vero illum. Cumque mollitia nihil exercitationem rem magni perspiciatis nesciunt dolorum delectus qui eveniet.</p>
                {repliedClicked && <EmailReply replyToMail={this.replyToMail} mail={this.state.mail}/>}
            </section>
        )
    }
 }
