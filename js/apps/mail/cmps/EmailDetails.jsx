
import {emailService} from '../services/email.service.js';

const {Link} = ReactRouterDOM;

export class EmailDetails extends React.Component {

    state = {
        mail: null
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

    deleteMail = () => {
        const {mail} = this.state;
        emailService.remove(mail.id).then(this.props.history.push('/mail'))
    }


    render() {
        const {mail} = this.state;
        if (!mail) return <h1>There is no mail!</h1>
        return (
            <section className="mail-details">
                <div className="mail-inner-btn">
                <Link to={'/mail'}><button>⏎</button></Link>
                <button onClick={this.deleteMail}>✘</button>
                </div>
                <h1>{mail.subject}</h1>
                <div className="mail-description">
                <h4>{mail.to}</h4>
                <h4>{mail.sentAt}</h4>
                </div>
                <h2>{mail.body}</h2>
            </section>
        )
    }
 }
