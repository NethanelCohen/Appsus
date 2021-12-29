import { emailService } from "../services/email.service.js"

export class EmailApp extends React.Component {

    state = {
        mails: []
    }

    componentDidMount() {
        emailService.query()
            .then(mails => this.setState({ watchers: mails }))
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