import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from "react-router-dom";
import Register from './login_registration/Register';
import Loginscreen from './login_registration/Loginscreen';
import WelcomeScreen from './login_registration/WelcomeScreen';
import 'react-week-calendar/dist/style.css';

import CourseEdit from "./components/customAdmin/edit";
import CourseForm from "./components/customAdmin/index";
import CourseCalendar from "./components/customAdmin/viewAll";
import ImageCarousel from "./components/ImageUpload/index";
import NotebookDownload from "./components/ImageUpload/download";

export const base_url = "http://localhost:8000/"
export const url = "http://localhost:8000/api/"
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
        <Route path="/registration" component={Register} />
        <Route path="/dashboard" component={WelcomeScreen} />
        <Route path="/create-course" exact component={CourseForm} />
        <Route path="/view-all-courses" exact component={CourseCalendar} />
        <Route path="/download-notebooks" exact component={NotebookDownload} />
        <Route path="/edit-course/:course_name/:building/:room/:time" exact component={CourseEdit} />
        <Route path="/notebook-carousel/:user/:class_name/:date" exact component={ImageCarousel} />
    </Switch>
  );
}
export default App;

