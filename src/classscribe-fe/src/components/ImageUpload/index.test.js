import React from 'react';

import 'jest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";
import moment from 'moment';
import Enzyme from "enzyme";
import ImageCarousel from "./index"
import Adapter from 'enzyme-adapter-react-16';
import { base_url, url } from "../../App";
import {waitForExpect} from 'wait-for-expect'

Enzyme.configure({ adapter: new Adapter() });
global.alert = jest.fn();

let state = {
    'state' : {
    pagename: '',
      images:[],
      items: [{"Private":false,"class_name":"STS 4500","name":"STS 4500","pages":[{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 1","pk":9,"submitted":false},{"time":"2020-03-15","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"page1","transcript":"page 2","pk":13,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 3","pk":14,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:33:40Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 4","pk":15,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_2J7Qq2n.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:35:20Z","lampSN":9347,"pk":6}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 5","pk":16,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/ielts-ukvi-academic-writing-part-2-notes-30-638_Af90UIa.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:38:00Z","lampSN":234,"pk":7}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 6","pk":17,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn_SXGMkeP.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:42:10Z","lampSN":435,"pk":8}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 7","pk":18,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_QESKhiZ_6eSK4x4.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:46:20Z","lampSN":2,"pk":9}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 8","pk":19,"submitted":false}],"pk":9,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
      public_items: [],
      pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
      user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},
      audio: {"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},
      audio_obj: {},
      loaded: false,
      page: 0,
      notebook: 0,
      transcript: "Hello fam",
      public: true,
      recording: undefined,
      time: 400,
      duration: 1655.397011,
      sdac_ready: false,
      recording: undefined,
      showModal: false,
      snapshot_index: 0,
  }}  

  let notes = state.state.items
  let note = notes[state.state.notebook]
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

it('render student ui', async (done) => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  var mock = new MockAdapter(axios);
  let user = {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}
  mock.onGet(url+'user/').reply(200, user)
  mock.onGet(base_url+'notebooks/get/1/').reply(200, {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  mock.onGet(base_url+'notebooks/get/public/1/STS%204500/').reply(200, {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]})
  let wrapper = Enzyme.mount(<ImageCarousel />, {attachTo: container});
  let instance = wrapper.instance();
  await instance.componentDidMount()
  expect(container.textContent).toContain("Hello bfb3ab@virginia.edu")
  done()
});

it('render teacher ui', async (done) => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  var mock = new MockAdapter(axios);
  let user = {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"teacher","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}
  mock.onGet(url+'user/').reply(200, user)
  mock.onGet(base_url+'notebooks/get/1/').reply(200, {data :[{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  mock.onGet(base_url+'notebooks/get/public/1/STS%204500/').reply(200, [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}])
  let wrapper = Enzyme.mount(<ImageCarousel />, {attachTo: container});
  let instance = wrapper.instance();
  await instance.componentDidMount();
  expect(container.textContent).toContain("Hello bfb3ab@virginia.edu")
  done()
});

it('render student ui and switch notebook and pages', async (done) => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  //instance.setState({items: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}, {"Private":true,"class_name":"CS 4791","name":"Capstone Practicum2","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":4,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  var mock = new MockAdapter(axios);
  let user = {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"teacher","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}
  mock.onGet(new RegExp('/user/')).reply(200, user)
  mock.onGet(new RegExp('/notebooks/get/[0-9]+')).reply(200, {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  mock.onGet(new RegExp('/notebooks/get/public/')).reply(200, {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]})
  mock.onGet(new RegExp('undefined')).reply(200, {})
  mock.onGet(new RegExp('media')).reply(200, {})
  mock.onGet(new RegExp('stream')).reply(200, {})
  let wrapper = Enzyme.mount(<ImageCarousel />, {attachTo: container});
  let instance = wrapper.instance()
  instance.componentDidMount().then(()=>{
    expect(wrapper.update().text()).toContain("Hello bfb3ab@virginia.edu")
    expect(wrapper.update().text()).toContain("Capstone Practicum")
    waitForExpect(expect(wrapper.update().text()).toContain("Page 1"), 2000, 3)
    expect(wrapper.update().state('items') === [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}])
    instance = wrapper.update().instance()
    instance.switchNote(0).then(()=>{
      instance.switchPage(1).then(()=>{
        expect(wrapper.update().state('pages')[1].snapshots.length).toBe(2)
        done()
      })
    })
  })
});

it('render student ui switch to public notebooks', async (done) => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  //instance.setState({items: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}, {"Private":true,"class_name":"CS 4791","name":"Capstone Practicum2","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":4,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  var mock = new MockAdapter(axios);
  let user = {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"teacher","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null, ratings: []}
  mock.onGet(new RegExp('/user/')).reply(200, user)
  mock.onGet(new RegExp('/notebooks/get/[0-9]+')).reply(200, {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  mock.onGet(new RegExp('/notebooks/get/public/')).reply(200, {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]})
  mock.onGet(new RegExp('undefined')).reply(200, {})
  mock.onGet(new RegExp('media')).reply(200, {})
  mock.onGet(new RegExp('stream')).reply(200, {})
  let wrapper = Enzyme.mount(<ImageCarousel />, {attachTo: container});
  let instance = wrapper.instance()
  await instance.componentDidMount()
    expect(wrapper.update().text()).toContain("Hello bfb3ab@virginia.edu")
    expect(wrapper.update().text()).toContain("Capstone Practicum")
    instance = wrapper.update().instance()
    expect(container.textContent).toContain("Page 1")
  expect(wrapper.update().state('items') === [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}])
  instance = wrapper.update().instance()
  await instance.Toggle_public_notebooks()
  await wrapper.update().instance().switchNote(0)
  expect(wrapper.update().state('public')).toBeTruthy()
  done()
});

it('test audio sync to page and sync to ', async(done)=>{
  var mock = new MockAdapter(axios);
  let user = {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}
  mock.onGet(new RegExp('/user/')).reply(200, user)
  mock.onGet(new RegExp('/notebooks/get/[0-9]+')).reply(200, {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  mock.onGet(new RegExp('/notebooks/get/public/')).reply(200, {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]})
  mock.onGet(new RegExp('undefined')).reply(200, {})
  mock.onGet(new RegExp('media')).reply(200, {})
  mock.onGet(new RegExp('stream')).reply(200, {})
  let wrapper = Enzyme.mount(<ImageCarousel/>)
  let instance = wrapper.instance();
  await instance.componentDidMount()
  await instance.setState({
    items: state.state.items,
    audio: state.state.audio,
  })
  wrapper = wrapper.update()
    expect(wrapper.state('page')===0)
    await instance.syncToAudio()
    wrapper = wrapper.update()
    expect(wrapper.state('page')!==0)
    instance.setState({page: 4})
    await instance.syncToPage()
    expect(wrapper.update().state('time')!==400)
  done()
})

