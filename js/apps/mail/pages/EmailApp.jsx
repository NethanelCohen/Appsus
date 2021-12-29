import { emailService } from '../services/email.service.js';
import { EmailList } from '../cmps/EmailList.jsx';
import { Folders } from '../cmps/Folders.jsx';

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

  loadMails = () => {
    const mails = emailService.query(this.state.criteria).then((mails) => {
      this.setState({ mails });
    });
  };
  render() {
    const { mails } = this.state;
    if (!mails.length) return <h1>The inbox is empty</h1>;
    return (
      <div className="email-list-container grid">
        <div className="search-filter">
          <input placeholder="Search mail"></input>
        </div>
        <Folders />
        <EmailList mails={mails} loadMails={this.loadMails} />
      </div>
    );
  }
}
