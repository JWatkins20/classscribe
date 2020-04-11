import React, { Component } from "react";
import { Carousel } from '../../student/react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { base_url } from "../../App"
import AudioPlayer from "../../student/AudioPlayer"
import Sound from 'react-sound'
import axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button'
import Navbar from '../Navbar';
import NotebookCard from './NotebookCard';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


var currentImage;


// (function(){
//   var oldLog = console.log;
//   console.log = function (message) {
//       if (message.substring(0,13)== "CURRENT PAGE:")
//       currentImage=parseInt(message.substring(13))+1
//       oldLog.apply(console, arguments);
//   };
// })();

const carstyle = {
  width: '50vw',
  height: '90vh',
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
  height: "90vh"
}

const transcriptStyle = {
  width: '24vw',
  height: '70vh',   
  overflow: 'auto',
  paddingLeft: "0px",
  marginTop: "10px",
  textAlign: "left",
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
  height: "17vh",
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
  height: '90vh',
  float: 'left',
  marginTop: "10px",
  overflow: "auto",
  //border: "2px solid black",
  'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  'border-radius': '0.5em',
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'column',
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
      duration: 0,
      time: 0,
      transcript: "",
      displayXray: "",
      handwriting:"",
      public: false,
      hw: false,
      sdac_ready: false,
      recording: undefined,
      showModal: false,
      snapshot_index: 0,
    };
    this.findEligiblePages = this.findEligiblePages.bind(this);
    this.syncToAudio = this.syncToAudio.bind(this);
    this.syncToPage = this.syncToPage.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.getAudioDuration = this.getAudioDuration.bind(this);
    this.updateAudioTime = this.updateAudioTime.bind(this);
    this.loadNotes = this.loadNotes.bind(this);
    this.loadPublicNotes = this.loadPublicNotes.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.switchNote = this.switchNote.bind(this);
    this.switchXray = this.switchXray.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.updatePublicNotebooks = this.updatePublicNotebooks.bind(this)
    this.updateCards = this.updateCards.bind(this)
  }

  updateCards(dummy){
    this.setState({items : dummy})
  }

  split_page = async () =>{
    var image_pks = [];
    for(var i = this.state.snapshot_index; i < this.state.pages[this.state.page].snapshots.length; i++){
      image_pks.push(this.state.pages[this.state.page].snapshots[i].pk)
    }
    var data ={
      "page_pk": this.state.pages[this.state.page].pk, 
      "image_pks": JSON.stringify(image_pks)
    }
    await axios.post(base_url + "notebooks/split/page/", data).then(async()=>{
      await this.loadUser()
      this.setState({state: this.state})
    })
  }

  async componentDidMount() {
      if(!this.state.loaded){
      await this.loadUser();
      this.setState({loaded: true});
      }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.loaded != nextState.loaded){
      return false
    }
    return true
  }

  async updateUser(){
    const res = await axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
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
    const res = await axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
    if(res.status === 200){
        const user = res.data;
        this.setState({
          user:user,
          saved_items: user.favoritedBooks,
        });
      }
  }

  async loadUser(){
    // calls django api to load in user object
    const res = await axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
    if(res.status === 200){
        // response status is 200
        const user = res.data;
        // sets React class's state object with new values for user and saved_items fields
        await this.setState({
          user:user,
          saved_items: user.FavoritedBooks,
        }, async()=>{ //runs when setstate finishes
          if(this.state.user.type == "student" || this.state.user.type == "teacher"){
            await this.loadNotes(); //calls django api to load notebooks and pages for the user
          }
        })
    }
  }

async loadNotes()
  {
    await axios.get(base_url + "notebooks/get/"+this.state.user.pk+"/").then(async(res) =>{
    if(res.status===200){
      const data = res.data.data;
      if(data !== [] && data !== undefined){
        await this.setState({items:data});
      if(!data[this.state.notebook].pages.length == 0){
          var ps = [];
          var is = [];
      for(var i = 0; i<data[this.state.notebook].pages.length; i++){
          ps.push(data[this.state.notebook].pages[i]);
        }
        console.log(data[this.state.notebook].pages[this.state.page])
        this.setState({
          transcript: data[this.state.notebook].pages[this.state.page].transcript,
          handwriting: data[this.state.notebook].pages[this.state.page].handwriting,
          saved_items: this.state.user.favoritedBooks,
        });

        if(!this.state.hw){
          this.setState({displayXray: data[this.state.notebook].pages[this.state.page].transcript});
        }
        else {
          this.setState({displayXray: data[this.state.notebook].pages[this.state.page].handwriting});
        }

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
        snapshot_index: is.length-1, // sets initial page upon render to last page in snapshot history
        pages:ps,
        checked: data[this.state.notebook].Private
      })
    }
    await this.loadPublicNotes(this.state.items[this.state.notebook].class_name)}
    }
}).catch((err)=>{
  console.log(err)
})
  }



  changePrivacy = (notebook) =>{
    let dummy = this.state.items;
    dummy[notebook].Private = !this.state.items[notebook].Private
    this.setState({items: dummy})
  }

  NotebookToggle = () => {
    var self = this
    return(<div style={{alignSelf:'flex-end', flex: 1, paddingTop: 10}}><ToggleButtonGroup
          aria-label="Notebook Toggle"
          id="Notebooks"
          exclusive
          >
          <ToggleButton
          id="userToggle"
          value="user_books"
          role="your_switch"
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
            role="saved_switch"
            aria-label="Saved Notebooks"
            selected={self.state.public}
            onClick={async function(event){
              if(self.state.public){
                return
              }
              await self.setState({public: true})
              await self.switchNote(0)}}
            >
            Saved Notebooks
        </ToggleButton>
      </ToggleButtonGroup>
      </div>
    )
  }
  
  

  XrayToggle = () => {
    var self = this
    return(<div style={{alignSelf:'flex-end', flex: 1, paddingTop: 10}}><ToggleButtonGroup
          aria-label="x-ray Toggle"
          id="Handwriting"
          exclusive
          >
          <ToggleButton value="tran" selected={!self.state.hw} onClick={async function(event){
            if(!self.state.hw){
              return
            }
            await self.setState({hw: false})
            self.switchXray()}}
          >
          Transcription
        </ToggleButton>
        <ToggleButton value="hand" selected={self.state.hw} onClick={async function(event){
              if(self.state.hw){
                return
              }
              await self.setState({hw: true})
              await self.switchXray()}}
          >
            Handwriting
        </ToggleButton>
      </ToggleButtonGroup>
      </div>
    )
  }

  parseDate = (audio_time) => {
    let audio_minute = audio_time.getMinutes()
    let audio_hours = audio_time.getHours()
    let audio_day = audio_time.getDate()
    let audio_seconds = audio_time.getSeconds()
    let audio_month = audio_time.getMonth()
    let audio_year = audio_time.getYear()
    return ({
      minute: audio_minute,
      hours: audio_hours,
      day: audio_day,
      seconds: audio_seconds,
      month: audio_month,
      year: audio_year
    }
    )
  }
/**
 * get time at which pi began recording
 */
  subtractDuration = (dateObj, duration) =>{
    let secondChange = (duration%3600)%60
    let hourChange = Math.floor(duration/3600)
    let minuteChange = Math.floor((duration%3600)/60)
    dateObj.seconds = dateObj.seconds - secondChange
    dateObj.minute = dateObj.minute-minuteChange
    dateObj.hours = dateObj.hours-hourChange
    if(dateObj.seconds < 0){
      dateObj.seconds = dateObj.seconds+60
      dateObj.minute = dateObj.minute-1
    }
    if(dateObj.minute < 0){
      dateObj.minute = dateObj.minute+60
      dateObj.hours = dateObj.hours-1
    }
    if(dateObj.hours < 0){
      dateObj.hours = dateObj.minute+24
      dateObj.day = dateObj.day-1
    }
    return dateObj
  }

  /**
 * get time at which audio is playing when syncing to audio
 */

  addCurrentTime = (dateObj, currentTime) =>{
    let secondChange = (currentTime%3600)%60
    let hourChange = Math.floor(currentTime/3600)
    let minuteChange = Math.floor((currentTime%3600)/60)
    dateObj.seconds = dateObj.seconds + secondChange
    dateObj.minute = dateObj.minute+minuteChange
    dateObj.hours = dateObj.hours+hourChange
    if(dateObj.seconds > 59){
      dateObj.seconds = dateObj.seconds%60
      dateObj.minute = dateObj.minute+1
    }
    if(dateObj.minute > 59){
      dateObj.minute = dateObj.minute%60
      dateObj.hours = dateObj.hours+1
    }
    if(dateObj.hours > 23){
      dateObj.hours = dateObj.minute%24
      dateObj.day = dateObj.day+1
    }
    return dateObj
  }

  calculateOffsetSeconds = (dateObj, startTime) => {
    let seconds = dateObj.seconds - startTime.seconds
    seconds = seconds + ((dateObj.minute - startTime.minute)*60)
    seconds = seconds + ((dateObj.hours - startTime.hours)*3600)
    return seconds
  }


  syncToPage(){
    let snap_times = {}
    let audio_time = this.parseDate(new Date(this.state.audio.timestamp))//date object relating to stored audio
    let t = this // to bring component state to map function scope
    if(this.state.items[this.state.notebook].pages[this.state.page].snapshots !== undefined){
      snap_times = this.state.items[this.state.notebook].pages[this.state.page].snapshots.map(function(x){
        let snaptime = new Date(x.timestamp)
        return t.parseDate(snaptime)
      })
    }
    let audio_duration = Math.floor(this.state.duration)
    let start_time = this.subtractDuration(audio_time, audio_duration)
    if(snap_times[this.state.snapshot_index].day === audio_time.day && snap_times[this.state.snapshot_index].month === audio_time.month && snap_times[this.state.snapshot_index].year === audio_time.year){
      return this.calculateOffsetSeconds(snap_times[this.state.snapshot_index], start_time)
    }
  }

  findEligiblePages(){
    let t = this
    let pages = this.state.items[this.state.notebook].pages.filter(function(item){
      return item.audio.pk === t.state.audio.pk
    })
    return pages;
  }

  compareSnapshots(a,b){
    if (a.hours > b.hours) {
      return 1;
    }
    if (a.hours < b.hours) {
      return -1;
    }
    if(a.hours === b.hours){
      if(a.minute > b.minute){
        return 1;
      }
      if(a.minute < b.minute){
        return -1;
      }
      if(a.minute === b.minute){
        if(a.seconds > b.seconds){
          return 1;
        }
        if(a.seconds < b.seconds){
          return -1;
        }
        if(a.seconds === b.seconds){
          return 0
        }
      }
    }
  }


  async syncToAudio(){
    let targetI = undefined
    let targetJ = undefined
    let currentTime = Math.floor(this.state.time)
    let snap_times = {}
    let audio_time = this.parseDate(new Date(this.state.audio.timestamp))
    let t = this
    let page_arr = this.findEligiblePages()
    let audio_duration = Math.floor(this.state.duration)
    let start_time = this.subtractDuration(audio_time, audio_duration)

    currentTime = this.addCurrentTime(start_time, currentTime)
    for(var i = page_arr.length-1; i >= 0; i-- ){
      if(page_arr[i].snapshots !== undefined){

      snap_times = page_arr[i].snapshots.map(function(x){
        let snaptime = new Date(x.timestamp)
        return t.parseDate(snaptime)
      })

      snap_times = snap_times.sort((a, b)=>{return this.compareSnapshots(a, b)})
    }
      for(var j = 0; j < snap_times.length; j++){
        if(this.calculateOffsetSeconds(snap_times[j], currentTime) > 0){
          break
        }
        else{
          targetI = i
          targetJ = j
        }
      }
      if(targetI !== undefined && targetJ !== undefined){
        await this.switchPage(targetI)
        this.setState({
          snapshot_index: targetJ,
        })
        break
      }
    }
    if(targetI === undefined || targetJ === undefined){
      await this.switchPage(0)
      this.setState({
        snapshot_index: 0,
      })
    }
    
  }

async loadPublicNotes(class_name){
  await axios.get(base_url + "notebooks/get/public/"+String(this.state.user.pk)+"/"+String(class_name)+"/").then((res) =>{
        
    if(res.status===200){
      const data = res.data.data;
      this.setState({public_items: data});
    }
  
  
  }).catch((err)=>{
    console.log(err)
  })
}
  async switchPage(index){
    //console.log(index)
    if(index === this.state.page){
      return 
     }
    var object = this.state.items
    if(this.state.public){
      object = this.state.saved_items
    }
    if(object[this.state.notebook]===undefined){
      return
    }
    //console.log(object)
    //console.log(this.state.notebook)
    this.setState({
      page:index,
      transcript: object[this.state.notebook].pages[index] !== undefined ? object[this.state.notebook].pages[index].transcript: '',
      handwriting: object[this.state.notebook].pages[index] !== undefined ? object[this.state.notebook].pages[index].handwriting: '',
      audio: object[this.state.notebook].pages[index] !== undefined ? object[this.state.notebook].pages[index].audio : {}
    });

    if(!this.state.hw){
      this.setState({displayXray: object[this.state.notebook].pages[index] !== undefined ? object[this.state.notebook].pages[index].transcript: ''});
    }
    else {
      this.setState({displayXray: object[this.state.notebook].pages[index] !== undefined ? object[this.state.notebook].pages[index].handwriting: ''});
    }
    
    var is = [];
      if(object[this.state.notebook].pages[index] !== undefined && object[this.state.notebook].pages[index].snapshots.length !== 0){
        for(var i = 0; i<object[this.state.notebook].pages[index].snapshots.length; i++){
        is.push(object[this.state.notebook].pages[index].snapshots[i].file)
        }
      }
  
  await this.setState({images:is})
  this.setState({snapshot_index: is.length-1});
  }

  async switchXray() {
    if (this.state.hw) {
      this.setState({displayXray: this.state.handwriting})
    }
    else {
      this.setState({displayXray: this.state.transcript})
    }
    
  }

  async switchNote(index) {
    var object = this.state.items
    if(this.state.public){
      object = this.state.saved_items
    }
    if(object === undefined){
      this.setState({
        pages: {},
        transcript: '',
        handwriting: '',
        audio: {},
        images: [],
        pages: []
      })
      return
    }
    if(object[index] === undefined || object[index].pages.length < 1){
      this.setState({
        pages: {},
        transcript: '',
        handwriting: '',
        audio: {},
        images: [],
        pages: []
      })
      return
    }
    this.setState({
      notebook:index,
      page:0,
      handwriting: object[index].pages[0] != {} && object[index].pages[0] != undefined  ? object[index].pages[0].handwriting: '',
      transcript: object[index].pages[0] != {} && object[index].pages[0] != undefined  ? object[index].pages[0].transcript: '',
      audio: object[index].pages[0] != {} && object[index].pages[0] != undefined ? object[index].pages[0].audio : undefined
    });

    if(this.state.hw){
      this.setState({
        displayXray: object[index].pages[0] != {} && object[index].pages[0] != undefined  ? object[index].pages[0].handwriting: '',
      });
    }
    else {
      this.setState({
        displayXray: object[index].pages[0] != {} && object[index].pages[0] != undefined  ? object[index].pages[0].transcript: '',
      });
    }



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
  if(!this.state.public){
    await this.loadPublicNotes(this.state.items[index].class_name)
  }
  this.setState({images:is, pages:ps, snapshot_index: is.length-1});
  }

  getImgSrc = (imageName) => {
    var img = imageName.substring(1)
    if(imageName.includes('http')){
      img = imageName.substring(imageName.indexOf('m'))
    }
    return base_url + img;
  }

  updateAudioTime = (time) => {
    this.setState({time: time})
  }

  getAudioDuration(audio){
    if(audio !== undefined){
      this.setState({duration: audio.duration})
    }
  }

  createCarousel = () => {
    let htmlImages = [];
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
      if(this.state.public && this.state.saved_items !== undefined){
        var notelist = self.state.saved_items.map(function(note, i){
          let index = i
          return <NotebookCard id={"note"+String(index)} onUpdateUser={(event)=>self.updateUser()} onUpdatePublic={(event)=>{self.updatePublicNotebooks()}} parent={self} notes={self.state.saved_items} note={note}/>
        })}
      else{
        var notelist = self.state.items.map(function(note, i){
          return <NotebookCard id={"note"+String(i)} onUpdatePublic={(event)=>{self.updatePublicNotebooks()}} parent={self} notes={self.state.items} note={note}/>
        })}
      }            
    else{
          return(<div>Unable to display notebooks</div>);
        }
    if(this.state.user.type !='student' && this.state.user.type != 'teacher'){
      return (
            <>
              <Navbar username={this.state.user && this.state.user.username}/>
              <div>Must be logged in as a student to view notebooks!</div>
            </>
          );
        }

    return (
    <div style={{'text-align': 'center'}}> 
      <MuiThemeProvider>
      <Navbar style={{'height': '2vh'}} username={this.state.user && this.state.user.username}/>
      <div style={{"display": "inline-block"}}>
    <div style={divstyle}><p style={{flex: .5,
   fontSize: "30px",
   textAlign: "center",
   lineHeight: "1.0"}}>Notebooks{'\n'}</p><div style={{"textAlign": "center"}}><this.NotebookToggle></this.NotebookToggle></div><div style={{flex: 6, overflow: 'auto'}}>{notelist}</div></div>
        <div style={carstyle}>
          {this.state.loaded && this.state.images.length > 0 ? <Carousel id="carousel" useKeyboardArrows selectedItem={this.state.snapshot_index} onChange={(event)=>{this.setState({snapshot_index: event})}} showThumbs={false}>{this.createCarousel()}</Carousel> : <div>Page has no snapshots</div>}
        </div>
        <div style={tandastyle}>

        <div style={transcriptStyle}>
          <p style={headerstyle}>X-Ray{'\n'}</p>
          <div style={{"textAlign": "center"}}><this.XrayToggle></this.XrayToggle></div>
          {this.state.loaded && this.state.displayXray != "" ? <p>{this.state.displayXray}</p> : <div>No X-Ray information available.</div>}
        </div>

          <div style={audiostyle}>
         {this.state.loaded && this.state.audio != undefined  ? this.state.audio.pk !== undefined ? <AudioPlayer parent={this} getAudioDuration={this.getAudioDuration} updateTime={this.updateAudioTime} syncToPage={this.syncToPage} audio_url={base_url+'audio/stream/'+this.state.audio.pk}></AudioPlayer> : <div>Page has no audio</div> : <div>Page has no audio</div>}
         <Button id="syncAudio" onClick={(event)=>this.syncToAudio()}>Sync page to audio</Button>
         <Button id="split" onClick={(event)=>this.split_page()}>Split into new page</Button>
         </div>
         </div>
      </div>
      </MuiThemeProvider>
      </div>
    );
  }
}


