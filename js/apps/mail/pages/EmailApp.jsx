import { emailService } from 'services/email.service.js';
// import { emailService } from '../services/email.service.js';
import { EmailList } from 'cmps/EmailList.jsx';
// import { EmailList } from '../cmps/EmailList.jsx';
import { Folders } from 'cmps/Folders.jsx';
// import { Folders } from '../cmps/Folders.jsx';
import { DynamicImage } from 'cmps/DynamicImage.jsx';
// import { DynamicImage } from '../../../../cmps/DynamicImage.jsx';
import {EmailReply} from 'cmps/EmailReply.jsx'
// import {EmailReply} from '../cmps/EmailReply.jsx'

export class EmailApp extends React.Component {
  state = {
    mails: [],
    criteria: {
      status: 'inbox',
      txt: '',
      isRead: '',
      lables: [],
    },
    isReplyClicked: false
  };

  componentDidMount() {
    this.loadMails();
  }

  handleCriteriaStatus = (param) => {   
      this.setState((prevState) => ({ ...prevState, criteria: { ...prevState.criteria, status: param } }), () => this.loadMails())
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
  const {isReplyClicked } = this.state;
  const loggedinUser = emailService.getUserDetails();
  return (
    <div className="email-list-container grid">
      <div className="search-filter">
        <input placeholder="Search mail" onChange={(ev) => this.handleCriteriaTxt(ev.target.value)}></input>
      </div>
      <DynamicImage func={() => this.replyClicked()} txt='Compose'  src='assets/img/compose.png' classname=" compose"/>
      {isReplyClicked && <EmailReply loadMails={this.loadMails} loggedinUser={loggedinUser} replyClicked={this.replyClicked}/>}
      <Folders handleCriteriaStatus={this.handleCriteriaStatus } activeStatus={criteria.status}  staredStatues={criteria.isStared}  />
      <EmailList mails={mails} loadMails={this.loadMails} isReplyClicked={isReplyClicked} loggedinUser={loggedinUser} replyClicked={this.replyClicked} />
    </div>
  );
}
}
