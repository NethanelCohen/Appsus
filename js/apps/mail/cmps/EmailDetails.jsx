import { emailService } from '../services/email.service.js';
import { StyledButton } from '../../../../cmps/StyledButton.jsx';
import { EmailReply } from '../cmps/EmailReply.jsx';

const { Link } = ReactRouterDOM;

export class EmailDetails extends React.Component {
  state = {
    mail: null,
    repliedClicked: false,
  };

  componentDidMount() {
    this.loadMail();
    console.log(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
      this.loadMail();
    }
  }

  loadMail = () => {
    const { mailId } = this.props.match.params;
    if (!mailId) return;
    emailService.getMailById(mailId).then((mail) => {
      if (!mail) return this.props.history.push('/');
      this.setState({ mail });
    });
  };

  replyToMail = () => {
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
    const { mail } = this.state;
    const { repliedClicked } = this.state;
    if (!mail) return <h1>There is no mail!</h1>;
    const date =
      new Date(mail.sentAt).toLocaleDateString('en-US') +
      ' ' +
      new Date(mail.sentAt).toLocaleTimeString('en-US');
    return (
      <section className="mail-details grid">
        <div className="mail-inner-btn flex">
          <Link to={'/mail'}>
            <StyledButton  txt="⏎" bgc="grey" classname="" />
          </Link>
          {!repliedClicked && (
                  <StyledButton 
                  func={() => this.replyToMail()}
                  classname=""
                    txt="reply!!"
                    bgc="green"
                    // loadMails={this.props.loadMails}
                    // loggedinUser={()=>emailService.loggedinUser()}
                    // replyClicked={repliedClicked}
                  />
                )}
          <StyledButton classname=""
            func={this.deleteMail}
            txt="Delete"
            bgc="hsl(345deg 100% 47%)"
          />
        </div>
        <h1 className="mail-subject">{mail.subject}</h1>
        <div className="mail-description flex column">
          <h4 className="mail-from" >{mail.to}</h4>
          <h4 className="mail-date">{date}</h4>
          {repliedClicked && <EmailReply />}
        </div>
        <h2 className="mail-body">{mail.body}</h2>
        {/* <p className="mail-txt">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
          architecto consequatur cumque atque explicabo autem odio vero illum.
          Cumque mollitia nihil exercitationem rem magni perspiciatis nesciunt
          dolorum delectus qui eveniet.
        </p> */}
        {repliedClicked && (
          <EmailReply replyToMail={this.replyToMail} mail={this.state.mail} />
        )}
      </section>
    );
  }
}
