import React from 'react';

import 'jest';
import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";
import Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { base_url, url } from "../../App";

import ClassEvent from './ClassEvent.js';
import ClassModal from './ClassModal.js';
import CourseCalendar from "./viewAll";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

Enzyme.configure({ adapter: new Adapter() });
global.alert = jest.fn();

let container = null;
var confirmStub;
var alertStub;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    confirmStub = sinon.stub(global, 'confirm');
    confirmStub.returns(true);
    alertStub = sinon.stub(global, 'alert');
    alertStub.returns(true);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    confirmStub.restore();
    alertStub.restore();
});

it("event renders with class info", () => {
    act(() => {
        render(<ClassEvent start={moment({h: 8, m: 0}).day(1)}
                           end={moment({h: 12, m: 0}).day(1)}
                           name="Test Class"
                           professor="Test Professor"
                           lamp="lamp"
                           days="MWF"
                           building="Test Building"
                           room="Test Room"
                           semester="Test semester"/>,
                container);
    });
    expect(container.textContent).toBe("8:00 - 12:00Test ClassTest Professor");
});

it("modal renders with info", () => {
    var mock = new MockAdapter(axios);
    const classInfo = {
        course_name: "course",
        professorID: "professorID",
        building: "building",
        room: "room",
        time: "MWF 8:00-12:00",
        serial: "0123456789abcdef",
        semester: "Fall 2020",
        pk: 1
    };
    mock.onGet(new RegExp("courses/edit")).reply(200, classInfo);
    mock.onPost(new RegExp("courses/create")).reply(200, {});
    act(() => {
        render(<>
            <MuiThemeProvider>
                <SelectField
                    id="semester-select"
                    floatingLabelText="Semester"
                    floatingLabelFixed={true}
                    value = "Fall 2020"
                    onChange={() => {}}
                    onFocus={() => {}}>
                    {["Fall 2020"].map(name => <MenuItem key={name} value={name} primaryText={name} />)}
                </SelectField>
                <SelectField
                    id="building-select"
                    floatingLabelText="Building"
                    floatingLabelFixed={true}
                    value = "Test Building"
                    onChange={() => {}}
                    onFocus={() => {}}>
                    {["Test Building"].map(name => <MenuItem key={name} value={name} primaryText={name} />)}
                </SelectField>
                <SelectField
                    id="room-select"
                    floatingLabelText="Room"
                    floatingLabelFixed={true}
                    value = "Test Room"
                    onChange={() => {}}
                    onFocus={() => {}}>
                    {["Test Room"].map(name => <MenuItem key={name} value={name} primaryText={name} />)}
                </SelectField>
            </MuiThemeProvider>
            </>,
            container);
        render(<>
            <ClassModal name="Test Modal"
                        professor="hpw3nr@virginia.edu"
                        days="MWF"
                        start={moment({h: 8, m: 0}).day(1)}
                        end={moment({h: 12, m: 0}).day(1)}
                        lamp="123456789abcdef"
                        semester="Fall 2020"
                        building="building"
                        room="room"/></>,
                container);
    });

    expect(document.getElementById("courseSemester").value).toBe("Fall 2020");

    let wrapper = Enzyme.shallow(<ClassModal name="Test Modal"
                                             professor="hpw3nr@virginia.edu"
                                             days="MWF"
                                             start={moment({h: 8, m: 0}).day(1)}
                                             end={moment({h: 12, m: 0}).day(1)}
                                             lamp="0123456789abcdef"
                                             semester="Fall 2020"
                                             building="building"
                                             room="room"/>);
    let ids = ['courseSemester', 'courseName', 'professorId', 'building', 'room', 'time', 'serial'];
    let goodValues = ['Fall 2020', 'course', 'professor', 'building', 'room', '8:00-12:00', '0123456789abcdef'];
    let badValues = ['Fall', '', '', '', '', '8:0012:00', '012345678'];
    for (let i = 0; i < ids.length; i++) {
        let element = wrapper.find('#'+ids[i]);
        if (element) {
            element.simulate('focus');
            element.simulate('blur', {target: {value: goodValues[i]}});
            element.value = goodValues[i];
        }
    }

    let button = wrapper.find('#submitButton');
    button.simulate('click');

    for (let i = 0; i < badValues.length; i++) {
        for (let j = 0; j < badValues.length; j++) {
            let element = wrapper.find('#'+ids[j]);
            if (j === i) {
                if (element) {
                    element.simulate('focus');
                    element.simulate('change', {target: {value: badValues[j]}});
                    element.simulate('blur', {target: {value: badValues[j]}});
                    element.value = goodValues[j];
                }
            }
            else {
                if (element) {
                    element.simulate('focus');
                    element.simulate('change', {target: {value: goodValues[j]}})
                    element.simulate('blur', {target: {value: goodValues[j]}});
                    element.value = goodValues[j];
                }
            }
        }
        button.simulate('click');
    }

    let toggledIds = ['mon', 'wed', 'fri'];
    for (let i = 0; i < toggledIds.length; i++) {
        let element = wrapper.find('#' + toggledIds[i] + 'Toggle');
        element.simulate('click');
    }
    button.simulate('click');

    toggledIds = ['tue', 'thu'];
    for (let i = 0; i < toggledIds.length; i++) {
        let element = wrapper.find('#' + toggledIds[i] + 'Toggle');
        element.simulate('click');
    }
});

it("modal doesn't submit with 200", () => {
    var mock = new MockAdapter(axios);
    const classInfo = {
        course_name: "course",
        professorID: "professorID",
        building: "building",
        room: "room",
        time: "MWF 8:00-12:00",
        serial: "0123456789abcdef",
        semester: "Fall 2020",
        pk: 1
    };
    mock.onGet(new RegExp("courses/edit")).reply(200, classInfo);
    mock.onPost(new RegExp("courses/create")).reply(201, {});
    act(() => {
        render(<>
            <MuiThemeProvider>
                <SelectField
                    id="semester-select"
                    floatingLabelText="Semester"
                    floatingLabelFixed={true}
                    value = "Fall 2020"
                    onChange={() => {}}
                    onFocus={() => {}}>
                    {["Fall 2020"].map(name => <MenuItem key={name} value={name} primaryText={name} />)}
                </SelectField>
                <SelectField
                    id="building-select"
                    floatingLabelText="Building"
                    floatingLabelFixed={true}
                    value = "Test Building"
                    onChange={() => {}}
                    onFocus={() => {}}>
                    {["Test Building"].map(name => <MenuItem key={name} value={name} primaryText={name} />)}
                </SelectField>
                <SelectField
                    id="room-select"
                    floatingLabelText="Room"
                    floatingLabelFixed={true}
                    value = "Test Room"
                    onChange={() => {}}
                    onFocus={() => {}}>
                    {["Test Room"].map(name => <MenuItem key={name} value={name} primaryText={name} />)}
                </SelectField>
            </MuiThemeProvider>
            </>,
            container);
        render(<>
            <ClassModal name="Test Modal"
                        professor="hpw3nr@virginia.edu"
                        days="MWF"
                        start={moment({h: 8, m: 0}).day(1)}
                        end={moment({h: 12, m: 0}).day(1)}
                        lamp="123456789abcdef"
                        semester="Fall 2020"
                        building="building"
                        room="room"/></>,
                container);
    });

    expect(document.getElementById("courseSemester").value).toBe("Fall 2020");

    let wrapper = Enzyme.shallow(<ClassModal name="Test Modal"
                                             professor="hpw3nr@virginia.edu"
                                             days="MWF"
                                             start={moment({h: 8, m: 0}).day(1)}
                                             end={moment({h: 12, m: 0}).day(1)}
                                             lamp="0123456789abcdef"
                                             semester="Fall 2020"
                                             building="building"
                                             room="room"/>);
    let ids = ['courseSemester', 'courseName', 'professorId', 'building', 'room', 'time', 'serial'];
    let goodValues = ['Fall 2020', 'course', 'professor', 'building', 'room', '8:00-12:00', '0123456789abcdef'];
    let badValues = ['Fall', '', '', '', '', '8:0012:00', '012345678'];
    for (let i = 0; i < ids.length; i++) {
        let element = wrapper.find('#'+ids[i]);
        if (element) {
            element.simulate('focus');
            element.simulate('blur', {target: {value: goodValues[i]}});
            element.value = goodValues[i];
        }
    }

    let button = wrapper.find('#submitButton');
    button.simulate('click');
});

it("CourseCalendar renders and behaves correctly", () => {
    window.alert = jest.fn();
    var mock = new MockAdapter(axios);
    const user = {username:"testuser", type:"admin"};
    mock.onGet(url + 'user/').reply(200, user);
    const semesters = {semesters: ["Fall 2020"]};
    mock.onGet(`${base_url}courses/semesters`).reply(200, semesters);
    const buildings = {buildings: ["building1", "building2"]};
    mock.onGet(`${base_url}courses/buildings`).reply(200, buildings);
    const rooms = {rooms: ["room1", "room2", "room3"]};
    mock.onGet(new RegExp('rooms$')).reply(200, rooms);
    const classes = {courses: [{fields: {lamp_serial:"0123456789abcdef",
                                         time: "MWF 8:00-12:00",
                                         name: "testCourse",
                                         professorID: "testProfessor",
                                         building: "testBuilding",
                                         room: "testRoom"}}]};
    mock.onGet(new RegExp('classes$')).reply(200, classes);

    let wrapper = Enzyme.mount(<CourseCalendar/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.loadUser();
    instance.handleBuildingChange(null, null, "buildingChange");
    instance.handleRoomChange(null, null, "roomChange");
    instance.handleSemesterChange(null, null, "Fall 2021");
    instance.loadSemesters();
    instance.loadBuildings();
    instance.loadRooms();
    instance.getIntervals("MWF 8:00-12:00");
    instance.loadClasses("roomChange");
    
    instance.setState({
        selectedIntervals: [{uid: 123}, {uid: 234}, {uid: 567}]
    }, () => {
        instance.handleEventRemove({uid: 123});
    });
    expect(instance.state.selectedIntervals).toEqual([{uid:234}, {uid:567}]);
    
    instance.handleEventUpdate({semester: "Fall 2021", room: "eventRoom", building: "eventBuilding"});
    expect(instance.state.semester).toEqual("Fall 2021");
    expect(instance.state.room).toEqual("eventRoom");
    expect(instance.state.building).toEqual("eventBuilding");

    instance.handleSelect([{semester: "Fall 2019", room: "oldRoom", building: "oldBuilding"}]);
    expect(instance.state.semester).toEqual("Fall 2019");
    expect(instance.state.room).toEqual("oldRoom");
    expect(instance.state.building).toEqual("oldBuilding");

    expect(container.textContent).toContain("You must be logged in as an admin");
});

it("CourseCalendar renders and behaves correctly when axios fails", () => {
    window.alert = jest.fn();
    var mock = new MockAdapter(axios);
    const user = {username:"testuser", type:"admin"};
    mock.onGet(url + 'user/').reply(400, user);
    const semesters = {semesters: ["Fall 2020"]};
    mock.onGet(`${base_url}courses/semesters`).reply(400, semesters);
    const buildings = {buildings: ["building1", "building2"]};
    mock.onGet(`${base_url}courses/buildings`).reply(400, buildings);
    const rooms = {rooms: ["room1", "room2", "room3"]};
    mock.onGet(new RegExp('rooms$')).reply(400, rooms);
    const classes = {courses: [{fields: {lamp_serial:"0123456789abcdef",
                                         time: "MWF 8:00-12:00",
                                         name: "testCourse",
                                         professorID: "testProfessor",
                                         building: "testBuilding",
                                         room: "testRoom"}}]};
    mock.onGet(new RegExp('classes$')).reply(400, classes);

    let wrapper = Enzyme.mount(<CourseCalendar/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.loadUser();
    instance.handleBuildingChange(null, null, "buildingChange");
    instance.handleRoomChange(null, null, "roomChange");
    instance.handleSemesterChange(null, null, "Fall 2021");
    instance.loadSemesters();
    instance.loadBuildings();
    instance.loadRooms();
    instance.getIntervals("MWF 8:00-12:00");
    instance.loadClasses("roomChange");
    instance.loadClasses("");
    expect(container.textContent).toContain("You must be logged in as an admin");
});