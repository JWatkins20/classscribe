import React from 'react';
import ReactDOM from 'react-dom';

import 'jest';
import axios from 'axios';
import { render, unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";

import ClassEvent from "./ClassEvent";
import ClassModal from "./ClassModal";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ExpansionPanelActions, jssPreset } from '@material-ui/core';
import moment from 'moment';
import Enzyme from "enzyme";
import { CardTitle } from 'material-ui';
import Adapter from 'enzyme-adapter-react-16';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

Enzyme.configure({ adapter: new Adapter() });

// jest.mock('./ClassModal', () => ({
//     get: jest.fn(() => Promise.resolve({ data: {
//         data: {
//             course_name: "test course",
//             professorID: "Test Professor",
//             building: "Test Building",
//             room: "Test Room",
//             time: "MWF 8:00-12:00",
//             serial: "123456789abcdef",
//             semester: "Fall 2020",
//         }}}))
// }));

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
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
    let values = ['Fall 2020', 'course', 'professor', 'building', 'room', '8:00-12:00', '0123456789abcdef'];
    for (let i = 0; i < ids.length; i++) {
        let element = wrapper.find('#'+ids[i]);
        console.log(element)
        if (element) {
            element.simulate('focus');
            element.simulate('blur', {target: {value: values[i]}});
            element.value = values[i];
        }
    }

    let button = wrapper.find('#submitButton');
    button.simulate('click');

    let toggledIds = ['mon', 'tue', 'wed', 'thu', 'fri'];
    for (let i = 0; i < toggledIds.length; i++) {
        let element = wrapper.find('#' + toggledIds[i] + 'Toggle');
        element.simulate('click');
    }
});