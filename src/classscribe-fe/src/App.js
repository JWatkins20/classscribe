import React, { Component } from "react";
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import CourseForm from "./components/customAdmin/index";
import ImageCarousel from "./components/ImageUpload/index";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/notebook-carousel" exact component={ImageCarousel} />
        <Route path="/create-course" exact component={CourseForm} />
      </Router>
    );
  }
}

export default App;
