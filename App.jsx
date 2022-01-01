import { EmailApp } from "./js/apps/mail/pages/EmailApp.jsx";
import { NoteApp } from "./js/apps/keep/pages/NoteApp.jsx";
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { EmailDetails } from "./js/apps/mail/cmps/EmailDetails.jsx";

import { AppHeader } from './cmps/AppHeader.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
  return (
    <Router>
      <div className="app flex column">
        <AppHeader />
        <main >
          <Switch>
          <Route component={EmailDetails} path="/mail/:mailId" />
            <Route component={About} path="/about" />
            <Route component={EmailApp} path="/mail" />
            <Route component={NoteApp} path="/note" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
        <AppFooter />
      </div>
      <UserMsg />
    </Router>
  );
}



