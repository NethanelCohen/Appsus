import { emailService } from '../services/email.service.js';
import { EmailList } from '../cmps/EmailList.jsx';
import { Folders } from '../cmps/Folders.jsx';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';
import {EmailReply} from '../cmps/EmailReply.jsx'

export class EmailApp extends React.Component {
  state = {
    mails: [],
    criteria: {
      status: 'inbox',
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
    if(newStatus==='stared') this.setState((prevState) => ({ ...prevState, criteria: { ...prevState.criteria, isStared: !this.state.criteria.isStared} }), () => this.loadMails())
    else this.setState((prevState) => ({ ...prevState, criteria: { ...prevState.criteria, status: newStatus } }), () => this.loadMails())
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
  this.state.isReplyClicked ? this.setState({isReplyClicked: false}) : this.setState({isReplyClicked: true})
}


render() {
  const { mails,criteria } = this.state;
  const {isReplyClicked,setStaredStatus } = this.state;
  const loggedinUser = emailService.getUserDetails();
  return (
    <div className="email-list-container grid">
      <div className="search-filter">
        <input placeholder="Search mail" onChange={(ev) => this.handleCriteriaTxt(ev.target.value)}></input>
      </div>
      <StyledButton func={() => this.replyClicked()} txt="Compose" bgc="#03a9f4" />
      {isReplyClicked && <EmailReply loadMails={this.loadMails} loggedinUser={loggedinUser} replyClicked={this.replyClicked}/>}
      <Folders handleCriteriaStatus={this.handleCriteriaStatus } activeStatus={criteria.status} />
      <EmailList mails={mails} loadMails={this.loadMails} />
    </div>
  );
}
}
