import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { base_url } from "../../App"
import axios from "axios";


const carstyle = {
  width: '600px',
  height: '350px',
  paddingLeft: '250px', 
};

export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: props.match.params.user,
      // class_name: props.match.params.class_name,
      // date: props.match.params.date,
      pagename: props.match.params.page_name,
      loaded: false,
      images:[],
    };
    this.loadImages = this.loadImages.bind(this);
  }

  async componentDidMount() {
    await this.loadImages();
    this.setState({loaded: true});
  }

  async loadImages()
  {
    const url = 'http://localhost:8000/upload/get/'+this.state.pagename+ '/';
    const promise = await axios.get(url);
    console.log('what happened')
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data.data;
      this.setState({images:data});
    }
  }

  getImgSrc = (imageName) => {
    return base_url + 'media/'+imageName;
  }

  createCarousel = () => {
    let htmlImages = [];
    //alert("number of images = " + this.state.images.length);
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
      <div style={carstyle}>
      <Carousel useKeyboardArrows>
        {this.state.loaded ? this.createCarousel() : null}
      </Carousel>
      </div>
    );
  }
}
