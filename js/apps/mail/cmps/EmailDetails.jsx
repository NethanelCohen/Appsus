import { emailService } from '../services/email.service.js';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';
// import { EmailReply } from '../cmps/EmailReply.jsx';
import { storageService } from '../../../services/storage.service.js';

const { Link } = ReactRouterDOM;

export class EmailDetails extends React.Component {
  state = {
    mail: null,
    repliedClicked: false,
    subject: '',
    body: '',
    status: '',
    to: '',
  };
  componentDidMount() {
    this.loadMail();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
      this.loadMail();
    }
  }
  handleChange = (ev) => {
    const field = ev.target.name;
    let value = ev.target.value;

    if (field === 'sendTo') {
      this.setState((prevState) => ({
        mail: { ...prevState.mail, to: value },
      }));
    } else if (field === 'subject') {
      this.setState((prevState) => ({
        mail: { ...prevState.mail, subject: value },
      }));
    } else {
      this.setState((prevState) => ({
        mail: { ...prevState.mail, body: value, status: 'sent' },
      }));
    }
  };

  handleMailWindow = (ev, submit) => {
    ev.preventDefault();
    const { subject, body, to } = this.state.mail;
    let mails = storageService.loadFromStorage('mails_DB');
    if (!submit && ev.type === 'click' && (subject || body || to)) {
      let mail = this.state.mail;
      mail.status = 'draft';
    }
    const sentMail = emailService.createMail(this.state.mail);
    storageService.saveToStorage('mails_DB', [sentMail, ...mails]);
    this.replyToMail();
  };

  loadMail = () => {
    const { mailId } = this.props.match.params;
    if (!mailId) return;
    emailService.getMailById(mailId).then((mail) => {
      if (!mail) return this.props.history.push('/');
      this.setState({ mail });
    });
  };
  loggedinUser = () => {
    const user = emailService.getUserDetails();
    console.log(user);
  };

  replyToMail = () => {
    // debugger
    console.log(this.state, this.props);
    const { repliedClicked } = this.state;
    !repliedClicked
      ? this.setState({ repliedClicked: true })
      : this.setState({ repliedClicked: false });
  };

  deleteMail = () => {
    const { mail } = this.state;
    emailService.remove(mail.id).then(this.props.history.push('/mail'));
  };

  render() {
    // const { mail } = this.state;
    // const { repliedClicked } = this.state;
    // if (!mail) return <h1>There is no mail!</h1>;
    // const date =
    //   new Date(mail.sentAt).toLocaleDateString('en-US') +
    //   ' ' +
    //   new Date(mail.sentAt).toLocaleTimeString('en-US');
    return (
      <div className="mail-details">
        <form
          className="new-mail grid"
          onSubmit={(ev) => this.handleMailWindow(ev)}>
          <h4 className="header">New Message</h4>
          <label className="send-to-headline" htmlFor="sendTo">
            To:{' '}
          </label>
          <input
            ref={this.inputRef}
            type="email"
            name="sendTo"
            onChange={this.handleChange}
            id="sendTo"
          />
          <h6>From: {() => this.loggedinUser().mail}</h6>
          <label className="subject-headline" htmlFor="subject">
            Subject:{' '}
          </label>
          <input
            className="subject-input"
            id="subject"
            type="text"
            name="subject"
            placeholder={'Enter your text here'}
            onChange={this.handleChange}
          />
          <p style={{ fontSize: '12px' }} className="created-at">
            Created at: {new Date().toTimeString()}
          </p>
          <input
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
