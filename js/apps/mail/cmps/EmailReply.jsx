import { utilService } from '../../../services/util.services.js';
import { storageService } from '../../../services/storage.service.js';
import {eventBusService} from '../../../event-bus.service.js'
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
  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
    this.removeEventBus = eventBusService.on('compose-note', (note) =>
    console.log(note))
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    let value = ev.target.value;

    if (field === 'sendTo') {
      this.setState((prevState) => ({
        newMail: { ...prevState.newMail, to: value },
      }));
    } else if (field === 'subject') {
      this.setState((prevState) => ({
        newMail: { ...prevState.newMail, subject: value },
      }));
    } else {
      this.setState((prevState) => ({
        newMail: { ...prevState.newMail, body: value, status: 'sent' },
      }));
    }
  };

  handleMailWindow = (ev, submit) => {
    ev.preventDefault();
    const { subject, body, to } = this.state.newMail;
    let mails = storageService.loadFromStorage('mails_DB');
    if (!submit && ev.type === 'click' && (subject || body || to)) {
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
    const today = new Date();
    const time = today.toLocaleTimeString('it-IT');

    return (
      <div className="reply-to-mail flex column">
        <form
          className="new-mail grid"
          onSubmit={(ev) => this.handleMailWindow(ev)}>
          <StyledButton
            classname={' close-button'}
            func={(ev) => {
              this.handleMailWindow(ev);
            }}
            txt="Close"
            bgc="hsl(345deg 100% 47%)"
          />
          <h4 className="header">New Message</h4>
          <label className="send-to-headline" htmlFor="sendTo">
            To:{' '}
          </label>
          <input
            autoComplete="off"
            required 
            className="send-to"
            ref={this.inputRef}
            type="email"
            name="sendTo"
            placeholder={'Enter Receiver Mail'}
            onChange={this.handleChange}
            id="sendTo"
          />
          {/* <h6>From: {loggedinUser.email}</h6> */}
          <label className="subject-headline" htmlFor="subject">
            Subject:{' '}
          </label>
          <input
            autoComplete="off"
            className="subject-input"
            id="subject"
            type="text"
            name="subject"
            placeholder={'Enter Subject'}
            onChange={this.handleChange}
          />
          <p className="created-at">Created at: {time}</p>
          <input
            autoComplete="off"
            type="text"
            name="body"
            onChange={this.handleChange}
            className="body-input"
          />
          <StyledButton
            classname={' send-button'}
            type="submit"
            func={(ev) => {
              this.handleMailWindow(ev, 'submit');
            }}
            txt="send"
            bgc="blue"
          />
        </form>
      </div>
    );
  }
}
