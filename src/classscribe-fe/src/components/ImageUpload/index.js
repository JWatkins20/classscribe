import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { base_url } from "../../App"
import AudioPlayer from "../../student/AudioPlayer"
import Axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../App';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from '@material-ui/core/Card';
import borderColor  from '@material-ui/system/borders';

import Navbar from '../Navbar';

const carstyle = {
  width: '50vw',
  height: '87vh',
  float: 'left',
  overflow: 'auto',
  marginRight: "8px",
  marginTop: "10px",
  border: "2px solid black"
};

const imagestyle = {
  width: "50vw",
  height: "87vh"
}

const transcriptStyle = {
    width: '24vw',
    height: '59vh',
    
    overflow: 'auto',
    paddingLeft: "0px",
    marginTop: "10px",
    whiteSpace: "normal",
    border: "2px solid black",
};

const tandastyle = {
  float: 'left',
}

const audiostyle={
  width: "20vw",
  height: "10vh",
}

const divstyle = {
  'margin-right': '8px',
  'margin-left': '8px',
  'padding-right': '10px',
  'padding-left': '10px',
  'width': '20vw',
  'height': '87vh',
  'float': 'left',
  marginTop: "10px",
  overflow: "auto",
  border: "2px solid black"
}
const pagestyle = {
  "padding-top": "10px",
  "padding-bottom": "10px",
  "padding-left": "20px",
  "padding-right":"20px",
  "margin-left": "15px",
  "width": "11rem"
}
const notestyle = {
  width: '14rem',
  "padding-top": "5px",
  "padding-bottom": "5px",
  "margin-left": "15px",
 }

 const headerstyle = {
   "font-size": "30px",
   "text-align": "center",
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
      audio: {},
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
        }
        this.setState({
          transcript: data[this.state.notebook].pages[this.state.page].transcript
        });
        this.setState({
          audio: data[this.state.notebook].pages[this.state.page].audio
        });
          if(!data[this.state.notebook].pages[this.state.page].snapshots.length == 0){
            for (var j = 0; j < data[this.state.notebook].pages[this.state.page].snapshots.length; j++) {
              is.push(data[this.state.notebook].pages[this.state.page].snapshots[j].file);
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
      transcript: this.state.items[this.state.notebook].pages[index].transcript,
      audio: this.state.items[this.state.notebook].pages[index].audio
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
    this.setState({
      page:0,
      transcript: this.state.items[index].pages[0].transcript,
      audio: this.state.items[index].pages[0].audio
    });
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
    return 'http://128.143.67.97:44104' + imageName;
  }


  createCarousel = () => {
    let htmlImages = [];
    //alert("number of images = " + this.state.images.length);
    for (let i = 0; i < this.state.images.length; i++) {
      htmlImages.push(
        <div>
          <img style={imagestyle} src={this.getImgSrc(this.state.images[i])} alt=""/>
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
                <Card border={1} borderColor={"#09d3ac"} onClick={() => self.switchPage(pages.indexOf(page))}>
                    <CardContent><Typography align={'center'}>
                    Page {pages.indexOf(page)+1}
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
                    <Card border={1} borderColor={"#09d3ac"} onClick={() => self.switchNote(notes.indexOf(note))}>
                        <CardContent><Typography align={'center'}>
                            {note.name}
                        </Typography>
                        <Typography align={'center'}>         
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
        if(this.state.user.type!="student"){
          return (
            <>
              <Navbar username={this.state.user && this.state.user.username}/>
              <div>Must be logged in as a student to view notebooks!</div>
            </>
          );
        }
    return (
      <MuiThemeProvider>
      <Navbar username={this.state.user && this.state.user.username}/>
      <div style={{"display": "inline-block"}}>
        <div style={divstyle}><p style={headerstyle}>Notebooks{'\n'}</p>{notelist}</div>
        <div style={carstyle}>
          {this.state.loaded && this.state.images.length > 0 ? <Carousel useKeyboardArrows showThumbs={false}>{this.createCarousel()}</Carousel> : <div>Page has no images</div>}
        </div>
        <div style={tandastyle}>
        <div style={transcriptStyle}>
          <p style={headerstyle}>Transcript{'\n'}</p>
          {this.state.loaded && this.state.transcript != "" ? <p>{this.state.transcript}</p> : <div>Page has no transcript</div>}
        </div>
          <div style={audiostyle}>
         {this.state.loaded && this.state.audio != null  ? <AudioPlayer audio_url={'http://128.143.67.97:44104/'+this.state.audio.file}></AudioPlayer> : <div>Page has no audio</div>}
         </div>
         </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
