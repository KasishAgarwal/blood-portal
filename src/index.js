import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SignupNav from './components/SignupNav';
import SigninNav from './components/SigninNav';
import Success from './Success'
import About from './About'
import Home from './Home'
import Contact from './Contact'
import Calender from './Calender'
import Help from './Help'
import Dashboard from './Dashboard'
import updateSuccess from './updateSuccess'
import getSuccess from './getSuccess'
import seeProfile from './seeProfile'


const routing = (

  <div className="App">
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/signup" component={SignupNav} />
      <Route path="/signin" component={SigninNav} />
      <Route path="/signupsuccess" component={Success} />
      <Route path="/updatesuccess" component={updateSuccess} />
      <Route path="/getSuccess" component={getSuccess} />
      <Route path="/seeProfile" component={seeProfile} />
      <Route path="/about" component={About} />
      <Route path="/home" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/calender" component={Calender} />
      <Route path="/help" component={Help} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  </div>

)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
