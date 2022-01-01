export function DynamicImage({ func, classname, src, txt }) {
  // debugger
  return (
    <div className={'dynamic-image flex' + `${classname}`} onClick={func}>
      <img src={src} alt="" />
      <h6>{txt}</h6>
    </div>
  );
}
