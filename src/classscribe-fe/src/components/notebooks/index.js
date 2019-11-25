import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from 'material-ui/AppBar';
import React, {Component} from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import ImageCarousel from "../ImageUpload/index";
import { url } from '../../App';
import { base_url } from "../../App"
import { mergeClasses } from '@material-ui/styles';

var history = window.history;



class NotebookViewer extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            pages: [],
            user: {},
            page: 0,
            notebook: 0,
        }
        this.loadUser = this.loadUser.bind(this);
    }

    
    componentDidMount() {
        this.loadUser();
    }

    async loadUser(){
        const res = await Axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}});
        if(res.status === 200){
            const user = res.data;
            console.log(user.username);
            this.setState({user:user});
        }
        this.loadNotes();

    }

    async loadNotes()
  {
    const res = await Axios.get(base_url + "notebooks/get/"+this.state.user.pk+"/").then((res) =>{
    
    if(res.status===200){
      const data = res.data.data;
      //console.log(data[1].pages[0].snapshots[1].file);
      this.setState({items:data});
      if(!data[this.state.notebook].pages === undefined && !data[this.state.notebook].pages.length == 0){
      for(var i = 0; i<data[this.state.notebook].pages[this.state.page].snapshots.length; i++){
          this.state.pages.push(data[this.state.notebook].pages[this.state.page].snapshots[i].file);
      }
    }
    }
})
  }


    render(){
        
        var notes = this.state.items;
        if(notes != undefined){
            var notelist = notes.map(function(note){
                return (
                    <div>  
                    <Card style={{width: '18rem'}}>
                        <CardContent><Typography>
                            {note.name}
                        </Typography>
                        <Typography>         
                                    Created by: {note.owner}<br/>
                                    Number of pages: {note.pages.length}<br/>
                                    Course: {note.class_name}
        
                                    </Typography>     
                                </CardContent>
                        </Card>
                        </div>
                )
                })}
        else{
            return(<div>Unable to display notebooks</div>);
        }


    return (
        <MuiThemeProvider>
        <AppBar title="Notebooks"/>
        <div>{this.state.user.username}</div>
        <div>
        
        <div>{notelist}</div>
        </div>
        </MuiThemeProvider>
    );
}
}
export default NotebookViewer;
// <div><ImageCarousel /></div>
