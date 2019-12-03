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
            pk: 0
        };

        this.getValues();
        this.getValues = this.getValues.bind(this);
    }
    
    getValues() {
        var that = this;
        if (this.state.name !== "") {
            const getUrl = `${base_url}courses/edit/${this.state.name}/${this.state.building}/${this.state.room}/${this.state.time}`;
            axios.get(getUrl)
                .then(function (response) {
                    that.setState({
                        name: response.data["course_name"],
                        professorId: response.data["professorID"],
                        building: response.data["building"],
                        room: response.data["room"],
                        time: response.data["time"],
                        serial: response.data["lamp_serial"],
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
        data.append("professorId", this.state.professorId);
        data.append("building", this.state.building);
        data.append("room", this.state.room);
        data.append("time", this.state.time);
        data.append("lamp_serial", this.state.serial);
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
                    "room": that.state.room
                });
            })
            .catch(function (error) {
                alert("Edits were not saved. There might be a conflicting class!");
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

export default classModal;