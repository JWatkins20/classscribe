import React, { Component } from "react";
import { base_url } from '../../App';
import axios from "axios";

export default class NotebookDownload extends Component {
  constructor(props) {
    super(props);
    this.downloadImages = this.downloadImages.bind(this);
  }

  async downloadImages()
  {
    alert("downloading images");
    const promise = await axios.get(base_url + "upload/download/");
    const status = promise.status;
    if(status===200)
    {
    const data = promise.data.data;
    this.setState({images:data});
    }
  }

  render() {
    return (
      <div>
        {document.write('<a href="' + base_url + "upload/download/" + '">Download</a>')}
      </div>
      
    );
  }
}