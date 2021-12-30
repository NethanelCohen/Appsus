const { NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header flex">
      <NavLink activeClassName="header-active" to="/">
        <div className="logo-container flex">
          <h1 className="logo"> Appsus</h1>
          <img src="./assets/img/icons8-gmail-48.png" alt="" />
        </div>
      </NavLink>
      
      <nav className="main-nav flex">
        <NavLink activeClassName="header-active" to="/mail">
          Mail
        </NavLink>
        <NavLink activeClassName="header-active" to="/note">
          Note
        </NavLink>
        <NavLink activeClassName="header-active" to="/about">
          About
        </NavLink>
      </nav>
    </header>
  );
}
