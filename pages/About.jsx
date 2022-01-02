export function About() {
  return (
    <div className="about-container flex column">
      <h1>Welcome To the About Page</h1>
      <h4>This page was created as a part of the Coding Academy course</h4>
      <h6>We did our best and super proud of the result!</h6>
      <div className="user-images flex">
        <div className="flex column">
          <h3>Nati Gurevich</h3>
          <img src="./assets/img/NatiGurevich.jpg" alt="" />
        </div>
        <div className="flex column">
        <h3>Nati Cohen</h3>
          <img src="./assets/img/NatiCohen.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
}
