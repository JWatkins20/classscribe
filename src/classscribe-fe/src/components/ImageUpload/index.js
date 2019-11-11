import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import axios from "axios";

export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.match.params.user,
      class_name: props.match.params.class_name,
      date: props.match.params.date,
      images:[],
    };
    this.loadImages = this.loadImages.bind(this);
  }

  componentDidMount() {
    this.loadImages();
  }

  async loadImages()
  {
    const url = `http://localhost:8000/upload/get/${this.state.user}/${this.state.class_name}/${this.state.date}`
    const promise = await axios.get(url);
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data.data;
      this.setState({images:data});
    }
  }

  getImgSrc = (imageName) => {
    return `http://localhost:8000/media/${imageName}`;
  }

  createCarousel = () => {
    let htmlImages = [];

    for (let i = 0; i < this.state.images.length; i++) {
      htmlImages.push(
        <div>
          <img src={this.getImgSrc(this.state.images[i])} alt=""/>
        </div>
      );
    }

    return htmlImages;
  }

  render() {
    return (
      <Carousel useKeyboardArrows>
        {this.createCarousel()}
      </Carousel>
    );
  }
}