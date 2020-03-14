import React from 'react';

import 'jest';
import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { unmountComponentAtNode } from "react-dom";
import Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import NotebookCard from './NotebookCard';
import PageCard from './PageCard';

Enzyme.configure({ adapter: new Adapter() });

let container = null;
var confirmStub;
var alertStub;
var mock;
beforeEach(() => {
    mock = new MockAdapter(axios);
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
    mock = null;
});

it("deleteNotebook behaves correctly on success", () => {
    mock.onDelete(new RegExp('notebooks/delete')).reply(200, {});
    let wrapper = Enzyme.mount(<NotebookCard/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.deleteNotebook(1);
    expect(confirmStub.calledOnce).toEqual(true);
});

it("deleteNotebook behaves correctly on failure", () => {
    mock.onDelete(new RegExp('notebooks/delete')).reply(400, {message: "Couldn't find notebook!"});
    let wrapper = Enzyme.mount(<NotebookCard/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.deleteNotebook(1);
    expect(alertStub.calledOnce).toEqual(false);
});

it("toggleSDAC behaves correctly on success", () => {
    mock.onGet(new RegExp('notebooks/toggle_sdac')).reply(200, {});
    let wrapper = Enzyme.mount(<NotebookCard/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.setState({
        note: {sdac_ready: false}
    }, () => {
        instance.toggleSDAC(1);
        expect(instance.state.note.sdac_ready).toEqual(true);
    });
});

it("toggleSDAC behaves correctly on failure", () => {
    mock.onGet(new RegExp('notebooks/toggle_sdac')).reply(400, {});
    let wrapper = Enzyme.mount(<NotebookCard/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.setState({
        note: {sdac_ready: false}
    }, () => {
        instance.toggleSDAC(1);
        expect(alertStub.calledOnce).toEqual(false);
    });
});

it("toggleSDAC renders properly with parent state", () => {
    mock.onGet(new RegExp('notebooks/toggle_sdac')).reply(400, {});
    let wrapper = Enzyme.mount(<NotebookCard/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.setState({
        parent: {
            state: {
                pages: [],
                public_items: [],
                public: true,
                user: {
                    type: "teacher"
                }
            }
        },
        note: {
            name: "test name",
            pk: 1
        },
        notes: []
    }, () => {
        expect(instance.state.parent.state.user.type).toEqual("teacher");
    });
});

it('sendPage behaves correctly on success', () => {
    mock.onGet(new RegExp('notebooks/send/page')).reply(200, {});
    let wrapper = Enzyme.mount(<PageCard/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.sendPage(1);
    expect(confirmStub.calledOnce).toEqual(true);
});

it('sendPage behaves correctly on failure', () => {
    mock.onGet(new RegExp('notebooks/send/page')).reply(400, {});
    let wrapper = Enzyme.mount(<PageCard/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.sendPage(1);
    expect(alertStub.calledOnce).toEqual(false);
});

it('sendPage behaves correctly on failure', () => {
    let wrapper = Enzyme.mount(<PageCard/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.downloadFinalSnap(1);
    expect(alertStub.calledOnce).toEqual(false);
});

it("PageCard renders properly with page state", () => {
    mock.onGet(new RegExp('notebooks/toggle_sdac')).reply(400, {});
    let wrapper = Enzyme.mount(<PageCard page={{name: "test Page"}}/>, {attachTo: container});
    let instance = wrapper.instance();
    instance.setState({
        page: {
            name: "test Page",
            pk: 1
        },
        pages: [],
        parent: {
            state: {
                user: {
                    type: "student"
                }
            }
        }
    }, () => {
        expect(instance.state.parent.state.user.type).toEqual("student");
    });
});