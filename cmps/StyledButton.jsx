export function StyledButton({ txt, func,bgc }) {
  return (
    <button className="styled-button" onClick={func} role="button">
      <span className="styled-button-shadow"></span>
      <span className="styled-button-edge"></span>
      <span
        style={{
          backgroundColor: `${bgc}`,
        }}
        className="styled-button-front text">
        {txt}
      </span>
    </button>
  );
}
