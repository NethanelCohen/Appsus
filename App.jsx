<<<<<<< HEAD
import { EmailApp } from "./js/apps/mail/pages/EmailApp.jsx";
=======
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
>>>>>>> 011337af19576d812d0a01b37f60061a3e31c008

import { AppHeader } from './cmps/AppHeader.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
  return (
<<<<<<< HEAD
      <section className="app" >
        <EmailApp />
      </section>
=======
    <Router>
      <div className="app flex column">
        <AppHeader />
        <main >
        <div className="main-container flex column">
          <Switch>
            <Route component={About} path="/about" />
            <Route component={Home} path="/" />
          </Switch>
          </div>
        </main>
        <AppFooter />
      </div>
      {/* <UserMsg /> */}
    </Router>
>>>>>>> 011337af19576d812d0a01b37f60061a3e31c008
  );
}



