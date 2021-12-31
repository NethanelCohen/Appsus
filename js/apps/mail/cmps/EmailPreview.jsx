import { emailService } from '../services/email.service.js';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';
import { utilService } from '../../../services/util.services.js';

const { Link } = ReactRouterDOM;

export class EmailPreview extends React.Component {
  state = {
    isClicked: false,
    isMouseOver: false,
  };

  handleOpenMail = () => {
    const mail = this.props;
    emailService
      .isMailRead(mail.id, true)
      .then(this.setState({ isClicked: false }));
  };

  extandMailView = (e) => {
    const { id } = this.props.mail;
    const { isClicked } = this.state;
    if (e.target.className.includes('star')) {
      return;
    } else if (e.target.innerText === 'unread') return;
    else if (e.target.type === 'checkbox') return;

    if (!id) return;

    emailService
      .isMailRead(id, true)
      .then(
        !isClicked
          ? this.setState({ isClicked: true }, this.props.loadMails)
          : this.setState({ isClicked: false }, this.props.loadMails)
      );
  };

  handleUnreadClick = () => {
    const { id } = this.props.mail;
    emailService.isMailRead(id, false).then(this.props.loadMails);
    if ((this.state.isClicked = true)) this.setState({ isClicked: false });
  };

  replyToMail = () => {
    console.log('Reply to mail');
  };

  deleteMail = () => {
    const { mail } = this.props;
    emailService.remove(mail.id).then(this.props.loadMails);
  };

  handleMouse = (state) => {
    state === 'on'
      ? this.setState({ isMouseOver: true })
      : this.setState({ isMouseOver: false });
  };

  render() {
    const { mail } = this.props;
    let { to } = mail;
    const { isClicked } = this.state;
    const { isMouseOver } = this.state;
    const date = utilService.handleDateCheck(mail.sentAt);
    const isMailRead = mail.isRead ? 'white' : '#f18d8bf2';
    return (
      <div
        className="mail-preview-container flex"
        onClick={this.extandMailView}
        onMouseOver={() => this.handleMouse('on')}
        onMouseLeave={() => this.handleMouse('off')}>
        {!isClicked && (
          <div
            style={{ backgroundColor: `${isMailRead}` }}
            className="short-mail-view flex">
            <input type="checkbox" />
            <h6
              className={mail.isStared === true ? 'star on' : 'star off'}
              onClick={(ev) => {
                this.props.setColorStar(ev);
                emailService.isMailStared(mail.id);
              }}>
              &#9733;
            </h6>
            <h6>{mail.subject}</h6>
            <h6>{mail.to}</h6>
            <h6>{mail.body}</h6>
             {/* loggedinUser={loggedinUser} replyClicked={this.replyClicked} */}
            {isMouseOver && (
              <div className="hover-mail-btn flex">
                <Link to={{pathname:`/mail/${mail.id}`}}>
                  <StyledButton func={this.handleOpenMail} txt="❏" bgc="grey" classname="" />
                </Link>
                <StyledButton classname=""
                  func={this.handleUnreadClick}
                  txt="unread"
                  bgc="#8cd5ee"
                />
                {!this.props.isReplyClicked && (
                  <StyledButton 
                  func={() => this.props.replyClicked()}
                  classname=""
                    txt="reply"
                    bgc="green"
                    loadMails={this.props.loadMails}
                    loggedinUser={this.props.loggedinUser}
                    replyClicked={this.props.replyClicked}
                  />
                )}
                <StyledButton classname=""
                  func={this.deleteMail}
                  txt="Delete"
                  bgc="hsl(345deg 100% 47%)"
                />
              </div>
            )}
            <h6>{date}</h6>
          </div>
        )}
        {isClicked && (
          <div
            style={{ backgroundColor: `${isMailRead}` }}
            className="long-mail-view grid">
            <div className="long-mail-btn flex">
              <Link to={`/mail/${mail.id}`}>
                <StyledButton func={this.handleOpenMail} txt="❏" bgc="grey" classname="" />
              </Link>
              <StyledButton classname=""
                func={this.handleUnreadClick}
                txt="unread"
                bgc="#8cd5ee"
              />
              {!this.props.isReplyClicked && (
                  <StyledButton 
                  func={() => this.props.replyClicked()}
                  classname=""
                    txt="reply"
                    bgc="green"
                    loadMails={this.props.loadMails}
                    loggedinUser={this.props.loggedinUser}
                    replyClicked={this.props.replyClicked}
                  />
                )}
              <StyledButton classname=""
                func={this.deleteMail}
                txt="Delete"
                bgc="hsl(345deg 100% 47%)"
              />
            </div>
            <h4 className="subject">{mail.subject}</h4>
            <h6 className="to">
              {' '}
              {to.substring(0, to.indexOf('@'))}: {mail.to}
            </h6>
            <h6 className="date">{date}</h6>
            <h6 className="mail-body">{mail.body}</h6>
          </div>
        )}
      </div>
    );
  }
}
