import React from 'react';
import { Switch, Route } from 'react-router-dom'
import RegisLogin from './pages/RegisLogin'
import Home from './pages/HomeWithNavbar'
import HealthCarePage from './pages/HealthCare'
import Chat from './pages/Chat'
import Loading from './components/Loading'
import ErrorNotFound from './components/NotFound'
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import getIsLoggedIn from './helpers/getIsLoggedIn'
import AdoptionPage from './pages/Adoption'
import FavoritesPage from './pages/Favorites'
import Midtrans from './pages/Midtrans'
import VideoCall from './pages/VideoCall'
import MoreNews from './pages/MoreNews'

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (getIsLoggedIn()) {
      next();
    }
    next.redirect('/');
  } else {
    if (getIsLoggedIn()) {
      next.redirect('/home');
    }
    next();
  }
};
export default function App() {
  return (
    <GuardProvider guards={[requireLogin]} loading={Loading} error={ErrorNotFound}>
      <Switch>
        <GuardedRoute path="/" exact component={RegisLogin} />
        <GuardedRoute path="/home" exact component={Home} meta={{ auth: true }} />
        <GuardedRoute path="/chat" exact component={Chat} meta={{ auth: true }} />
        <GuardedRoute path="/healthcare" exact component={HealthCarePage} meta={{ auth: true }} />
        <GuardedRoute path="/adoption" exact component={AdoptionPage} meta={{ auth: true }} />
        <GuardedRoute path="/favorites" exact component={FavoritesPage} meta={{ auth: true }} />
        <GuardedRoute path="/videocall/:id" exact component={VideoCall} meta={{ auth: true }} />
        <GuardedRoute path="/midtrans" component={Midtrans} meta={{ auth: true }}/>
        {/* <GuardedRoute path="/morenews" component={MoreNews} meta={{ auth: true }}/> */}
        <GuardedRoute path="*" component={ErrorNotFound} />
      </Switch>
    </GuardProvider>
  );
}




