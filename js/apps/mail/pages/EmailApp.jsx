import { emailService } from '../services/email.service.js';
import { EmailList } from '../cmps/EmailList.jsx';
import { Folders } from '../cmps/Folders.jsx';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';

export class EmailApp extends React.Component {
  state = {
    mails: [],
    criteria: {
      status: '',
      txt: '',
      isRead: '',
      isStared: '',
      lables: [],
    },
  };

  componentDidMount() {
    this.loadMails();
  }

  handleCriteriaStatus = (newStatus) => {
    this.setState((prevState) => ({ ...prevState, criteria: { ...prevState.criteria, status: newStatus } }), () => this.loadMails())
  }

loadMails = () => {
    emailService.query(this.state.criteria).then((mails) => {
    this.setState({ mails });
  });
};
render() {
  const { mails } = this.state;
  return (
    <div className="email-list-container grid">
      <div className="search-filter">
        <input placeholder="Search mail"></input>
      </div>
      <StyledButton func={()=>console.log('ComposeButton')} txt="Compose" bgc="blue" />
      <Folders handleCriteriaStatus={this.handleCriteriaStatus} />
      <EmailList mails={mails} loadMails={this.loadMails} />
    </div>
  );
}
}
