import React, { Component } from "react";
import axios from "axios";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { url } from "../../App";

export default class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:  '',
        professorId: '',
        building:  '',
        room:  '',
        time:  '',
        serial: '',
        pk: 0
    };

    this.getValues();
    this.getValues = this.getValues.bind(this);
  }

  getValues() {
    var that = this;
    const getUrl = `${url}courses/edit/${this.props.match.params.course_name}/${this.props.match.params.building}/${this.props.match.params.room}/${this.props.match.params.time}`;
    axios.get(getUrl)
        .then(function (response) {
            that.setState({
                name: response.data["course_name"],
                professorId: response.data["professorID"],
                building: response.data["building"],
                room: response.data["room"],
                time: response.data["time"],
                serial: response.data["lamp_serial"],
                pk: response.data["pk"]
            });
        })
        .catch(function (error) {
            alert(error);
        });
  }
  
  handleSubmit() {
      const data = new FormData();
      data.append("courseName", this.state.name);
      data.append("professorId", this.state.professorId);
      data.append("building", this.state.building);
      data.append("room", this.state.room);
      data.append("time", this.state.time);
      data.append("lamp_serial", this.state.serial);
      const putUrl = `${url}courses/edit/${this.state.pk}`;
      axios.post(putUrl, data)
        .then(function (response) {
            if (response.status === 200) {
                alert("Edits have been saved!");
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