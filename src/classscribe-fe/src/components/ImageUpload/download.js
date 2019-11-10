import React, { Component } from "react";

import axios from "axios";

export default class NotebookDownload extends Component {
  constructor(props) {
    super(props);
    this.downloadImages = this.downloadImages.bind(this);
  }

  async downloadImages()
  {
    alert("downloading images");
    const promise = await axios.get("http://localhost:8000/upload/download/");
    const status = promise.status;
    if(status===200)
    {
    const data = promise.data.data;
    this.setState({images:data});
    }
  }

  render() {
    return (
      <a href="http://localhost:8000/upload/download/">Download</a>
    );
  }
}