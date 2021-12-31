
export function Folders({handleCriteriaStatus , activeStatus,staredStatues}) {
  return (
    <section className="email-folder-list">
      <ul
        className="flex column"
        onClick={() => handleCriteriaStatus(event.target.dataset.value)}>
        <li
          className={activeStatus === 'inbox' ? 'active-filter' : ''}
          data-value="inbox">
          Inbox
        </li>
        <li
          className={activeStatus === 'sent' ? 'active-filter' : ''}
          data-value="sent">
          Sent
        </li>
        <li
          className={activeStatus === 'trash' ? 'active-filter' : ''}
          data-value="trash">
          Trash
        </li>
        <li
          className={activeStatus === 'draft' ? 'active-filter' : ''}
          data-value="draft">
          Draft
        </li>
        <li
          className={staredStatues === 'Stared' ? 'active-filter' : ''}
          data-value="stared">
          Stared
        </li>
      </ul>
    </section>
  );
}
