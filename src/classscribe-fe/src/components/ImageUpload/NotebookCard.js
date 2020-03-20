import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExploreIcon from '@material-ui/icons/Explore';
import CardActions from '@material-ui/core/CardActions';
import { spacing } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import { deepOrange, deepPurple, red, pink, blue, lightGreen } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Toggle from './toggle';
import PageCard from './PageCard';
import { base_url } from "../../App"
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import Popup from "reactjs-popup";
import PublicCard from './PublicCard'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {List} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

  const notestyle = {
    display: "block",
    paddingTop: "3px",
    paddingLeft: "3px",
    paddingBottom: "3px",
    paddingRight:"3px",
    marginLeft: "auto",
    marginRight: "auto",
   }


   const HeaderModalStyle = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
  const ContentModalStyle = {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const ButtonModalStyle = {
    flex: .25,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const modalStyle = {
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  const SubHeaderModalStyle ={
    flex: .25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  
  const notecardstyle = {
     width: '100%',
     height: '100%'
  }

  var avatarr =[ 
    {
      backgroundColor: deepOrange[500],
      height: 30, 
      width: 30,
      marginRight: 0
    },
   {
      backgroundColor: deepPurple[500],
      height: 30, 
      width: 30,
      marginRight: 0,
    },
    {
      backgroundColor: blue[500],
      height: 30, 
      width: 30,
      marginRight: 0,
    },
    {
      backgroundColor: lightGreen[500],
      height: 30, 
      width: 30,
      marginRight: 0,
    },
    {
      backgroundColor: pink[500],
      height: 30, 
      width: 30,
      marginRight: 0
    },
  ]

class NotebookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            note: props.note,
            notes: props.notes,
            parent: props.parent,
            edit: false,
            notebookname: "",
            notebookprivate: false,
            selectedKeys: [],
            checked: props.note!==undefined ? props.note.Private : false,
            edit: false,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleEditNotebook = this.handleEditNotebook.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this)
    }

    handleEditNotebook = (notebook) => {
      this.setState({edit:true})
  
    }

    calculateRating = (note) => {
      let sum = 0;
      for(var i = 0; i < note.ratings.length; i++){
        sum = sum + note.ratings[i].rating
      }
      return ((sum*(1.0))/note.ratings.length) * 5
    }

    deleteNotebook = (pk) => {
      let that = this;
      if (window.confirm("Are you sure you want to delete this notebook?")) {
        const deleteUrl = `${base_url}notebooks/delete/${pk}`;
        axios.delete(deleteUrl)
          .catch(function (error) {
            alert(error.response.data["message"]);
          });
        window.location.reload();
      }
    }

    async handleSwitch(event){
      var data = {
        'pk' : this.state.note.pk,
      }
      let self = this
      const url = `${base_url}notebooks/privacy-toggle/`;
      await axios.post(url, data)
          .then(function (response) {
              if (response.status === 200) {
                self.setState({checked: event.target.checked})
                self.state.parent.changePrivacy(this.state.parent.state.notebook)
              }
          })
          .catch(function (error) {
              alert("Edits were not saved. Check the console for the error!");
              console.log(error);
          });
  
    }

    rateNotebook(note, user, rating){
      console.log(user)
      const payload= {
        'note_pk': note.pk,
        'user_pk': user.pk,
        'rating': rating
      }
      axios.post(base_url+'notebooks/rate/', payload).then(function(res){
        if(res.status === 201){
          console.log('rating applies')
        }
        else if(res.status === 200){
          console.log('user already rated notebook')
        }
      }).then(async()=>this.state.parent.updateUser()).catch((err)=>{console.log('rating was not applied :(')})
    }

    handleNameChange(event){
      this.setState({notebookname: event.target.value})
    }

    handleSelection = (event, id) => {
      var dummy = this.state.selectedKeys
      if(this.state.selectedKeys.indexOf(id) < 0){
        dummy.unshift(id)
        this.setState({selectedKeys: dummy})
      }
      else{
        dummy.splice(dummy.indexOf(id), 1)
        this.setState({selectedKeys: dummy})
      }
    }


    async handleSubmit(event){
      if(this.state.notebookname === ""){
        return
      }
      this.setState({edit: false})
      
      var dummy = this.state.parent.state.items
      dummy[this.state.parent.state.items.indexOf(this.state.note)].name = this.state.notebookname
      this.state.parent.updateCards(dummy)
      
      var data = {
        'pk' : this.state.note.pk,
        'name': this.state.notebookname,
        //'private': this.state.notebookprivate
      }
      const url = `${base_url}notebooks/edit/`;
      await axios.post(url, data)
          .then(function (response) {
              if (response.status === 200) {
                  
              }
          })
          .catch(function (error) {
              alert("Edits were not saved. Check the console for the error!");
              console.log(error);
          });
  
    }

    componentDidUpdate(props, state) {
        if (props.notes != state.notes) {
            this.setState({
              note: props.note,
              notes: props.notes,
              parent: props.parent
            });
        }
    }

    async toggleSDAC(pk) {
      let that = this;
      if (window.confirm("Are you sure you want to change the SDAC status of this notebook?")) {
        const getUrl = `${base_url}notebooks/toggle_sdac/${pk}`;
        axios.get(getUrl)
          .catch(function (error) {
            alert("Couldn't find the notebook.");
          });
        that.state.note.sdac_ready = !that.state.note.sdac_ready;
      }
    }

    // handleSelection (key) {
    //   this.setState({ selectedKeys: this.state.selectedKeys.shift(key) });
    // }

    async favorite(){
      var self = this
      
      if(this.state.selectedKeys.length > 0){
        const url = `${base_url}notebooks/favorite/`;
        var data2 = {
          'user_pk': this.state.parent.state.user.pk,
          'books_pk': this.state.selectedKeys
        }
        await axios.post(url, data2).then(async function(res){
          if(res.status == 201){
            self.setState({selectedKeys: []})
            await self.props.onUpdatePublic()
            self.state.parent.switchNote(self.state.notes.indexOf(self.state.note))
          }
        }).catch((err)=>{
          alert('Was unable to add books!')
        })
      }
    }

    async removeSavedNotebook(key){
      var self = this
        const url = `${base_url}notebooks/unfavorite/`;
        var data2 = {
          'user_pk': this.state.parent.state.user.pk,
          'book_pk': key.pk
        }
        await axios.post(url, data2).then(async function(res){
          if(res.status == 201){
            console.log('successfully removed item')
            await self.props.onUpdateUser()
            self.state.parent.switchNote(self.state.notes.indexOf(self.state.note))
          }
        }).catch((err)=>{alert('Was unable to remove books!')})
        // dummy = dummy.favoritedBooks.splice(dummy.favoritedBooks.indexOf())
        // this.setState({state: this.state})
    }

    render(){
      var self = this
    if(this.state.parent != undefined){
      var pageslist = self.state.parent.state.pages.map(function(page){
        return (<PageCard parent={self.state.parent} page={page} pages={self.state.parent.state.pages}  />) //onClick={() => self.switchPage(pages.indexOf(page))}
      })
      var self = this
      var publics = this.state.parent.state.public_items.sort(function(a, b){
        if(self.calculateRating(a) < self.calculateRating(b)){
          return 1
        }
        else if(self.calculateRating(a) > self.calculateRating(b)){
          return -1
        }
        else{
          return 0
        }
      }).map((item, i) => {
        let selected = this.state.selectedKeys !== undefined ? this.state.selectedKeys.indexOf(item.pk) > -1 : false;
        let averageRating = item.ratings.length !== 0 ? this.calculateRating(item) : 0
        return (
          <PublicCard name={item.name} sharedBy={item.owner} id={item.pk} isSelected={selected} onClick={this.handleSelection} selectableKey={item.pk} numberOfRatings={item.ratings.length} rating={averageRating} precision={0.5} />
        );
        })
      return(
    <div>
        <div style={notestyle}>  
            <Card style={notecardstyle} label='notebookcard' border={1} borderColor={"#09d3ac"} onClick={async(event) => { await self.state.parent.switchNote(this.state.notes.indexOf(this.state.note))}}>
                {self.state.edit ? //conditional render based on whether editing process has been initiated
                <div style={{display: 'inline-block'}}>
                  <CardContent>
                    <form>
                      <TextField id="newName" inputProps={{"data-testid": "content-input"}} value={this.notebookname} style={textfieldstyle} label="new name" onChange={(event)=>self.handleNameChange(event)} />
                      <Button role='edit-submit-button' id="submit-name" style={buttonstyle} aria-label="submit name change" variant="contained" onClick={(event) => self.handleSubmit(event)}>Done</Button>
                    </form> 
                  </CardContent>
                  </div>:
                  <div>
                  <CardContent>
                    <Typography style={{padding: "0"}} align={'center'} variant={"h6"}>
                      {self.state.note.name}
                    </Typography>
                  </CardContent>
                  <CardActions style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    {self.state.parent.state.public && self.state.note.owner && self.state.note.owner.username ? <div style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <IconButton className='remove' aria-label="remove icon" onClick={(event) => this.removeSavedNotebook(self.state.note)}>
                    <HighlightOffRoundedIcon />
                    </IconButton>
                    {self.state.parent.state.user.ratings.filter(function(item){
                      return item.notebook.pk === self.state.note.pk
                    }).length !== 0 ? self.state.parent.state.user.ratings.filter(function(item){
                      return item.notebook.pk === self.state.note.pk
                    })[0].rating === 1 
                    ? 
                    <div>
                    <IconButton id='up' color={'primary'} aria-label="up rating icon" onClick={(event) => this.rateNotebook(self.state.note, self.state.parent.state.user, 1)}>
                    <ThumbUpIcon />
                    </IconButton>
                    <IconButton id='down' aria-label="down rating icon" onClick={(event) => this.rateNotebook(self.state.note, self.state.parent.state.user, 0)}>
                    <ThumbDownIcon />
                    </IconButton> </div>:
                    <div><IconButton id='up' aria-label="up rating icon" onClick={(event) => this.rateNotebook(self.state.note, self.state.parent.state.user, 1)}>
                    <ThumbUpIcon/>
                    </IconButton>
                    <IconButton id='down' color={'primary'} aria-label="down rating icon" onClick={(event) => this.rateNotebook(self.state.note, self.state.parent.state.user, 0)}>
                    <ThumbDownIcon />
                    </IconButton></div> : 
                    <div><IconButton id='up' aria-label="up rating icon" onClick={(event) => this.rateNotebook(self.state.note, self.state.parent.state.user, 1)}>
                    <ThumbUpIcon/>
                    </IconButton>
                    <IconButton id='down' aria-label="down rating icon" onClick={(event) => this.rateNotebook(self.state.note, self.state.parent.state.user, 0)}>
                    <ThumbDownIcon />
                    </IconButton></div>}
                    <Tooltip  style={{margin: 0}} title={'Shared By: '+this.state.parent.state.user.username}>
                        <Avatar m={0} style={avatarr[this.state.parent.state.user.pk % 5]}>{self.state.parent.state.user.username.charAt(0)}</Avatar> 
                      </Tooltip>
                    </div> :
                    <div>
                    <Toggle parent={self} />
                    <IconButton role="edit-button" id='editButton' aria-label="edit icon" onClick={(event) => self.handleEditNotebook(self.state.note)}>
                    <EditIcon />
                    </IconButton>
                    <IconButton className='delete' aria-label="delete icon" onClick={(event) => self.deleteNotebook(self.state.note.pk)}>
                      <DeleteForeverIcon/>
                    </IconButton>
                    <Popup modal id="popup" contentStyle={{borderRadius: '20px'}} trigger={
                      <IconButton id="ex" aria-label="explore icon">
                        <ExploreIcon />
                      </IconButton>}>
                        {close=>(
                        <div style={modalStyle}>
                        <div style={HeaderModalStyle}>
                          <h2>Public notebooks for course: {this.state.note.class_name}</h2>
                        </div>
                        <div style={SubHeaderModalStyle}>
                          <h5 style={{alignSelf: 'flex-end', color: 'gray', margin: 0}}>Select a notebook to save to it your collection</h5>
                        </div>
                        <div style={ContentModalStyle} >
                        <List children={publics}></List>
                          {/* <List items={self.state.parent.state.public_items} /> */}
                        </div>
                        <div style={ButtonModalStyle}>
                          <Button id="submitFavorite" onClick={(event)=>{this.favorite(); setTimeout(()=>{close()}, 400)}} style={{backgroundColor: '#3f51b5', color: 'white', textAlign: 'center'}}>Add to collection</Button>
                        </div>
                        </div>
                        )}
                      </Popup>
                    </div>
                    } 
                    {self.state.parent.state.public && self.state.parent.state.user.type == "teacher" ?
                      !self.state.note.sdac_ready ?
                        <div align={'center'}>
                          <Chip
                            label="Mark as SDAC ready"
                            clickable
                            color="primary"
                            onClick={() => this.toggleSDAC(self.state.note.pk)}
                          />
                        </div> : 
                        <div align={'center'}>
                        <Chip
                          label="Remove SDAC ready"
                          clickable
                          color="secondary"
                          onClick={() => this.toggleSDAC(self.state.note.pk)}
                        />
                      </div> :
                      self.state.note.sdac_ready &&
                      <div align={'center'}>
                        <Chip
                          label="SDAC Ready!"
                          color="primary"
                        />
                      </div>
                    }
                    </CardActions>
                    </div>
                      }
                    </Card> 
                    </div>
                    <div>

                    {self.state.parent.state.notebook === self.state.notes.indexOf(self.state.note) ? pageslist : <div></div>}
                    </div>
                    </div>
                )
  }
  else{
      return <div></div>
  }
}
}

export default NotebookCard;
