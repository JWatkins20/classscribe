import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from "react-router-dom";
import Register from './login_registration/Register';
import Loginscreen from './login_registration/Loginscreen';
import WelcomeScreen from './login_registration/WelcomeScreen';

const App = () =>{
  return(
    <Router>
      <Routes/>
    </Router>
  );
}


const Routes =  () => { 
  return (
    <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={Loginscreen} />
        <Route path="/registration" component={Register} />
        <Route path="/dashboard" component={WelcomeScreen} />
    </Switch>
  );
}
export default App;