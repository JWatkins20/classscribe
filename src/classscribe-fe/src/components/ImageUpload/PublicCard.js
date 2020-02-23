import React, { Component, } from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple, red, pink, blue, lightGreen } from '@material-ui/core/colors';
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
import { ListItem } from "@material-ui/core";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {List} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const selectedStyle = {
  background: 'blue',
}

const cardStyle = {
  width: '15vw',
  height: '10vh'
}

var avatarr =[ 
  {
    backgroundColor: deepOrange[500],
  },
 {
    backgroundColor: deepPurple[500],
  },
  {
    backgroundColor: blue[500],
  },
  {
    backgroundColor: lightGreen[500],
  },
  {
    backgroundColor: pink[500],
  },
]

class PublicCard extends Component{
    constructor(props){
        super(props);
        this.state = {
          name: props.name,
          id: props.id,
          sharedBy: props.sharedBy,
          selectableRef: props.selectableRef,
          isSelected: props.isSelected,
          isSelecting: props.isSelecting,
          color: 0,
          hover: false,
        };
    }

    // toggleHover = () => {
    //   this.setState({hover: !this.state.hover})
    // }


    render(){
    var self = this;
    var cardStyle = {}
    if(this.state.hover){
      cardStyle = {backgroundColor: 'gray'}
    }
    else{
      cardStyle = {backgroundColor: 'white'}
    }
    console.log(this.state.isSelected)
      return(
        <ListItem divider={Divider} button selected={this.props.isSelected} onClick={(event)=>{this.props.onClick(event, this.state.id); this.setState({state: this.state})}}>
          <Typography style={{padding: "0"}} align={'center'} variant={"h6"}>
            {this.state.name}
          </Typography>
          <ListItemAvatar>
          <Avatar style={avatarr[this.state.sharedBy.pk % 5]}>{self.state.sharedBy.username.charAt(0)}</Avatar> 
          </ListItemAvatar>
      </ListItem> 
            )
    }
}
export default PublicCard;