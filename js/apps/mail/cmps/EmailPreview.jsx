const { Link } = ReactRouterDOM;

// ({ mail })

export class EmailPreview extends React.Component {
  state = {
    isClicked: false,
  };

  extandMailView = () => {
    const {isClicked} = this.state;
    !isClicked ? this.setState({ isClicked: true }) : this.setState({ isClicked: false });
  }

  handleChange = () => {
      console.log(this.props.history);
    // this.props.history.push(`/mail/${mail.id}`);
  }

  render() {
    const { mail } = this.props;
    const {isClicked} = this.state;
    return (
        <div className="mail-preview" onClick={this.extandMailView}>
          {!isClicked && <div className="short-mail-view">
          <h6>CheckBox</h6>
          <h6>Star</h6>
          <h6>{mail.subject}</h6>
          <h6>{mail.body}</h6>
          <h6>{mail.to}</h6>
        </div>}
        {isClicked && <div className="long-mail-view">
          <h4>{mail.subject}</h4>
          <div className="long-mail-btn">
              <button onClick={this.handleChange}>❏</button>
              </div>
          <h6>{mail.to}</h6>
          <h6>{mail.body}</h6>
        </div>}
        </div>
    );
  }
}
