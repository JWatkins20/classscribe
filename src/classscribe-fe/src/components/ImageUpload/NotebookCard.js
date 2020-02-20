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
import Avatar from '@material-ui/core/Avatar';
import Toggle from './toggle';
import PageCard from './PageCard';
import { base_url } from "../../App"
import Axios from 'axios';
import Popup from "reactjs-popup";
import PublicCard from './PublicCard'
import { SelectableGroup, createSelectable } from 'react-selectable';
import List from './List'


  const notestyle = {
    display: "block",
    paddingTop: "3px",
    paddingLeft: "3px",
    paddingBottom: "3px",
    paddingRight:"3px",
    marginLeft: "auto",
    marginRight: "auto",
   }

   const leftModalStyle = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'spaced-evenly',
    alignItems: 'center'
  }
  const RightModalStyle = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const modalStyle = {
    display: 'flex',
    flexDirection: 'row',
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
            checked: props.note.Private,
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

    handleSelection (key) {
      this.setState({ selectedKeys: this.state.selectedKeys.shift(key) });
      console.log(this.state.selectedKeys)
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
                  <CardActions style={{justifyContent: 'center'}}>
                    {self.state.parent.state.public ? <div>Shared by: {self.state.note.owner.username}</div> :
                    <div>
                    <Toggle parent={self} />
                    <IconButton aria-label="edit icon" onClick={(event) => self.handleEditNotebook(self.state.note)}>
                    <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete icon" onClick={(event) => self.deleteNotebook(self.state.note.pk)}>
                      <DeleteForeverIcon/>
                    </IconButton>
                    <Popup modal trigger={
                      <IconButton aria-label="explore icon" onClick={this.props.showModal}>
                        <ExploreIcon />
                      </IconButton>}>
                        <div style={modalStyle}>
                        <div style={leftModalStyle} >
                        <SelectableGroup onSelection={this.handleSelection}>
                        {this.state.parent.state.public_items.map((item, i) => {
          	              let selected = this.state.selectedKeys !== undefined ? this.state.selectedKeys.indexOf(item.pk) > -1 : false;
          	              return (
          		              <PublicCard name={item.name} sharedBy={item.owner} key={i} isSelected={selected} selectableKey={item.pk} />
          	              );
                          })}
                          {/* <List items={self.state.parent.state.public_items} /> */}
                        </SelectableGroup>
                        </div>
                        <div style={RightModalStyle}>
                          Select a public notebook to save
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