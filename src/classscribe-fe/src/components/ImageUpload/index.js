import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { base_url } from "../../App"
import AudioPlayer from "../../student/AudioPlayer"
import Axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../App';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button'
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

const formstyle= {
  position: 'absolute',
  top: "10vh",
  left: "10vh",
  'z-index': 1
}

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
const buttonstyle = {
  float: 'left',
  width: '20%', 
  height: '15%'
}

const textfieldstyle = {
  float: 'left', 
  width: '65%'
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
const floatstyle = {
  "float": "left",
}

const pagestyle = {
  "padding-top": "1vw",
  "padding-bottom": "1vw",
  "padding-left": "1vw",
  "padding-right":"1vw",
  "margin-left": "3vw",
  "margin-bottom": "1vw",
  "width": "11vw",
  "height": "3vh"
}
const notestyle = {
  width: '18vw',
  height: '12vh',
  "padding-top": "1vw",
  "padding-left": "1vw",
  "padding-right":"1vw",
  "margin-left": "3px",
 }

const notecardstyle = {
   width: '100%',
   height: '100%'
 }

 const headerstyle = {
   "font-size": "30px",
   "text-align": "center",
 }

class EditNotebookForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {notebookname: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({notebookname: event.target.value})
  }
  handleSubmit(event){
    this.items[this.state.notebook].name = this.notebookname
  }
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
      edit: false,
      page: 0,
      notebookname: "",
      notebookprivate: false,
      notebook: 0,
      transcript: ""
    };
    this.loadNotes = this.loadNotes.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    // this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event){
    this.setState({notebookname: event.target.value})
  }
  // handlePrivacyChange(event){
  //   this.setState({private: event.target.value})
  // }
  async handleSubmit(event){
    event.preventDefault();
    if(this.state.notebookname === ""){

    }
    this.setState({edit: false})
    var dummy = this.state.items
    dummy[this.state.notebook].name = this.state.notebookname
    this.setState({items : dummy})
    var data = {
      'pk' : this.state.items[this.state.notebook].pk,
      'name': this.state.notebookname,
      //'private': this.state.notebookprivate
    }
    const url = `${base_url}notebooks/edit/`;
    await Axios.post(url, data)
        .then(function (response) {
            if (response.status === 200) {
                
            }
            else {
                alert("Edits were not saved!");
            }
        })
        .catch(function (error) {
            alert("Edits were not saved. Check the console for the error!");
            console.log(error);
        });

  }
  async componentDidMount() {
    await this.loadUser();
    this.setState({loaded: true});
  }

  async loadUser(){
    const res = await Axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
    if(res.status === 200){
        const user = res.data;
        console.log(user.pk);
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

  handleEditNotebook = (notebook) => {
    this.setState({edit:true})
    this.setState({notebook:notebook})
    this.setState({state:this.state});

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
                    <Card style={notecardstyle} border={1} borderColor={"#09d3ac"} onClick={() => self.switchNote(notes.indexOf(note))}>
                        {self.state.edit ? //conditional render based on whether editing process has been initiated
                        <div style={{display: 'inline-block'}}><CardContent><form>
                        <TextField style={textfieldstyle} id="standard-basic" label="new name" onChange={(event)=>self.handleNameChange(event)} />
                        <Button style={buttonstyle} variant="contained" onClick={(event) => self.handleSubmit(event)}>Done</Button>
                        </form> 
                        </CardContent></div>
                        :
                        <div>
                        <CardContent>
                        <Typography align={'center'}>
                            {note.name}
                        </Typography> 
                        </CardContent>
                            <CardActions>
                            <IconButton style={{marginLeft: '80%'}} aria-label="edit icon" onClick={() => self.handleEditNotebook(note)}>
                            <EditIcon />
                            </IconButton>
                            </CardActions> 
                            </div>
            }
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
    <div> 
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
         {this.state.loaded && this.state.audio != null  ? <AudioPlayer audio_url={'http://localhost:8000'+this.state.audio.file}></AudioPlayer> : <div>Page has no audio</div>}
         </div>
         </div>
      </div>
      </MuiThemeProvider>
      </div>
    );
  }
}
