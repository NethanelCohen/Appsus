import { emailService } from '../services/email.service.js';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';

const { Link } = ReactRouterDOM;

export class EmailPreview extends React.Component {
  state = {
    isClicked: false,
    isMouseOver: false
  };

  handleOpenMail = () => {
    const mail = this.props;
    emailService.mailIsRead(mail.id).then(this.setState({ isClicked: false }))
  }

  extandMailView = () => {
    console.log();
    const { id } = this.props.mail;
    if(!id) return
    console.log("id: ", id);
    console.log(this.props.mail.isRead);
    const { isClicked } = this.state;
    emailService.mailIsRead(id).then(!isClicked ? this.setState({ isClicked: true }) : this.setState({ isClicked: false }))
  }

  replyToMail = () => {
    console.log('Reply to mail');
  };

  deleteMail = () => {
    const { mail } = this.props;
    emailService.remove(mail.id).then(this.props.loadMails)
  }

  handleDateCheck = (timestamp) => {
    var date = new Date(timestamp).toLocaleDateString("en-US")
    if (Date.now() - timestamp < 1000 * 60 * 60 * 24) date = 'Today at ' + new Date(timestamp).toLocaleTimeString("en-US");
    else if (Date.now() - timestamp < 1000 * 60 * 60 * 24 * 2) date = 'Yesterday at ' + new Date(timestamp).toLocaleTimeString("en-US");
    return date;
  };

  handleMouse = (state) => {
    state === 'on' ? this.setState({ isMouseOver: true }) : this.setState({ isMouseOver: false });
  }

  render() {
    const { mail } = this.props;
    const { isClicked } = this.state;
    const { isMouseOver } = this.state;
    const date = this.handleDateCheck(mail.sentAt);
    const isMailRead = mail.isRead ? 'white' : 'greenyellow';
    return (
      <div
        className="mail-preview-container flex"
        onClick={this.extandMailView} onMouseOver={() => this.handleMouse('on')} onMouseLeave={() => this.handleMouse('off')}>
        {!isClicked && (
          <div style={{ backgroundColor: `${isMailRead}` }} className="short-mail-view flex">
            <h6>CheckBox</h6>
            <h6
              className={'star off'}
              onClick={(ev) => this.props.setColorStar(ev)}>
              &#9733;
            </h6>
            <h6>{mail.subject}</h6>
            <h6>{mail.to}</h6>
            <h6>{mail.body}</h6>
            {isMouseOver && <div className="hover-mail-btn flex">
              <Link to={`/mail/${mail.id}`}>
              <StyledButton func={this.handleOpenMail} txt="❏" bgc="grey" />
              </Link>
              <StyledButton func={this.replyToMail} txt="reply" bgc="green" />
              <StyledButton func={this.deleteMail} txt="Delete" bgc="hsl(345deg 100% 47%)" />
            </div>}
            <h6>{date}</h6>
          </div>
        )}
        {isClicked && <div style={{ fontSize: `${isMailRead}` }} className="long-mail-view grid">
          <div className="long-mail-btn flex">
            <Link to={`/mail/${mail.id}`}>
            <StyledButton func={this.handleOpenMail} txt="❏" bgc="grey" />
            </Link>
             <StyledButton func={this.replyToMail} txt="reply" bgc="green" />
            <StyledButton func={this.deleteMail} txt="Delete" bgc="hsl(345deg 100% 47%)"/>
          </div>
          <h4 className="subject">{mail.subject}</h4>
          <h6 className="to">{mail.to}</h6>
          <h6>{date}</h6>
          <h6 className="mail-body">{mail.body}</h6>
        </div>}
      </div>
    );
  }
}
