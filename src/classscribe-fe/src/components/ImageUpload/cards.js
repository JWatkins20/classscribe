import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import Toggle from './toggle';


const pagestyle = {
    "display": "block",
    "padding-top": "3px",
    "padding-bottom": "3px",
    "padding-left": "5px",
    "padding-right":"5px",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-bottom": "5px",
    "width": "45%",
    "height": "6vh"
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

class PageCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parent: props.parent,
            page: props.page,
            pages: props.pages,
        };
    }

    render(){
    if(this.page != undefined){
      return(
      <div style={pagestyle}>
        <Card border={1} borderColor={"#09d3ac"} onClick={() => this.parent.switchPage(this.pages.indexOf(this.page))}>
            <CardContent>
                <Typography align={'center'}>
                    Page {this.pages.indexOf(this.page)+1}
                </Typography>
            </CardContent>
            </Card>
            </div>
            )
    }
}
  }
export default PageCard;


class NotebookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parent: props.parent,
            note: props.page,
            notes: props.notes,
            edit: props.edit,
            public: props.public, //toggles display of public/student notebooks
            checked: props.checked, //state of private toggle
            pagelist: props.pagelist
        };
    }

    render(){
    if(this.note != undefined){
      return(
    <div>
        <div style={notestyle}>  
            <Card style={notecardstyle} border={1} borderColor={"#09d3ac"} onClick={() => this.parent.switchNote(this.notes.indexOf(this.publicnote))}>
                {this.edit ? //conditional render based on whether editing process has been initiated
                <div style={{display: 'inline-block'}}>
                  <CardContent>
                    <form>
                    <TextField style={textfieldstyle} id="standard-basic" label="new name" onChange={(event)=>this.parent.handleNameChange(event)} />
                    <Button style={buttonstyle} variant="contained" onClick={(event) => this.parent.handleSubmit(event)}>Done</Button>
                    </form> 
                  </CardContent>
                  </div>:
                  <div>
                  <CardContent>
                    <Typography style={{padding: "0"}} align={'center'} variant={"h6"}>
                      {props.note.name}
                    </Typography> 
                    </CardContent>
                    <CardActions>
                    {this.public ? <div>Shared by: {this.note.owner.username}</div> :
                    <div>
                    <Toggle parent={this.parent} />
                    <IconButton aria-label="edit icon" onClick={() => this.parent.handleEditNotebook(this.note)}>
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
                    {this.note.pk === this.notes[this.parent.notebook].pk ? this.pagelist : null}
                    </div>
                    </div>
                )
  }
}
}
export default NotebookCard;