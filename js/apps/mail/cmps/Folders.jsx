export function Folders() {
  return (
    <section className="email-folder-list">
      <ul className="flex column" onClick={() => console.log(event.target.dataset.value)}>
        <li data-value="all">All</li>
        <li data-value="inbox">Inbox</li>
        <li data-value="sent">Sent</li>
        <li data-value="trash">Trash</li>
        <li data-value="draft">Draft</li>
      </ul>
    </section>
  )
}
