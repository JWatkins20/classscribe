import React from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';
import classEvent from './classEvent';
import classModal from './classModal';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import Navbar from '../Navbar';

import 'react-week-calendar/dist/style.less';
import Axios from 'axios';
import { base_url, url } from "../../App";

import Cookies from 'js-cookie';

const dayMap = {
    "M": 1,
    "T": 2,
    "W": 3,
    "Thu": 4,
    "!": 4,
    "F": 5
};

export default class CourseCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastUid: 1,
            selectedIntervals: [],
            buildings: [],
            building: "",
            rooms: [],
            room: "",
            serial: "",
            user: null
        }

        this.loadUser();

        this.loadBuildings = this.loadBuildings.bind(this);
        this.loadBuildings();
    }

    loadUser() {
        const that = this;
        Axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}})
            .then(function (response) {
                if (response.status === 200) {
                    const user = response.data;
                    console.log(response);
                    console.log(user.username);
                    that.setState({user});
                }
                else {
                    alert("Something went wrong with call");
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    handleBuildingChange = (event, index, value) => {
        this.setState({
            building: value,
            room: "",
            selectedIntervals: [],
            serial: ""
        });
        this.loadRooms(value);
    }

    handleRoomChange = (event, index, value) => {
        this.setState({
            room: value,
            selectedIntervals: []
        });
        this.loadClasses(value);
    }

    loadBuildings = () => {
        let that = this;
        const getUrl = `${base_url}courses/buildings`;
        Axios.get(getUrl)
            .then(function (response) {
                that.setState({
                    buildings: response.data["buildings"]
                })
            })
            .catch(function (error) {
                alert(error);
            });
    }

    loadRooms = (name) => {
        let curName = name || this.state.building;
        let that = this;
        const getUrl = `${base_url}courses/${curName}/rooms`;
        Axios.get(getUrl)
            .then(function (response) {
                that.setState({
                    rooms: response.data["rooms"]
                })
            })
            .catch(function (error) {
                alert(error);
            });
    }

    getIntervals = (meetingTime) => { // Creates necessary intervals provided the meetingTime String
        let daysAndTime = meetingTime.split(" ");
        let days = daysAndTime[0];
        let startTime = daysAndTime[1].split("-")[0];
        let endTime = daysAndTime[1].split("-")[1];
        let intervals = [];
        days = days.replace("Thu", "!"); // Make it so that every day only has one char
        for (let i = 0; i < days.length; i++) {
            intervals.push({
                uid: this.state.lastUid,
                start: moment({h: startTime.split(":")[0], m: startTime.split(":")[1]}).day(dayMap[days[i]]),
                end: moment({h: endTime.split(":")[0], m: endTime.split(":")[1]}).day(dayMap[days[i]]),
                days: days.replace("!", "Thu")
            });
            this.setState({
                lastUid: this.state.lastUid + 1
            });
        }

        return intervals;
    }

    loadClasses = (room) => {
        if (room === "") {
            return [];
        }
        let that = this;
        const curBuilding = this.state.building;
        let courses = [];
        let intervals = [];
        let finalIntervals = [];
        let curSerial = "";
        let allMatch = true;
        const getUrl = `${base_url}courses/${curBuilding}/${room}/classes`;
        Axios.get(getUrl)
            .then(function (response) {
                courses = response.data["courses"]
                for (let i = 0; i < courses.length; i++) {
                    if (allMatch && curSerial === "") {
                        curSerial = courses[i].fields["lamp_serial"];
                    }
                    else if (curSerial !== courses[i].fields["lamp_serial"]) {
                        curSerial = "";
                        allMatch = false;
                    }

                    intervals = that.getIntervals(courses[i].fields["time"]);
                    for (let j = 0; j < intervals.length; j++) {
                        intervals[j]["name"] = courses[i].fields["name"];
                        intervals[j]["professor"] = courses[i].fields["professorID"];
                        intervals[j]["lamp"] = courses[i].fields["lamp_serial"];
                        intervals[j]["building"] = courses[i].fields["building"];
                        intervals[j]["room"] = courses[i].fields["room"];
                        finalIntervals.push(intervals[j]);
                    }
                }

                that.setState({
                    selectedIntervals: finalIntervals,
                    serial: curSerial
                });
            })
            .catch(function (error) {
                alert(error);
            });
    }

    handleEventRemove = (event) => {
        const{selectedIntervals} = this.state;
        const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
        if (index > -1) {
            selectedIntervals.splice(index, 1);
            this.setState({selectedIntervals});
        }
    }

    handleEventUpdate = (event) => {
        this.setState({
            room: event.room,
            building: event.building
        })
        this.loadBuildings();
        this.loadRooms();
        this.loadClasses(this.state.room);
    }

    handleSelect = (newIntervals) => {
        this.setState({
            room: newIntervals[0].room,
            building: newIntervals[0].building
        })
        this.loadBuildings();
        this.loadRooms();
        this.loadClasses(this.state.room);
    }

    render() {
        if (this.state.user && this.state.user.type === "admin") {
            return (
                <>
                    <Navbar username={this.state.user.username}></Navbar>
                    <MuiThemeProvider>
                        <SelectField
                            id="building-select"
                            floatingLabelText="Building"
                            floatingLabelFixed={true}
                            value = {this.state.building}
                            onChange={this.handleBuildingChange}
                            onFocus={this.loadBuildings}>
                            {this.state.buildings.map(name => <MenuItem key={name} value={name} primaryText={name} />)}
                        </SelectField>
                        <SelectField
                            id="room-select"
                            floatingLabelText="Room"
                            floatingLabelFixed={true}
                            value = {this.state.room}
                            onChange={this.handleRoomChange}
                            onFocus={this.loadRooms}>
                            {this.state.rooms.map(name => <MenuItem key={name} value={name} primaryText={name} />)}
                        </SelectField>
                        <br/>
                        <TextField
                            id="lamp-serial"
                            floatingLabelText="Lamp Serial Number"
                            floatingLabelFixed={true}
                            value = {this.state.serial}
                            onChange = {(event) => this.setState({serial: event.target.value})}
                        />
                    </MuiThemeProvider>
                    <WeekCalendar
                        firstDay = {moment().day(1)}
                        startTime = {moment({h:7, m:0})}
                        endTime = {moment({h:19, m:0})}
                        numberOfDays = {5}
                        dayFormat = {'dd.'}
                        cellHeight = {20}
                        selectedIntervals = {this.state.selectedIntervals}
                        onIntervalSelect = {this.handleSelect}
                        onIntervalUpdate = {this.handleEventUpdate}
                        onIntervalRemove = {this.handleEventRemove}
                        modalComponent = {classModal}
                        eventComponent = {classEvent}
                    />
                </>
            );
        }
        else {
            return (
                <div>
                    You must be logged in as an admin to view this page!
                </div>
            )
        }
    }
}
