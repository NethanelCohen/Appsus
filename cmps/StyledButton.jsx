export function StyledButton({ txt, func, bgc, classname }) {
  return (
    <button
      className={`styled-button${classname}`}
      onClick={func}
      role="button">
      <span
        style={{
          backgroundColor: `${bgc}`,
        }}
        className={`styled-button-front text ${classname}`}>
        {txt}
      </span>
    </button>
  );
}
