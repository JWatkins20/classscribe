import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { base_url } from "../../App"
import Axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../App';
import Typography from '@material-ui/core/Typography';
import AppBar from 'material-ui/AppBar';
import CardContent from '@material-ui/core/CardContent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from '@material-ui/core/Card';

const carstyle = {
  width: '650px',
  height: '90%',
  float: 'left',
  overflow: 'auto',
  paddingLeft: "5px"
};

const transcriptStyle = {
    width: '300px',
    height: '890px',
    float: 'left',
    overflow: 'auto',
    paddingLeft: "0px",
    border: "2px solid black"
};

const divstyle = {
  'padding-right': '20px',
  'padding-left': '20px',
  'width': '16rem',
  'float': 'left'
}
const pagestyle = {
  "padding-top": "10px",
  "padding-bottom": "10px",
  "padding-left": "20px",
  "padding-right":"20px",
  "width": "11rem"
}
const notestyle = {
  width: '14rem',
  "padding-top": "5px",
  "padding-bottom": "5px",
 }

 const headerstyle = {
   "font-size": "30px"
 }

export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagename: props.match.params.page_name,
      loaded: false,
      images:[],
      items: [],
      pages: [],
      user: {},
      page: 0,
      notebook: 0,
      transcript: ""
    };
    this.loadNotes = this.loadNotes.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  async componentDidMount() {
    await this.loadUser();
    this.setState({loaded: true});
  }

  async loadUser(){
    const res = await Axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
    if(res.status === 200){
        const user = res.data;
        console.log(user.username);
        this.setState({user:user});
    }
    if(this.state.user.type == "student"){
      this.loadNotes();
    }

}

async loadNotes()
  {
    const res = await Axios.get(base_url + "notebooks/get/"+this.state.user.pk+"/").then((res) =>{
    
    if(res.status===200){
      const data = res.data.data;
      this.setState({items:data});
      if(!data[this.state.notebook].pages.length == 0){
          var ps = [];
          var is = [];
      for(var i = 0; i<data[this.state.notebook].pages.length; i++){
          ps.push(data[this.state.notebook].pages[i]);
          this.setState({
            transcript: data[this.state.notebook].pages[i].transcript
          });
          if(!data[this.state.notebook].pages[this.state.page].snapshots.length == 0){
            for (var j = 0; j < data[this.state.notebook].pages[this.state.page].snapshots.length; j++) {
              is.push(data[this.state.notebook].pages[this.state.page].snapshots[j].file);
            }
          }
      }
      this.setState({
        images:is,
        pages:ps
      });
      this.setState({state:this.state});
    }
    }
})
  }

  switchPage = (index) =>{
    console.log("hello");
    this.setState({
      page:index,
      transcript: this.state.items[this.state.notebook].pages[index].transcript
    });
    var is = [];
      if(!this.state.items[this.state.notebook].pages[index].snapshots.length == 0){
        for(var i = 0; i<this.state.items[this.state.notebook].pages[index].snapshots.length; i++){
        is.push(this.state.items[this.state.notebook].pages[index].snapshots[i].file)
        }
      }
  
  this.setState({images:is});
  this.setState({state:this.state});
  }

  switchNote = (index) => {
    this.setState({notebook:index});
    this.setState({page:0});
    var is = [];
    var ps = [];
    for(var i = 0; i<this.state.items[index].pages.length; i++){
      ps.push(this.state.items[index].pages[i]);
    }
    if(!this.state.items[index].pages[0].snapshots.length == 0){
        for(var i = 0; i<this.state.items[index].pages[0].snapshots.length; i++){
          is.push(this.state.items[index].pages[0].snapshots[i].file)
        }
      }
  this.setState({images:is});
  this.setState({pages:ps});
  this.setState({state:this.state});
  }

  

  // async loadImages()
  // {
  //   const url = 'http://localhost:8000/upload/get/'+this.state.pagename+ '/';
  //   const promise = await axios.get(url);
  //   console.log('what happened')
  //   const status = promise.status;
  //   if(status===200)
  //   {
  //     const data = promise.data.data;
  //     this.setState({images:data});
  //   }
  // }

  getImgSrc = (imageName) => {
    return 'http://localhost:8000' + imageName;
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
    const self = this;
    var notes = this.state.items;
        var pages = this.state.pages;
        var notebook = this.state.notebook;
        if(notes != undefined){
            var pagelist = pages.map(function(page){
                return(
                    
                    <div style={pagestyle}>
                <Card onClick={() => self.switchPage(pages.indexOf(page))}>
                    <CardContent><Typography>
                    Page Number: {pages.indexOf(page)}
                    </Typography>
                            </CardContent>
                    </Card>
                    </div>
                )
            })
            var notelist = notes.map(function(note){
              
                return (
                  <div>
                    <div style={notestyle}>  
                    <Card onClick={() => self.switchNote(notes.indexOf(note))}>
                        <CardContent><Typography>
                            {note.name}
                        </Typography>
                        <Typography>         
                                    Number of pages: {note.pages.length}<br/>       
                                    </Typography>      
                                </CardContent>
                        </Card>
                        </div>
                        <div>
                        {notes.indexOf(note) === notebook ? pagelist : null}
                        </div>
                        </div>
                )
                })}
                
        else{
            return(<div>Unable to display notebooks</div>);
        }
    return (
      <MuiThemeProvider>
      <AppBar title= {"Hello, "+this.state.user.username} style={{"padding-bottom": '20px'}}/>
      <div style={{"display": "inline-block"}}>
        <div style={divstyle}><p style={headerstyle}>Notebooks{'\n'}</p>{notelist}</div>
        <div style={carstyle}>
          {this.state.loaded||this.state.images.length > 0 ? <Carousel useKeyboardArrows>{this.createCarousel()}</Carousel> : <div>No images to show select page with images</div>}
        </div>
        <div style={transcriptStyle}>
          <p>{this.state.transcript}</p>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
