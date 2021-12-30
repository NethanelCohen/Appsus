export const EmailReply = ({ replyToMail, mail, loggedinUser}) => {

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', outline: '2px solid #1a73e8', backgroundColor: 'white', fontWeight: '800', width: '700px', height: '300px' }} className="reply-to-mail">
            <button onClick={() => replyToMail()}>x</button>
            {/* <h4>reply to: {this.props.mail.id}</h4> */}
            <h4>New Message</h4>
            <label htmlFor="sendTo">To: </label>
            <input type='email' name='sendTo'/>
            <label htmlFor="sendBy">From: </label>
            <input type='text' name='sendBy' value={loggedinUser.email}/>
            <h6>Add your reply here</h6>
        </div>
    )
}


