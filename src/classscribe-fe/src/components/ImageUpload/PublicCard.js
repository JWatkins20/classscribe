import React, { Component, } from "react";
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple, red, pink, blue, lightGreen } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { ListItem } from "@material-ui/core";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';

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
    width: 30, height: 30
  },
 {
    backgroundColor: deepPurple[500],
    width: 30, 
    height: 30
  },
  {
    backgroundColor: blue[500],
    width: 30, 
    height: 30
  },
  {
    backgroundColor: lightGreen[500],
    width: 30, height: 30
  },
  {
    backgroundColor: pink[500],
    width: 30, height: 30
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
        <ListItem style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} id={"public"+String(this.state.name)} divider={Divider} button selected={this.props.isSelected} onClick={(event)=>{this.props.onClick(event, this.state.id); this.setState({state: this.state})}}>
          <Tooltip title={'Shared By: '+this.state.sharedBy.username}>
          <ListItemAvatar style={{width: 35, height: 35}}>
          <Avatar style={avatarr[this.state.sharedBy.pk % 5]}>{self.state.sharedBy.username.charAt(0)}</Avatar> 
          </ListItemAvatar>
          </Tooltip>
          <Typography style={{padding: "0", paddingRight: 15, paddingLeft: 15}} align={'center'} variant={"h6"}>
            {this.state.name}
          </Typography>
          <Rating 
            readOnly={true}
            name="display_rating"
            value={this.props.rating}
            />
            <Typography style={{padding: "0", paddingRight: 15, paddingLeft: 15, fontSize: 12}} align={'center'}>
            ({this.props.numberOfRatings})
          </Typography>
      </ListItem> 
            )
    }
}
export default PublicCard;