import {mailService} from '../services/mail.service.js'

export class MailApp extends React.Component {

    state = {
        mails: []
    }

    componentDidMount() {
        const mails = mailService.query()
        
    }

    // loadMails = () => {
    //     emailService.query().then(mails => {
    //         this.setState({mails})
    //     })
    // }


    render() {
        return (
            <h1>Starting project</h1>
        )
    }
}