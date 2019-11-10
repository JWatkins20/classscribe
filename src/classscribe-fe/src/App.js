import React, { Component } from "react";
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import CourseForm from "./components/customAdmin/index";
import ImageCarousel from "./components/ImageUpload/index";
import NotebookDownload from "./components/ImageUpload/download";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/create-course" exact component={CourseForm} />
        <Route path="/download-notebooks" exact component={NotebookDownload} />
        <Route path="/notebook-carousel" exact component={ImageCarousel} />
      </Router>
    );
  }
}

export default App;
