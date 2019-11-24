import React, { Component } from "react";
import axios from "axios";

import { base_url } from '../../App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        professorId: '',
        building: '',
        room: '',
        time: '',
        serial: '',
    };

    if (props != null) {
        alert("props is not null");
        console.log(props);
        this.setState({time: props});
    }
  }
  
  handleSubmit(event) {
      const data = new FormData();
      data.append("courseName", this.state.name);
      data.append("professorId", this.state.professorId);
      data.append("building", this.state.building);
      data.append("room", this.state.room);
      data.append("time", this.state.time);
      data.append("lamp_serial", this.state.serial);
      axios.post(
          base_url + "courses/create",
          data
      );
  }

  render() {
    return (
        <div style={{textAlign: "center"}}>
            <MuiThemeProvider>
                <div>
                    <TextField
                        id="courseName"
                        floatingLabelText="Course Name"
                        floatingLabelFixed={true}
                        defaultValue={this.state.name}
                        onChange = {(event) => this.setState({name: event.target.value})}
                    />
                    <br/>

                    <TextField
                        id="professorId"
                        floatingLabelText="Professor ID"
                        floatingLabelFixed={true}
                        defaultValue={this.state.professorId}
                        onChange = {(event) => this.setState({professorId: event.target.value})}
                    />
                    <br/>

                    <TextField
                        id="building"
                        floatingLabelText="Building Name"
                        floatingLabelFixed={true}
                        defaultValue={this.state.building}
                        onChange = {(event) => this.setState({building: event.target.value})}
                    />
                    <br/>

                    <TextField
                        id="room"
                        floatingLabelText="Room Number/Name"
                        floatingLabelFixed={true}
                        defaultValue={this.state.room}
                        onChange = {(event) => this.setState({room: event.target.value})}
                    />
                    <br/>

                    <TextField
                        id="time"
                        floatingLabelText="Meeting Times"
                        floatingLabelFixed={true}
                        defaultValue={this.state.time}
                        onChange = {(event) => this.setState({time: event.target.value})}
                        helperText="Please enter the meeting day in following this format: MWF 12pm-12:50pm. This class would meet Monday, Wednesday, Friday from 12pm to 12:50pm."
                    />
                    <br/>

                    <TextField
                        id="serial"
                        floatingLabelText="Lamp Serial Number"
                        floatingLabelFixed={true}
                        defaultValue={this.state.serial}
                        onChange = {(event) => this.setState({serial: event.target.value})}
                    />
                    <br/>

                    <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleSubmit()}/>
                </div>
            </MuiThemeProvider>
        </div>
    );
  }
}