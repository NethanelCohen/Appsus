import {eMailService} from '../services/email.service'

export class EmailApp extends React.Component {

    state = {
        mails: []
    }

    componentDidMount() {
        const mails = eMailService.query()
        
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