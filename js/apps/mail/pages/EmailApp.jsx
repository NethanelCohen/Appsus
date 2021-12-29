import {emailService} from '../services/email.service.js';
import {EmailList} from '../cmps/EmailList.jsx'

export class EmailApp extends React.Component {

    state = {
        mails: []
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const mails = emailService.query().then(mails => {
            this.setState({mails})
        })
    }

    render() {
        const {mails} = this.state;
        if (!mails.length) return <h1>The inbox is empty</h1>
        console.log("mails: ", mails);
        return (
            <section>
                <EmailList mails={mails} />
            </section>
        )
    }
}