import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import { base_url } from "../../App";
import Axios from 'axios';

const pagestyle = {
    "display": "block",
    "padding-bottom": "5px",
    "padding-left": "5px",
    "padding-right":"5px",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-bottom": "5px",
    "width": "45%",
    "height": "4vh"
  }

const contentStyle = {
    "display": "block",
    "padding-bottom": "5px",
    "padding-left": "10px",
    "padding-right":"5px",
    "padding-top": "0px",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-bottom": "5px",
    "height": "4vh"
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

    componentDidUpdate(props) {
        if (props.page.name !== this.state.page.name) {
            this.setState({
                page: props.page
            });
        }
    }

    sendPage = (pk) => {
        if (window.confirm("Are you sure you want to send this page to the prof?")) {
            const sendUrl = `${base_url}notebooks/send/page/${pk}`;
            Axios.get(sendUrl)
            .catch(function (error) {
                alert(error.response.data["message"]);
            });
        }
    }

    render(){
    var self = this;
    let isStudent = self.state.parent.state.user.type === "student";
    if(this.state.page != undefined){
      return(
      <div>
        <Card border={1} style={pagestyle} borderColor={"#09d3ac"} onClick={() => self.state.parent.switchPage(self.state.pages.indexOf(self.state.page))}>
            <CardContent style={contentStyle}>
                <Typography align={'center'}>
                    Page {self.state.pages.indexOf(self.state.page)+1}
                    {isStudent && 
                        <IconButton aria-label="delete icon" onClick={() => self.sendPage(self.state.page.pk)}>
                            <SendIcon/>
                        </IconButton>
                    }
                </Typography>
                
            </CardContent>
            </Card>
            </div>
            )
    }
    else{
        return <div></div>
    }
}
  }
export default PageCard;