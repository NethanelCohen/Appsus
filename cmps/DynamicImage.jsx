export function DynamicImage({ func, classname, src }) {
  return (
    <div className={{ classname }} onClick={func}>
      <img src={src} alt="" />
    </div>
  );
}
