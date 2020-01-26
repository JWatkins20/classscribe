import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

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

    render(){
    var self = this
    if(this.state.page != undefined){
      return(
      <div style={pagestyle}>
        <Card border={1} borderColor={"#09d3ac"} onClick={() => self.state.parent.switchPage(self.state.pages.indexOf(self.state.page))}>
            <CardContent>
                <Typography align={'center'}>
                    Page {self.state.pages.indexOf(self.state.page)+1}
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