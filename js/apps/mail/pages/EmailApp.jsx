import { emailService } from '../services/email.service.js';
import { EmailList } from '../cmps/EmailList.jsx';
import { Folders } from '../cmps/Folders.jsx';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';
import {EmailReply} from '../cmps/EmailReply.jsx'

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
    isReplyClicked: false
  };

  componentDidMount() {
    this.loadMails();
  }

  handleCriteriaStatus = (newStatus) => {
    this.setState((prevState) => ({ ...prevState, criteria: { ...prevState.criteria, status: newStatus } }), () => this.loadMails())
  }

  handleCriteriaTxt = (newTxt) => {
    this.setState((prevState) => ({ ...prevState, criteria: { ...prevState.criteria, txt: newTxt} }), () => this.loadMails())
  }

loadMails = () => {
    emailService.query(this.state.criteria).then((mails) => {
    this.setState({ mails });
  });
};

replyClicked = () => {
  console.log('Reply clicked');
  this.setState({isReplyClicked: true});
}


render() {
  const { mails } = this.state;
  const {isReplyClicked} = this.state;
  const loggedinUser = emailService.getUserDetails();
  console.log("loggedinUser: ", loggedinUser);
  return (
    <div className="email-list-container grid">
      <div className="search-filter">
        <input placeholder="Search mail" onChange={(ev) => this.handleCriteriaTxt(ev.target.value)}></input>
      </div>
      <StyledButton func={() => this.replyClicked()} txt="Compose" bgc="#03a9f4" />
      {isReplyClicked && <EmailReply loggedinUser={loggedinUser}/>}
      <Folders handleCriteriaStatus={this.handleCriteriaStatus} />
      <EmailList mails={mails} loadMails={this.loadMails} />
    </div>
  );
}
}
