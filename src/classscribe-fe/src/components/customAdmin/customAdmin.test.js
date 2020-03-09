import React from 'react';
import ReactDOM from 'react-dom';

import 'jest';
import { render, unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";

import ClassEvent from "./ClassEvent";
import { ExpansionPanelActions } from '@material-ui/core';
import moment from 'moment';

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
                document);
    });
    expect(document.getElementsByClassName("event")[0].textContent).toBe("8:00 - 12:00Test ClassTest Professor");
});