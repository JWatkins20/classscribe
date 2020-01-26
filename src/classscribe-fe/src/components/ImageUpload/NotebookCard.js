import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import Toggle from './Toggle';
import PageCard from './PageCard';
import { base_url } from "../../App"
import Axios from 'axios';




  const notestyle = {
    "display": "block",
    "padding-top": "3px",
    "padding-left": "3px",
    "padding-bottom": "3px",
    "padding-right":"3px",
    "margin-left": "auto",
    "margin-right": "auto",
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
            checked: props.note.Private,
            edit: false,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleEditNotebook = this.handleEditNotebook.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEditNotebook = (notebook) => {
      this.setState({edit:true})
      this.setState({state:this.state});
  
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

    componentDidUpdate(props) {
        if (props.note != this.state.note) {
            this.setState({
              note: props.note,
              notes: props.notes,
              parent: props.parent
            });
        }
    }

    render(){
      var self = this
    if(this.state.parent != undefined){
      var pageslist = self.state.parent.state.pages.map(function(page){
        return (<PageCard parent={self.state.parent} page={page} pages={self.state.parent.state.pages}  />) //onClick={() => self.switchPage(pages.indexOf(page))}
      })
      return(
    <div>
        <div style={notestyle}>  
            <Card style={notecardstyle} border={1} borderColor={"#09d3ac"} onClick={(event) => self.state.parent.switchNote(this.state.notes.indexOf(this.state.note))}>
                {self.state.edit ? //conditional render based on whether editing process has been initiated
                <div style={{display: 'inline-block'}}>
                  <CardContent>
                    <form>
                      <TextField style={textfieldstyle} id="standard-basic" label="new name" onChange={(event)=>self.handleNameChange(event)} />
                      <Button style={buttonstyle} variant="contained" onClick={(event) => self.handleSubmit(event)}>Done</Button>
                    </form> 
                  </CardContent>
                  </div>:
                  <div>
                  <CardContent>
                    <Typography style={{padding: "0"}} align={'center'} variant={"h6"}>
                      {self.state.note.name}
                    </Typography> 
                  </CardContent>
                  <CardActions>
                    {self.state.parent.state.public ? <div>Shared by: {self.state.note.owner.username}</div> :
                    <div>
                    <Toggle parent={self} />
                    <IconButton aria-label="edit icon" onClick={() => self.handleEditNotebook(self.state.note)}>
                    <EditIcon />
                    </IconButton>
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