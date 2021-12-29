
const { Link } = ReactRouterDOM

export function EmailPreview({ mail }) {
    console.log(mail);
    return (
        <Link to={`/mail/${mail.id}`}>
            <article className="mails-preview flex">
                <h4>{mail.subject}</h4>
                <h6>{mail.body}</h6>
                <h6>{mail.to}</h6>
            </article>
        </Link>
    )
}