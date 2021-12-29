const { Link } = ReactRouterDOM;

// ({ mail })

export class EmailPreview extends React.Component {
  state = {
    isClicked: false,
  };

  handleRowClick = () => {
    this.setState({ isClicked: true });
  };

  render() {
    const { mail } = this.props;
    return (
      <Link to={`/book/${mail.id}`}>
        <div className="mail-preview">
          <h6>CheckBox</h6>
          <h6>Star</h6>
          <h6>{mail.subject}</h6>
          <h6>{mail.body}</h6>
          <h6>{mail.to}</h6>
        </div>
      </Link>
    );
  }
}
