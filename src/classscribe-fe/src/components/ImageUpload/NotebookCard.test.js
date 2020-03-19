import React from 'react';

import 'jest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";
import moment from 'moment';
import Enzyme from "enzyme";
import NotebookCard from "./NotebookCard"
import Adapter from 'enzyme-adapter-react-16';
import { base_url, url } from "../../App";
import {waitForExpect} from 'wait-for-expect'

Enzyme.configure({ adapter: new Adapter() });
global.alert = jest.fn();
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

let state = {
  'state' : {
  pagename: '',
    images:[],
    items: [{"Private":false,"class_name":"STS 4500","name":"STS 4500","pages":[{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 1","pk":9,"submitted":false},{"time":"2020-03-15","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"page1","transcript":"page 2","pk":13,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 3","pk":14,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:33:40Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 4","pk":15,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_2J7Qq2n.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:35:20Z","lampSN":9347,"pk":6}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 5","pk":16,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/ielts-ukvi-academic-writing-part-2-notes-30-638_Af90UIa.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:38:00Z","lampSN":234,"pk":7}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 6","pk":17,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn_SXGMkeP.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:42:10Z","lampSN":435,"pk":8}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 7","pk":18,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_QESKhiZ_6eSK4x4.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:46:20Z","lampSN":2,"pk":9}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 8","pk":19,"submitted":false}],"pk":9,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
    public_items: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":11,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]}],
    pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
    user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},
    audio: {"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},
    audio_obj: {},
    loaded: false,
    page: 0,
    notebook: 0,
    transcript: "Hello fam",
    public: false,
    recording: undefined,
    time: 400,
    duration: 1655.397011,
    sdac_ready: false,
    recording: undefined,
    showModal: false,
    snapshot_index: 0,
},
  switchNote: (index)=>{},
  changePrivacy: (notebook)=>{},
  updateCards: (dummy)=>{}
} 

let public_state = {
  'state' : {
  pagename: '',
    images:[],
    items: [{"Private":false,"class_name":"STS 4500","name":"STS 4500","pages":[{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 1","pk":9,"submitted":false},{"time":"2020-03-15","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"page1","transcript":"page 2","pk":13,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 3","pk":14,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:33:40Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 4","pk":15,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_2J7Qq2n.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:35:20Z","lampSN":9347,"pk":6}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 5","pk":16,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/ielts-ukvi-academic-writing-part-2-notes-30-638_Af90UIa.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:38:00Z","lampSN":234,"pk":7}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 6","pk":17,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn_SXGMkeP.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:42:10Z","lampSN":435,"pk":8}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 7","pk":18,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_QESKhiZ_6eSK4x4.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:46:20Z","lampSN":2,"pk":9}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 8","pk":19,"submitted":false}],"pk":9,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
    public_items: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":11,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]}],
    pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
    user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},
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
},
  switchNote: (index)=>{},
  changePrivacy: (notebook)=>{},
  updateCards: (dummy)=>{}
} 

  let notes = state.state.items
  let note = notes[state.state.notebook]
//<NotebookCard onUpdateUser={(event)=>self.updateUser()} onUpdatePublic={(event)=>{self.updatePublicNotebooks()}} parent={self} notes={self.state.saved_items} note={note}
  it('notebook card renders', ()=>{
    act(()=>{
      render(<NotebookCard 
        parent={state} 
        notes={notes} 
        note={note} 
        onUpdateUser={()=>{}} 
        onUpdatePublic={()=>{}}
      />, container)
    })
    expect(container.textContent).toContain('STS 4500')
  })

  it('user notebook buttons work correctly', async()=>{
    var mock = new MockAdapter(axios);
    mock.onPost(new RegExp('/privacy-toggle/')).replyOnce(200, {})
    mock.onPost(new RegExp('/privacy-toggle/')).replyOnce(400, {})
    mock.onPost(new RegExp('/edit/')).replyOnce(200, {})
    mock.onPost(new RegExp('/favorite/')).replyOnce(201, {})
    let wrapper = Enzyme.shallow(<NotebookCard 
      parent={state} 
      notes={notes} 
      note={note} 
      onUpdateUser={()=>{}} 
      onUpdatePublic={()=>{}}
    />, {attachTo: container})
    let editButton = wrapper.find('#editButton')
    editButton.simulate('click')
    wrapper.setState({edit: true})
    let namePrompt = wrapper.update().find('#newName')
    namePrompt.simulate('change', {target: {value: 'new name'}})
    let submit = wrapper.update().find('#submit-name')
    await submit.simulate('click')
    await wrapper.instance().handleSwitch({target: {checked: true}})
    expect(wrapper.update().state('checked')).toBe(true)
    await wrapper.instance().handleSwitch({target: {checked: false}})
    expect(wrapper.update().state('checked')).toBe(true)
    expect(public_state.state.public_items.length).toBe(1)
    wrapper.instance().handleSelection({}, '11')
    wrapper.instance().favorite()
  })

  it('public notebook buttons work correctly', async()=>{
    var mock = new MockAdapter(axios);
    mock.onPost(new RegExp('/rate/')).replyOnce(201, {})
    mock.onPost(new RegExp('/rate/')).replyOnce(200, {})
    mock.onPost(new RegExp('/rate/')).replyOnce(400, {})
    mock.onPost(new RegExp('/unfavorite/')).replyOnce(201, {})
    mock.onPost(new RegExp('/unfavorite/')).replyOnce(400, {})
    let wrapper = Enzyme.shallow(<NotebookCard 
      parent={public_state} 
      notes={notes} 
      note={note} 
      onUpdateUser={()=>{}} 
      onUpdatePublic={()=>{}}
    />, {attachTo: container})
    let ThumbsUp = wrapper.find('#up')
    ThumbsUp.simulate('click')
    let ThumbsDown = wrapper.update().find('#down')
    ThumbsDown.simulate('click')
    ThumbsDown.simulate('click')
    let removeButton = wrapper.update().find('.remove')
    removeButton.simulate('click')
  })



