const { NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header flex">
      <NavLink activeClassName="header-active" to="/">
        <h1 className="logo">Appsus</h1>
      </NavLink>
      <nav className="main-nav flex">
        <NavLink activeClassName="header-active" to="/Book">Mail</NavLink>
        <NavLink activeClassName="header-active" to="/About">About</NavLink>
      </nav>
    </header>
  );
}
