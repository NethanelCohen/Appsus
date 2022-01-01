import { emailService } from '../services/email.service.js';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';
import { utilService } from '../../../services/util.services.js';
import { DynamicImage } from '../../../../cmps/DynamicImage.jsx';

const { Link } = ReactRouterDOM;

export class EmailPreview extends React.Component {
  state = {
    isClicked: false,
    isMouseOver: false,
  };

  handleOpenMail = () => {
    const { mail } = this.props;
    emailService
      .isMailRead(mail.id, true)
      .then(this.setState({ isClicked: false }));
  };

  extandMailView = (e) => {
    const { id } = this.props.mail;
    const { isClicked } = this.state;
    if (e.target.className.includes('star')) {
      return;
    } else if (e.target.nodeName === 'IMG') return;
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
    // debugger
    const { id } = this.props.mail;
    emailService.isMailRead(id, false).then(this.props.loadMails);
    if ((this.state.isClicked = true)) this.setState({ isClicked: false });
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
    const isMailRead = mail.isRead ? '#eef2ff' : '#f18d8bf2';
    return (
      <React.Fragment>
        {!isClicked && (
          <tr
            className="mail-preview-container short-mail-view"
            style={{
              backgroundColor: `${isMailRead}`,
              borderColor: `${isMailRead}`,
              borderBottom: '1px solid #5584AC',
            }}
            onClick={this.extandMailView}
            onMouseOver={() => this.handleMouse('on')}
            onMouseLeave={() => this.handleMouse('off')}>
            {/* <td>
              <input type="checkbox" />
            </td> */}
            <td
              className={mail.isStared === true ? 'star on' : 'star off'}
              onClick={(ev) => {
                this.props.setColorStar(ev);
                emailService.isMailStared(mail.id);
              }}>
              &#9733;
            </td>
            <td>{mail.subject}</td>
            <td>{mail.to}</td>
            <td
              style={{
                innerHeight: '50px',
              }}>
              {mail.body}
            </td>
            {!isMouseOver && <td>{date}</td>}
            {isMouseOver && (
              <td className="hover-mail-btn flex">
                <Link to={{ pathname: `/mail/${mail.id}` }}>
                  <DynamicImage
                    func={this.handleOpenMail}
                    txt=""
                    src="../../../assets/img/mail-open.png"
                    classname=" open-mail"
                  />
                </Link>
                <DynamicImage
                  func={this.handleUnreadClick}
                  txt=""
                  src="../../../assets/img/unread.png"
                  classname=" unread-mail"
                />
                {!this.props.isReplyClicked && (
                  <DynamicImage
                    func={() => this.props.replyClicked()}
                    txt=""
                    src="../../../assets/img/reply-mail.png"
                    classname=" reply"
                  />
                )}
                <DynamicImage
                  func={this.deleteMail}
                  txt=""
                  src="../../../assets/img/delete.png"
                  classname=" delete"
                />
              </td>
            )}
          </tr>
        )}
        {isClicked && (
          <tr
            onClick={this.extandMailView}
            style={{ backgroundColor: `${isMailRead}` }}
            className="long-mail-view">
            {/* <td>
              <input type="checkbox" />
            </td> */}
            <td className="subject">{mail.subject}</td>
            <td className="to">
              {' '}
              {to.substring(0, to.indexOf('@'))}: {mail.to}
            </td>
            <td className="date">{date}</td>
            <td className="mail-body">{mail.body}</td>
            <td className="long-mail-btn flex">
              <Link to={`/mail/${mail.id}`} className="expand">
                <DynamicImage
                  func={this.handleOpenMail}
                  txt=""
                  src="../../../assets/img/mail-open.png"
                  classname=" open-mail"
                />
              </Link>
              <DynamicImage
                func={this.handleUnreadClick}
                txt=""
                src="../../../assets/img/unread.png"
                classname=" unread-mail"
              />

              {!this.props.isReplyClicked && (
                <DynamicImage
                  func={() => this.props.replyClicked()}
                  txt=""
                  src="../../../assets/img/reply-mail.png"
                  classname=" reply"
                />
              )}
              <DynamicImage
                func={this.deleteMail}
                txt=""
                src="../../../assets/img/delete.png"
                classname=" delete"
              />
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }
}
