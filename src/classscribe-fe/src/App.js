import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from "react-router-dom";
import Register from './login_registration/Register';
import Loginscreen from './login_registration/Loginscreen';
import WelcomeScreen from './login_registration/WelcomeScreen';
import 'react-week-calendar/dist/style.css';
import CourseCalendar from "./components/customAdmin/viewAll";
import ImageCarousel from "./components/ImageUpload/index";
import NotebookViewer from "./components/notebooks/index"
import NotebookDownload from "./components/ImageUpload/download";
import CardIDRegistration from "./login_registration/CardIDRegistration";
import AudioPlayer from './student/AudioPlayer'
import { is } from '@babel/types';
import Cookie from "js-cookie"
import EmailVerification from './login_registration/EmailVerification';
import FourOhFour from './components/404'
export const base_url = "http://128.143.67.97:44104/"
export const url = "http://128.143.67.97:44104/api/"
// for testng: http://localhost:8000/api/
// for server: http://128.143.67.97:44104/


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
        <Route path="/emailverification/:email/:verification_password" component={EmailVerification}/>
        <Route path="/registration" component={Register} />
        <PrivateRoute path="/dashboard" component={WelcomeScreen} />
        <Route path="/view-all-courses" exact component={CourseCalendar} />
        <Route path="/download-notebooks" exact component={NotebookDownload} />
        <Route path="/notebook-list" exact component={NotebookViewer} />
        <Route path="/notebook-carousel/" exact component={ImageCarousel} />
        <Route path="/link_your_id/:user_id" component = {CardIDRegistration} />
        <Route path="/audioplayer/:pk" component = {AudioPlayer} />
        <Route component={FourOhFour}/>
    </Switch>
  );
}



const validToken = () =>{
  return Cookie.get('user-key') !== undefined
}

const PrivateRoute = ({component: Component, ...rest}) => {
  return(
    <Route 
      {...rest}
      render = {props =>
        validToken() ? (
          Component && <Component {...props}/>
        ) : (
          <Redirect to={"/login"}/>
        )
      }
    />
  )
}



export default App;

