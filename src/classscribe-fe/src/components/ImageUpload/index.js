import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { base_url } from "../../App"
import AudioPlayer from "../../student/AudioPlayer"
import Axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button'
import Navbar from '../Navbar';
import NotebookCard from './NotebookCard';



const carstyle = {
  width: '50vw',
  height: '90vh',
  float: 'left',
  overflow: 'auto',
  marginRight: "8px",
  marginTop: "10px",
  border: "2px solid black"
};

const formstyle= {
  position: 'absolute',
  top: "10vh",
  left: "10vh",
  'z-index': 1
}

const imagestyle = {
  width: "50vw",
  height: "90vh"
}

const transcriptStyle = {
  width: '24vw',
  height: '80vh',   
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
  'height': '90vh',
  'float': 'left',
  marginTop: "10px",
  overflow: "auto",
  border: "2px solid black"
}
const floatstyle = {
  "float": "left",
}


const notestyle = {
  "display": "block",
  "padding-top": "3px",
  "padding-left": "3px",
  "padding-bottom": "3px",
  "padding-right":"3px",
  "margin-left": "auto",
  "margin-right": "auto",
 }

const notecardstyle = {
   width: '100%',
   height: '100%'
 }

 const headerstyle = {
   "font-size": "30px",
   "text-align": "center",
   "line-height": "1.0",
 }
 
export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagename: props.match.params.page_name,
      images:[],
      items: [],
      public_items: [],
      pages: [],
      user: {},
      audio: {},
      loaded: false,
      page: 0,
      notebook: 0,
      transcript: "",
      public: false
    };
    this.loadNotes = this.loadNotes.bind(this);
    this.loadPublicNotes = this.loadPublicNotes.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.changePrivacy = this.changePrivacy.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.Toggle_public_notebooks = this.Toggle_public_notebooks.bind(this);
  }



  // handlePrivacyChange(event){
  //   this.setState({private: event.target.value})
  // }
  
  async Toggle_public_notebooks(event){
    await this.setState({public: !this.state.public})
    this.switchNote(0) //opens public notebook with 0 index in array
  }

  updateCards(dummy){
    this.setState({items : dummy})
  }

  async componentDidMount() {
    await this.loadUser();
    this.setState({loaded: true});
  }

  async loadUser(){
    const res = await Axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
    if(res.status === 200){
        const user = res.data;
        this.setState({user:user});
    }
    if(this.state.user.type == "student"){
      this.loadNotes();
    }

}

async loadNotes()
  {
    await Axios.get(base_url + "notebooks/get/"+this.state.user.pk+"/").then((res) =>{
    
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
        pages:ps,
        checked: data[this.state.notebook].Private
      });
      this.setState({state:this.state});
    }
    }
})

await this.loadPublicNotes()
  }

changePrivacy(notebook){
  var dummy = this.state.items
  dummy[notebook].Private = !dummy[notebook].Private
  this.setState({items : dummy})
}

async loadPublicNotes(){
  await Axios.get(base_url + "notebooks/get/public/"+String(this.state.user.pk)+"/").then((res) =>{
        
    if(res.status===200){
      const data = res.data.data;
      console.log(data)
      this.setState({public_items: data});
    }
  
  
  })
}

  switchPage = (index) =>{
    var object = this.state.items
    if(this.state.public){
      object = this.state.public_items
    }
    this.setState({
      page:index,
      transcript: object[this.state.notebook].pages[index].transcript,
      audio: object[this.state.notebook].pages[index].audio
    });
    var is = [];
      if(!object[this.state.notebook].pages[index].snapshots.length == 0){
        for(var i = 0; i<object[this.state.notebook].pages[index].snapshots.length; i++){
        is.push(object[this.state.notebook].pages[index].snapshots[i].file)
        }
      }
  
  this.setState({images:is});
  this.setState({state:this.state});
  }

  switchNote = (index) => {
    console.log(this.state.public)
    var object = this.state.items
    if(this.state.public){
      object = this.state.public_items
    }
    this.setState({notebook:index});
    this.setState({
      page:0,
      transcript: object[index].pages[0] != {} && object[index].pages[0] != undefined  ? object[index].pages[0].transcript: '',
      audio: object[index].pages[0] != {} && object[index].pages[0] != undefined ? object[index].pages[0].audio : undefined
    });
    var is = [];
    var ps = [];
    if(object[index].pages.length != 0){
    for(var i = 0; i<object[index].pages.length; i++){
      ps.push(object[index].pages[i]);
    }
    if(!object[index].pages[0].snapshots.length == 0){
        for(var i = 0; i<object[index].pages[0].snapshots.length; i++){
          is.push(object[index].pages[0].snapshots[i].file)
        }
      }
    }
  this.setState({images:is});
  this.setState({pages:ps});
  this.setState({state:this.state});
  }

  getImgSrc = (imageName) => {
    return 'http://localhost:8000' + imageName;
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
    if(notes != undefined){
      if(this.state.public){
        var notelist = self.state.public_items.map(function(note){
          return <NotebookCard parent={self} notes={self.state.public_items} note={note}/> //onClick1={() => self.switchNote(notes.indexOf(note))} onclick2={(event) => self.handleSubmit()} onClick3={() => self.handleEditNotebook(note)} onChange={(event)=>self.handleNameChange(event)}
        })}
      else{
        var notelist = self.state.items.map(function(note){
          return <NotebookCard parent={self} notes={self.state.items} note={note}/> //onClick1={() => self.switchNote(notes.indexOf(note))} onclick2={(event) => self.handleSubmit()} onClick3={() => self.handleEditNotebook(note)} onChange={(event)=>self.handleNameChange(event)}
        })}
      }            
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
    <div> 
      <MuiThemeProvider>
      <Navbar style={{'height': '2vh'}} username={this.state.user && this.state.user.username}/>
      <div style={{"display": "inline-block"}}>
        <div style={divstyle}><p style={headerstyle}>Notebooks{'\n'}</p>{notelist}<Button onClick={(event)=>this.Toggle_public_notebooks(event)}>View Public Notebooks</Button></div>
        <div style={carstyle}>
          {this.state.loaded && this.state.images.length > 0 ? <Carousel useKeyboardArrows showThumbs={false}>{this.createCarousel()}</Carousel> : <div>Page has no images</div>}
        </div>
        <div style={tandastyle}>
        <div style={transcriptStyle}>
          <p style={headerstyle}>Transcript{'\n'}</p>
          {this.state.loaded && this.state.transcript != "" ? <p>{this.state.transcript}</p> : <div>Page has no transcript</div>}
        </div>
          <div style={audiostyle}>
         {this.state.loaded && this.state.audio != null  ? <AudioPlayer audio_url={'http://localhost:8000'+this.state.audio.file}></AudioPlayer> : <div>Page has no audio</div>}
         </div>
         </div>
      </div>
      </MuiThemeProvider>
      </div>
    );
  }
}
