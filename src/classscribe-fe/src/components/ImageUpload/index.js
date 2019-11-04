import React, { Component } from "react";
import { Carousel} from 'react-responsive-carousel';

import axios from "axios";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
    images:[],
    };
    this.loadImages = this.loadImages.bind(this);
  }

  componentDidMount() {
    this.loadBooks();
  }

  async loadImages()
  {
    const promise = await axios.get("http://localhost:8000/book/");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data.data;
      this.setState({books:data});
    }
  }

  render() {
    return(
      <div>
        <h1>Books</h1>
            {this.state.books.map((value,index)=>{return <h4 key={index}>{value}</h4>})}
      </div>
    )
  }
}