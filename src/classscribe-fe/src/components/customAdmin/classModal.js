import React from 'react';
import axios from "axios";

import * as $ from 'jquery';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { base_url } from "../../App";

class classModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:  props.name || "",
            professorId: props.professor,
            building:  $('#building-select')[0].innerText,
            room:  $('#room-select')[0].innerText,
            time:  (props.days || "") + " " + props.start.format('H:mm') + "-" + props.end.format('H:mm'),
            serial: props.lamp || $('#lamp-serial')[0].value,
            semester: props.semester || $('#semester-select')[0].innerText,
            pk: 0
        };

        this.getValues();
        this.getValues = this.getValues.bind(this);
    }

    checkInput(field) {
        let check = $('#'+field)[0];
        if (!check) {
            return true;
        }
        let map = {  // Regular expressions to match time format and serial number
            "time": "[M\@WF\!]{1,} [0-9]{1,2}:[0-9]{2,2}-[0-9]{1,2}:[0-9]{2,2}$",
            "serial": "[0-9a-f]{16,16}$",
            "courseSemester": "(Fall|Spring) [0-9]{4,4}$"
        }

        if (field === "time" || field === "serial" || field === "courseSemester") {
            let val = $('#'+field)[0].value;
            if (val === "") {
                return true;
            }
            val = val.replace("Thu", "!");
            val = val.replace("Tu", "@");
            return val.search(RegExp(map[field], 'g')) == 0;
        }
        else {
            let val = $('#'+field)[0].value;
            if (val.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    
    getValues() {
        var that = this;
        if (this.state.name !== "") {
            const getUrl = `${base_url}courses/edit/${this.state.semester}/${this.state.name}/${this.state.building}/${this.state.room}/${this.state.time}`;
            axios.get(getUrl)
                .then(function (response) {
                    that.setState({
                        name: response.data["course_name"],
                        professorId: response.data["professorID"],
                        building: response.data["building"],
                        room: response.data["room"],
                        time: response.data["time"],
                        serial: response.data["lamp_serial"],
                        semester: response.data["semester"],
                        pk: response.data["pk"] || 0
                    });
                });
        }
    }

    handleRemove = () => {
        this.props.onRemove();
    }

    handleSubmit() {
        let that = this;
        const data = new FormData();
        data.append("courseName", this.state.name);
        if (!this.checkInput("courseName")) {
            alert("Please enter a valid course name!");
            return;
        }
        data.append("professorId", this.state.professorId);
        if (!this.checkInput("professorId")) {
            alert("Please enter a valid professor ID!");
            return;
        }
        data.append("building", this.state.building);
        if (!this.checkInput("building")) {
            alert("Please enter a valid building!");
            return;
        }
        data.append("room", this.state.room);
        if (!this.checkInput("room")) {
            alert("Please enter a valid room!");
            return;
        }
        data.append("time", this.state.time);
        if (!this.checkInput("time")) {
            alert("Please enter a valid time!");
            return;
        }
        data.append("lamp_serial", this.state.serial);
        if (!this.checkInput("serial")) {
            alert("Please enter a valid lamp serial number!");
            return;
        }
        data.append("semester", this.state.semester);
        if (!this.checkInput("courseSemester")) {
            alert("Please enter a valid semester!");
            return;
        }
        var putUrl;
        if (this.state.pk !== 0) {
            putUrl = `${base_url}courses/edit/${this.state.pk}`;
        }
        else {
            putUrl = `${base_url}courses/create`;
        }
        
        axios.post(putUrl, data)
            .then(function (response) {
                if (response.status === 200) {
                    alert("Edits have been saved!");
                }
                else {
                    alert("Edits were not saved!");
                }
                that.props.onSave({
                    "name": that.state.name,
                    "professor": that.state.professorId,
                    "building": that.state.building,
                    "room": that.state.room,
                    "semester": that.state.semester
                });
            })
            .catch(function (error) {
                alert("Edits were not saved! " + error.response.data["message"]);
            });
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            id="courseSemester"
                            maxlength="12"
                            floatingLabelText="Semester"
                            floatingLabelFixed={true}
                            defaultValue={this.state.semester}
                            onBlur = {(event) => this.setState({semester: event.target.value})}
                            errorText = {!this.checkInput("courseSemester") && "Please enter a semester in terms of Fall or Spring and the year in form YYYY!"}
                        />
                        <br/>

                        <TextField
                            id="courseName"
                            maxlength="50"
                            floatingLabelText="Course Name"
                            floatingLabelFixed={true}
                            defaultValue={this.state.name}
                            onBlur = {(event) => this.setState({name: event.target.value})}
                            errorText = {!this.checkInput("courseName") && "Please enter a course name!"}
                        />

                        <TextField
                            id="professorId"
                            maxlength="7"
                            floatingLabelText="Professor ID"
                            floatingLabelFixed={true}
                            defaultValue={this.state.professorId}
                            onBlur = {(event) => this.setState({professorId: event.target.value})}
                            errorText = {!this.checkInput("professorId") && "Please enter a professor ID!"}
                        />
                        <br/>

                        <TextField
                            id="building"
                            maxlength="50"
                            floatingLabelText="Building Name"
                            floatingLabelFixed={true}
                            defaultValue={this.state.building}
                            onBlur = {(event) => this.setState({building: event.target.value})}
                            errorText = {!this.checkInput("building") && "Please enter a building name!"}
                        />

                        <TextField
                            id="room"
                            maxlength="50"
                            floatingLabelText="Room Number/Name"
                            floatingLabelFixed={true}
                            defaultValue={this.state.room}
                            onBlur = {(event) => this.setState({room: event.target.value})}
                            errorText = {!this.checkInput("room") && "Please enter a room!"}
                        />
                        <br/>

                        <TextField
                            id="time"
                            maxlength="20"
                            floatingLabelText="Meeting Times"
                            floatingLabelFixed={true}
                            defaultValue={this.state.time}
                            onBlur = {(event) => this.setState({time: event.target.value})}
                            errorText = {!this.checkInput("time") && "Please enter a valid meeting time(s) in the form MWF 11:00-13:30 for Mon, Wed, Fri from 11am to 1:30pm. Use 'Tu' for Tuesday and 'Thu' for Thursday!"}
                        />

                        <TextField
                            id="serial"
                            maxlength="16"
                            minlength="16"
                            floatingLabelText="Lamp Serial Number"
                            floatingLabelFixed={true}
                            defaultValue={this.state.serial}
                            onBlur = {(event) => this.setState({serial: event.target.value})}
                            errorText = {!this.checkInput("serial") && "Please enter a valid serial number. It should be 16 hexadecimal characters!"}
                        />
                        <br/>

                        <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleSubmit()}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default classModal;