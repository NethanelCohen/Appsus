const { Link } = ReactRouterDOM;

// ({ mail })

export class EmailPreview extends React.Component{
    
    state = {
        isClicked: false
    }

    handleRowClick = () => {
        this.setState({isClicked: true});
    }

    render() {
        const {mail} = this.props;
        return (
          <tr className="mail-preview" onClick={ () => this.handleRowClick(mail)} >
            <td>CheckBox</td>
            <td>Star</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.to}</td>
          </tr>
        );
    }
}
