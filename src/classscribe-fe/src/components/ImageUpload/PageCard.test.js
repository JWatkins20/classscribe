
import React from 'react';
import PageCard from './PageCard';

import 'jest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";
import moment from 'moment';
import Enzyme from "enzyme";
import sinon from 'sinon'
import NotebookCard from "./NotebookCard"
import Adapter from 'enzyme-adapter-react-16';
import { base_url, url } from "../../App";
import {waitForExpect} from 'wait-for-expect'
//https://testing-library.com/docs/intro

Enzyme.configure({ adapter: new Adapter() });
let container = null;
var alertStub;
var confirmStub;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  alertStub = sinon.stub(global, 'alert');
  alertStub.returns(true);
  confirmStub = sinon.stub(global, 'confirm');
  confirmStub.returns(true);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  alertStub.restore();
  confirmStub.restore();
});

let state = {
    'state' : {
    pagename: '',
      images:[],
      items: [
        {"Private":true,"class_name":"STS 4500","name":"New name","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}],
      public_items: [],
      pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
      user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},
      audio: {},
      audio_obj: {},
      loaded: false,
      page: 0,
      notebook: 0,
      transcript: "Hello fam",
      public: true,
      recording: undefined,
      sent: false,
  },
  switchPage: (page)=>{state.state.page=1}
}  

  let pages = state.state.pages
  let page = pages[state.state.page]

it('fails to render without input', () => {
  let wrapper = Enzyme.shallow(<PageCard parent={state} page={undefined} pages={pages}></PageCard>)
  expect(wrapper.text()).toBe('')
});
it('renders and presses buttons', ()=>{
  let wrapper = Enzyme.shallow(<PageCard parent={state} page={page} pages={pages}></PageCard>)
  expect(wrapper.text()).toContain('Page 1')
  let card = wrapper.find('#pagecard')
  card.simulate('click')
  expect(state.state.page).toBe(1)
  let send = wrapper.update().find('#sendpage')
  send.simulate('click')
  expect(confirmStub.called).toBe(true)
  let download = wrapper.update().find('#download')
  download.simulate('click')
  expect(confirmStub.called).toBe(true)

})


