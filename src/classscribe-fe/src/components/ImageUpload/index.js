import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { base_url } from "../../App"
import AudioPlayer from "../../student/AudioPlayer"
import Sound from 'react-sound'
import Axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button'
import Navbar from '../Navbar';
import NotebookCard from './NotebookCard';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


const carstyle = {
  width: '50vw',
  height: '88vh',
  float: 'left',
  overflow: 'auto',
  marginRight: "8px",
  marginTop: "10px",
  //border: "2px solid black"
  'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  'border-radius': '0.5em',
};

const formstyle= {
  position: 'absolute',
  top: "10vh",
  left: "10vh",
  'z-index': 1
}

const imagestyle = {
  width: "50vw",
  height: "88vh"
}

const transcriptStyle = {
  width: '24vw',
  height: '70vh',   
  overflow: 'auto',
  paddingLeft: "0px",
  marginTop: "10px",
  marginBottom: "10px",
  paddingBottom: "10px",
  paddingLeft: "10px",
  whiteSpace: "normal",
  //border: "2px solid black",
  'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  'border-radius': '0.5em',
  
};

const tandastyle = {
  float: 'left',
}
const audiostyle={
  width: "24vw",
  height: "15vh",
  'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  'border-radius': '0.5em',
  overflow: 'auto',
  paddingLeft: "0px",
  marginTop: "10px",
  marginBottom: "10px",
  paddingBottom: "10px",
  paddingLeft: "10px",
  whiteSpace: "normal",
}

const divstyle = {
  marginRight: '8px',
  marginLeft: '8px',
  paddingRight: '10px',
  paddingLeft: '10px',
  width: '20vw',
  height: '88vh',
  float: 'left',
  marginTop: "10px",
  overflow: "auto",
  //border: "2px solid black",
  'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  'border-radius': '0.5em',
  justifyContent: 'center',
}


const notestyle = {
  display: "block",
  paddingTop: "3px",
  paddingLeft: "3px",
  paddingBottom: "3px",
  paddingRight:"3px",
  marginRight: "auto",
  marginLeft: "auto",
 }

//  ToggleButtonStyle = {
   
//  }

 const ToggleButtonGroupStyle = {
    height: 10,
 }

const notecardstyle = {
   width: '100%',
   height: '100%'
 }

 const headerstyle = {
   fontSize: "30px",
   textAlign: "center",
   lineHeight: "1.0",
 }
 
export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagename: props.match.params.page_name,
      images:[],
      items: [], //Loaded Notebooks for User
      public_items: [], //Loaded notebooks for Modal view
      saved_items: [], // Loaded notebooks saved by students with explore feature
      pages: [], // array of page objects
      user: {}, // user object -- see User models
      audio: {}, // audio object -- see AudioUpload models
      audio_obj: {},
      loaded: false,
      page: 0,
      notebook: 0,
      time: 0,
      transcript: "",
      public: false,
      recording: undefined,
      showModal: false,
    };
    this.loadNotes = this.loadNotes.bind(this);
    this.loadPublicNotes = this.loadPublicNotes.bind(this);
    this.loadSavedPublicNotes = this.loadSavedPublicNotes.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.changePrivacy = this.changePrivacy.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.Toggle_public_notebooks = this.Toggle_public_notebooks.bind(this);
    this.updatePublicNotebooks = this.updatePublicNotebooks.bind(this)
  }

  
  // handlePrivacyChange(event){
  //   this.setState({private: event.target.value})
  // }

  async Toggle_public_notebooks(event){
    await this.setState({public: !this.state.public})
    this.switchNote(0) //opens public notebook with 0 index in array
  }

  // shouldComponentUpdate(){
    
  // }

  updateCards(dummy){
    this.setState({items : dummy})
  }

  async componentDidMount() {
    await this.loadUser();
    this.setState({loaded: true});
  }

  async updateUser(){
    const res = await Axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
    if(res.status === 200){
        const user = res.data;
        this.setState({
          user:user,
          saved_items: user.favoritedBooks,
        });
      }
  }

  async updatePublicNotebooks(){
    await this.loadPublicNotes(this.state.items[this.state.notebook].class_name)
  }

  async loadUser(){
    const res = await Axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
    if(res.status === 200){
        const user = res.data;
        this.setState({
          user:user,
          saved_items: user.FavoritedBooks,
        });
    }
    if(this.state.user.type == "student" || this.state.user.type == "teacher"){
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
          transcript: data[this.state.notebook].pages[this.state.page].transcript,
          saved_items: this.state.user.favoritedBooks,
        });
        // this.setState({
        //   recording: new Audio('http://localhost:8000'+this.state.audio.file)
        // });
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

await this.loadPublicNotes(this.state.items[this.state.notebook].class_name)
// let audio = this.getAudioDuration('http://localhost:8000'+this.state.audio.file).then(function(val){
//   return val
// })
// this.setState({audio_obj: audio})
  }


async getAudioDuration(src){
  var audio = new Audio(src)
  var loaded = false;
  let dur = 0

  let p = new Promise((resolve, reject)=>{
    audio.onloadedmetadata = () => {
      console.log(audio.duration)
      resolve(audio)
    }
  })
  return p
}


  NotebookToggle = () => {
    var self = this
    return(<ToggleButtonGroup
          aria-label="Notebook Toggle"
          id="Notebooks"
          exclusive
          >
          <ToggleButton
          id="userToggle"
          value="user_books"
          aria-label="Your Notebook"
          selected={!self.state.public}
          onClick={async function(event){
            if(!self.state.public){
              return
            }
            await self.setState({public: false})
            self.switchNote(0)}}
          >
          Your Notebooks
        </ToggleButton>
        <ToggleButton
            id="publicToggle"
            value="publicbooks"
            aria-label="Saved Notebooks"
            selected={self.state.public}
            onClick={async function(event){
              if(self.state.public){
                return
              }
              await self.setState({public: true})
              self.switchNote(0)}}
            >
            Saved Notebooks
        </ToggleButton>
      </ToggleButtonGroup>
    )
  } 

changePrivacy(notebook){
  var dummy = this.state.items
  dummy[notebook].Private = !dummy[notebook].Private
  this.setState({items : dummy})
}

  // async syncToPage(){
  //   let audio_stamp = this.state.audio.timestamp
  //   console.log(this.state.audio)
  //   let audio_time = new Date(audio_stamp)
  //   let audio_minute = audio_time.getMinutes()
  //   let audio_day = audio_time.getDay()
  //   let audio_seconds = audio_time.getSeconds()
  //   console.log(await this.getAudioDuration('http://localhost:8000'+this.state.audio.file).then(function(val){
  //     return val
  //   }))
  //   console.log(this.state.items[this.state.notebook].pages[this.state.page])
  //   for(var i = 0; i < this.state.items[this.state.notebook].pages[this.state.page].snapshots.length; i++){
  //     console.log(this.state.items[this.state.notebook].pages[this.state.page].snapshots[i])
  //   }
  // }

  // syncToAudio(time){
  //   let audio_stamp = this.state.audio.timestamp
  //   let audio_time = new Date(audio_stamp)
  //   console.log(audio_time.getDay)
  //   var page_stamp = this.state.items[this.state.notebook].pages[this.state.page].timestamp
  //   let page_time = new Date(page_stamp)
  //   console.log(page_time.getDay)
  // }

async loadPublicNotes(class_name){
  await Axios.get(base_url + "notebooks/get/public/"+String(this.state.user.pk)+"/"+String(class_name)+"/").then((res) =>{
        
    if(res.status===200){
      const data = res.data.data;
      this.setState({public_items: data});
    }
  
  
  })
}

async loadSavedPublicNotes(){
  // await Axios.get(base_url + "notebooks/get/public/"+String(this.state.user.pk)+"/").then((res) =>{
        
  //   if(res.status===200){
  //     const data = res.data.data;
  //     this.setState({public_items: data});
  //   }
  
  
  // })
}

  switchPage = (index) =>{

    var object = this.state.items
    if(this.state.public){
      object = this.state.saved_items
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

  async switchNote(index) {
    var object = this.state.items
    if(this.state.public){
      object = this.state.saved_items
    }
    if(object[index].pages.length < 1){
      this.setState({
        pages: {},
        transcript: '',
        audio: {},
        images: [],
        pages: []
      })
      return
    }
    this.setState({
      notebook:index,
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
  console.log(String(this.state.items) + ' and index: '+String(index))
  if(!this.state.public){
    await this.loadPublicNotes(this.state.items[index].class_name)
  }
  this.setState({images:is, pages:ps});
  }

  getImgSrc = (imageName) => {
    var img = imageName.substring(1)
    if(imageName.includes('localhost')){
      img = imageName.substring(imageName.indexOf('m'))
    }
    return base_url + img;
  }

  updateAudioTime = (time) => {
    this.setState({time: time})
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
        var notelist = self.state.saved_items.map(function(note){
          return <NotebookCard onUpdateUser={()=>self.updateUser()} onUpdatePublic={()=>{self.updatePublicNotebooks()}} parent={self} notes={self.state.saved_items} note={note}/> //onClick1={() => self.switchNote(notes.indexOf(note))} onclick2={(event) => self.handleSubmit()} onClick3={() => self.handleEditNotebook(note)} onChange={(event)=>self.handleNameChange(event)}
        })}
      else{
        var notelist = self.state.items.map(function(note){
          return <NotebookCard showModal={(event)=>self.showModal(event)} onUpdatePublic={()=>{self.updatePublicNotebooks()}} parent={self} notes={self.state.items} note={note}/> //onClick1={() => self.switchNote(notes.indexOf(note))} onclick2={(event) => self.handleSubmit()} onClick3={() => self.handleEditNotebook(note)} onChange={(event)=>self.handleNameChange(event)}
        })}
      }            
    else{
          return(<div>Unable to display notebooks</div>);
        }
    if(this.state.user.type !="student" && this.state.user.type != "teacher"){
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
    <div style={divstyle}><p style={headerstyle}>Notebooks{'\n'}</p>{notelist}<this.NotebookToggle></this.NotebookToggle></div>
        <div style={carstyle}>
          {this.state.loaded && this.state.images.length > 0 ? <Carousel useKeyboardArrows showThumbs={false}>{this.createCarousel()}</Carousel> : <div>Page has no images</div>}
        </div>
        <div style={tandastyle}>
        <div style={transcriptStyle}>
          <p style={headerstyle}>Transcript{'\n'}</p>
          {this.state.loaded && this.state.transcript != "" ? <p>{this.state.transcript}</p> : <div>Page has no transcript</div>}
        </div>
          <div style={audiostyle}>
         {this.state.loaded && this.state.audio.pk != undefined  ? <AudioPlayer updateTime={this.updateAudioTime} audio_url={'http://localhost:8000/audio/stream/'+this.state.audio.pk}></AudioPlayer> : <div>Page has no audio</div>}
         <Button>Sync audio to page</Button>
         <Button>Sync page to audio</Button>
         <Button>Split into new page</Button>
         </div>
         </div>
      </div>
      </MuiThemeProvider>
      </div>
    );
  }
}


