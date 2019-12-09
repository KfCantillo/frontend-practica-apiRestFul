import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Navigation from './components/Navegation/Navegation';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Posts from './components/Posts/Posts';
import Logout from './components/SignIn/Logout';

function App() {

  return (
    <Router>
        <Navigation />
        <Route path="/" exact component={SignIn} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:id" component={Posts} />
        <Route path="/logout" component={Logout} />

    </Router>
  );
}

export default App;

