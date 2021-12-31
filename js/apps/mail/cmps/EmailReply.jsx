import { utilService } from '../../../services/util.services.js';
import { storageService } from '../../../services/storage.service.js';
import { emailService } from '../services/email.service.js';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';
export class EmailReply extends React.Component {
  state = {
    newMail: {
      subject: '',
      body: '',
      status: '',
      to: '',
    },
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    let value = ev.target.value;

    if (field === 'sendTo') {
      this.setState((prevState) => ({
        newMail: { ...prevState.newMail, to: value },
      }));
      //   console.log(this.state.newMail);
    } else if (field === 'subject') {
      this.setState((prevState) => ({
        newMail: { ...prevState.newMail, subject: value },
      }));
      //   console.log(this.state.newMail, value);
    } else {
      this.setState((prevState) => ({
        newMail: { ...prevState.newMail, body: value, status: 'sent' },
      }));
    }
    // console.log(ev);
  };

  handleMailWindow = (ev) => {
    ev.preventDefault();
    const { subject, body, to } = this.state.newMail;
    let mails = storageService.loadFromStorage('mails_DB');
    if (ev.type === 'click' && (subject || body || to)) {
      let mail = this.state.newMail;
      mail.status = 'draft';
    }
    const sentMail = emailService.createMail(this.state.newMail);
    storageService.saveToStorage('mails_DB', [sentMail, ...mails]);
    this.props.replyClicked();
    this.props.loadMails();
  };

  render() {
    let { loggedinUser } = this.props;
    return (
      <div className="reply-to-mail flex column">
        <StyledButton classname={' close-button'}
          func={this.handleMailWindow}
          txt="Close"
          bgc="hsl(345deg 100% 47%)"
        />
        <form
          className="new-mail grid"
          onSubmit={(ev) => this.handleMailWindow(ev)}>
          <h4 className="header">New Message</h4>
          <label className="send-to-headline" htmlFor="sendTo">
            To:{' '}
          </label>
          <input type="email" name="sendTo" className="send-to-input" onChange={this.handleChange} />
          <h6 className="from-headline">From: {loggedinUser.email}</h6>
          <label className="subject-headline" htmlFor="subject">Subject: </label>
          <input className="subject-input"
            type="text"
            name="subject"
            placeholder={'Enter your text here'}
            onChange={this.handleChange}
          />
          <p style={{ fontSize: '12px' }} className="created-at">
            Created at: {new Date().toTimeString()}
          </p>
          <input type="text" name="body" onChange={this.handleChange} className="body-input" />
          <StyledButton classname={' send-button'}
          func={this.handleMailWindow}
          txt="send"
          bgc="blue"
        />
        </form>
      </div>
    );
  }
}
