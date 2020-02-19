import React, { Component, } from "react";
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
import { SelectableGroup, createSelectable } from 'react-selectable';
import List from 'react-list-select';


const selectedStyle = {
  background: 'blue',
}

const cardStyle = {
  width: '15vw',
  height: '10vh'
}

class PublicCard extends Component{
    constructor(props){
        super(props);
        this.state = {
          name: props.name,
          key: props.key,
          sharedBy: props.sharedBy,
          selectableRef: props.selectableRef,
          isSelected: props.isSelected,
          isSelecting: props.isSelecting,
          hover: false,
        };
    }

    toggleHover = () => {
      this.setState({hover: !this.state.hover})
    }

    favorite = () => {
      
    }

    render(){
    var self = this;
    var cardStyle = {}
    if(this.state.hover){
      cardStyle = {backgroundColor: 'gray'}
    }
    else{
      cardStyle = {backgroundColor: 'white'}
    }
      return(
        <div ref={this.state.selectableRef}>
        {this.state.isSelected ? <Card onMouseOut={(event)=>this.toggleHover()} onMouseOver={(event)=>this.toggleHover()} style={cardStyle} border={1} borderColor={"#09d3ac"}> 
        <CardContent>
          <Typography style={{padding: "0"}} align={'center'} variant={"h6"}>
            {this.state.name}
          </Typography>
            <Avatar>{self.state.sharedBy.charAt(0)}</Avatar> 
        </CardContent>
      </Card>: <Card onClick={(event) => this.favorite()} onMouseOut={(event)=>this.toggleHover()} onMouseOver={(event)=>this.toggleHover()} style={cardStyle} border={1} borderColor={"#09d3ac"}>
      <CardContent>
          <Typography style={{padding: "0"}} align={'center'} variant={"h6"}>
            {this.state.name}
          </Typography>
            <Avatar>{self.state.sharedBy.charAt(0)}</Avatar> 
        </CardContent>
      </Card>}
        
      </div>
            )
    }
}
export default createSelectable(PublicCard);