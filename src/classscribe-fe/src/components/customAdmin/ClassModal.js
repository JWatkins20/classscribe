import React from 'react';
import axios from "axios";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { base_url } from "../../App";

const $ = require('jquery');

class ClassModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:  props.name || "",
            professorId: props.professor,
            building: props.building || $('#building-select')[0] && $('#building-select')[0].innerText,
            room: props.room || $('#room-select')[0] && $('#room-select')[0].innerText,
            days: props.days && props.days || "",
            time: props.start && props.end && props.start.format('H:mm') + "-" + props.end.format('H:mm'),
            serial: props.lamp || $('#lamp-serial')[0] && $('#lamp-serial')[0].value,
            semester: props.semester || $('#semester-select')[0] && $('#semester-select')[0].innerText,
            pk: 0,
            mondaySelected: props.days && props.days.indexOf("M") > -1,
            tuesdaySelected: props.days && props.days.indexOf("Tu") > -1,
            wednesdaySelected: props.days && props.days.indexOf("W") > -1,
            thursdaySelected: props.days && props.days.indexOf("Thu") > -1,
            fridaySelected: props.days && props.days.indexOf("F") > -1
        };
        
        this.getValues();
        this.getValues = this.getValues.bind(this);
    }

    

    checkInput = (field) => {
        let map = {  // Regular expressions to match time format and serial number
            "time": "[0-9]{1,2}:[0-9]{2,2}-[0-9]{1,2}:[0-9]{2,2}$",
            "days": "[M\@WF\!]{1,}",
            "serial": "[0-9a-f]{16,16}$",
            "courseSemester": "(Fall|Spring) [0-9]{4,4}$"
        };
        let valMap = {
            "courseSemester": this.state.semester,
            "courseName": this.state.name,
            "professorId": this.state.professorId,
            "building": this.state.building,
            "room": this.state.room,
            "time": this.state.time,
            "serial": this.state.serial
        };

        if (field === "days") {
            let val = this.state.days;
            val = val.replace("Thu", "!");
            val = val.replace("Tu", "@");
            return val.search(RegExp(map[field], 'g')) == 0;
        }

        if (field === "time" || field === "serial" || field === "courseSemester") {
            let val = valMap[field];
            val = val.replace("Thu", "!");
            val = val.replace("Tu", "@");
            return val === "" || val.search(RegExp(map[field], 'g')) == 0;
        }
        else {
            let val = valMap[field];
            return val && val.length > 0;
        }
    }
    
    getValues = () => {
        var that = this;
        if (this.state.name !== "") {
            const getUrl = `${base_url}courses/edit/${this.state.semester}/${this.state.name}/${this.state.building}/${this.state.room}/${this.state.days} ${this.state.time}`;
            axios.get(getUrl)
                .then(function (response) {
                    that.setState({
                        name: response.data["course_name"],
                        professorId: response.data["professorID"],
                        building: response.data["building"],
                        room: response.data["room"],
                        time: response.data["time"].split(" ")[1],
                        serial: response.data["lamp_serial"],
                        semester: response.data["semester"],
                        pk: response.data["pk"] || 0
                    });
                });
        }
    }

    handleRemove = () => { // Not tested because it is something set by the react package
        this.props.onRemove();
    }

    handleSubmit = () => {
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
        if (!this.checkInput("days")) {
            alert("Please select at least one day!");
            return;
        }
        data.append("time", this.state.days.concat(" ", this.state.time));
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
        if (this.state.pk !== 0) { // Not tested because frontend doesn't have access to backend to use pks during testing
            alert("editing course");
            putUrl = `${base_url}courses/edit/${this.state.pk}`;
        }
        else {
            alert("creating new course");
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
                            maxlength="64"
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

                        <ToggleButtonGroup
                            aria-label="day selector"
                            id="days"
                        >
                            <ToggleButton
                                id="monToggle"
                                value="M"
                                aria-label="Monday"
                                selected={this.state.mondaySelected}
                                onClick={() => this.setState({
                                    mondaySelected: !this.state.mondaySelected,
                                    days: this.state.days.indexOf("M") === -1 ? this.state.days.concat("M") : this.state.days.replace("M", "")
                                })}
                            >
                                Mon
                            </ToggleButton>
                            <ToggleButton
                                id="tueToggle"
                                value="Tu"
                                aria-label="Tuesday"
                                selected={this.state.tuesdaySelected}
                                onClick={() => this.setState({
                                    tuesdaySelected: !this.state.tuesdaySelected,
                                    days: this.state.days.indexOf("Tu") === -1 ? this.state.days.concat("Tu") : this.state.days.replace("Tu", "")
                                })}
                            >
                                Tue
                            </ToggleButton>
                            <ToggleButton
                                id="wedToggle"
                                value="W"
                                aria-label="Wednesday"
                                selected={this.state.wednesdaySelected}
                                onClick={() => this.setState({
                                    wednesdaySelected: !this.state.wednesdaySelected,
                                    days: this.state.days.indexOf("W") === -1 ? this.state.days.concat("W") : this.state.days.replace("W", "")
                                })}
                            >
                                Wed
                            </ToggleButton>
                            <ToggleButton
                                id="thuToggle"
                                value="Th"
                                aria-label="Thursday"
                                selected={this.state.thursdaySelected}
                                onClick={() => this.setState({
                                    thursdaySelected: !this.state.thursdaySelected,
                                    days: this.state.days.indexOf("Thu") === -1 ? this.state.days.concat("Thu") : this.state.days.replace("Thu", "")
                                })}
                            >
                                Thu
                            </ToggleButton>
                            <ToggleButton
                                id="friToggle"
                                value="F"
                                aria-label="Friday"
                                selected={this.state.fridaySelected}
                                onClick={() => this.setState({
                                    fridaySelected: !this.state.fridaySelected,
                                    days: this.state.days.indexOf("F") === -1 ? this.state.days.concat("F") : this.state.days.replace("F", "")
                                })}
                            >
                                Fri
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <br/>

                        <TextField
                            id="time"
                            maxlength="20"
                            floatingLabelText="Meeting Times"
                            floatingLabelFixed={true}
                            defaultValue={this.state.time}
                            onBlur = {(event) => this.setState({time: event.target.value})}
                            errorText = {!this.checkInput("time") && "Please enter the time span of the class. The following example spans from 11AM to 1PM: 11:00-13:00"}
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

                        <RaisedButton id="submitButton" label="Submit" primary={true} onClick={(event) => this.handleSubmit()}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default ClassModal;
