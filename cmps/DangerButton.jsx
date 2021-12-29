export function DangerButton({txt, func}) {
  return (
    <button className="button-danger" onClick={func} role="button">
      <span className="button-danger-shadow"></span>
      <span className="button-danger-edge"></span>
      <span className="button-danger-front text">{txt}</span>
    </button>
  );
}
