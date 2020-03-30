import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'


class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parent: props.parent,
        };
    }

    render(){
        return(
            <FormControlLabel
            id="toggle"
                control={
                    <Switch id="switch" role="pub_switch" checked={this.state.parent.state.checked} onChange={(event) => this.state.parent.handleSwitch(event)} value="checked" />
                } label="Private"/>
        )
    }
}

export default Toggle;