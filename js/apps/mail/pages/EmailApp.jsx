import {emailService} from '../services/email.service.js'

export class EmailApp extends React.Component {

    state = {
        mails: []
    }

    componentDidMount() {
        const mails = emailService.query()
        console.log("mails: ", mails);
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