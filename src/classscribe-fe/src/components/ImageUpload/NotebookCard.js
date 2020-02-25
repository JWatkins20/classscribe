import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExploreIcon from '@material-ui/icons/Explore';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import Avatar from '@material-ui/core/Avatar';
import Toggle from './toggle';
import PageCard from './PageCard';
import { base_url } from "../../App"
import Axios from 'axios';
import Popup from "reactjs-popup";
import PublicCard from './PublicCard'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {List} from '@material-ui/core';
import axios from "axios";


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
      this.setState({state:this.state});
  
    }

    deleteNotebook = (pk) => {
      let that = this;
      if (window.confirm("Are you sure you want to delete this notebook?")) {
        const deleteUrl = `${base_url}notebooks/delete/${pk}`;
        Axios.delete(deleteUrl)
          .catch(function (error) {
            alert(error.response.data["message"]);
          });
        window.location.reload();
      }
    }

    async handleSwitch(event){
      this.setState({checked: event.target.checked})
      this.state.parent.changePrivacy(this.state.parent.state.notebook)
      var data = {
        'pk' : this.state.note.pk,
      }
      const url = `${base_url}notebooks/privacy-toggle/`;
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
      event.preventDefault();
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

    componentDidUpdate(props, state) {
        if (props.notes != state.notes) {
            this.setState({
              note: props.note,
              notes: props.notes,
              parent: props.parent
            });
        }
    }

    handleSelection (key) {
      this.setState({ selectedKeys: this.state.selectedKeys.shift(key) });
    }

    async favorite(){
      var self = this
      
      if(this.state.selectedKeys.length > 0){
        const url = `${base_url}notebooks/favorite/`;
        var data2 = {
          'user_pk': this.state.parent.state.user.pk,
          'books_pk': this.state.selectedKeys
        }
        await Axios.post(url, data2).then(async function(res){
          if(res.status == 201){
            self.setState({selectedKeys: []})
            await self.props.onUpdatePublic()
          }
          else{
            alert('Was unable to add books!')
          }
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
        await Axios.post(url, data2).then(function(res){
          if(res.status == 201){
            console.log('successfully removed item')
          }
          else{
            alert('Was unable to remove books!')
          }
        })
        await this.props.onUpdateUser()
        // dummy = dummy.favoritedBooks.splice(dummy.favoritedBooks.indexOf())
        // this.setState({state: this.state})
    }

    render(){
      var self = this
    if(this.state.parent != undefined){
      var pageslist = self.state.parent.state.pages.map(function(page){
        return (<PageCard parent={self.state.parent} page={page} pages={self.state.parent.state.pages}  />) //onClick={() => self.switchPage(pages.indexOf(page))}
      })
      var publics = this.state.parent.state.public_items.map((item, i) => {
        let selected = this.state.selectedKeys !== undefined ? this.state.selectedKeys.indexOf(item.pk) > -1 : false;
        return (
          <PublicCard name={item.name} sharedBy={item.owner} id={item.pk} isSelected={selected} onClick={this.handleSelection} selectableKey={item.pk} />
        );
        })
      return(
    <div>
        <div style={notestyle}>  
            <Card style={notecardstyle} label='notebookcard' border={1} borderColor={"#09d3ac"} onClick={(event) => self.state.parent.switchNote(this.state.notes.indexOf(this.state.note))}>
                {self.state.edit ? //conditional render based on whether editing process has been initiated
                <div style={{display: 'inline-block'}}>
                  <CardContent>
                    <form>
                      <TextField style={textfieldstyle} id="standard-basic" label="new name" onChange={(event)=>self.handleNameChange(event)} />
                      <Button className="submit-name" style={buttonstyle} aria-label="submit name change" variant="contained" onClick={(event) => self.handleSubmit(event)}>Done</Button>
                    </form> 
                  </CardContent>
                  </div>:
                  <div>
                  <CardContent>
                    <Typography style={{padding: "0"}} align={'center'} variant={"h6"}>
                      {self.state.note.name}
                    </Typography> 
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                    {self.state.parent.state.public ? <div>Shared by: {self.state.note.owner.username}<IconButton className='remove' aria-label="remove icon" onClick={(event) => this.removeSavedNotebook(self.state.note)}>
                    <HighlightOffRoundedIcon />
                    </IconButton></div> :
                    <div>
                    <Toggle parent={self} />
                    <IconButton className='edit' aria-label="edit icon" onClick={(event) => self.handleEditNotebook(self.state.note)}>
                    <EditIcon />
                    </IconButton>
                    <IconButton className='delete' aria-label="delete icon" onClick={(event) => self.deleteNotebook(self.state.note.pk)}>
                      <DeleteForeverIcon/>
                    </IconButton>
                    <Popup modal contentStyle={{borderRadius: '20px'}} trigger={
                      <IconButton aria-label="explore icon" onClick={this.props.showModal}>
                        <ExploreIcon />
                      </IconButton>}>
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
                          <Button onClick={(event)=>{this.favorite()}} style={{backgroundColor: '#3f51b5', color: 'white', textAlign: 'center'}}>Add to collection</Button>
                        </div>
                        </div>
                      </Popup>
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