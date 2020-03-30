import React from 'react';

import 'jest';
import sinon from 'sinon'
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
      items: [{"Private":false,"class_name":"STS 4500","name":"STS 4500","pages":[{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":15},{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 1","pk":9,"submitted":false},{"time":"2020-03-15","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"page1","transcript":"page 2","pk":13,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 3","pk":14,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:33:40Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 4","pk":15,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_2J7Qq2n.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:35:20Z","lampSN":9347,"pk":6}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 5","pk":16,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/ielts-ukvi-academic-writing-part-2-notes-30-638_Af90UIa.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:38:00Z","lampSN":234,"pk":7}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 6","pk":17,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn_SXGMkeP.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:42:10Z","lampSN":435,"pk":8}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 7","pk":18,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_QESKhiZ_6eSK4x4.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:46:20Z","lampSN":2,"pk":9}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 8","pk":19,"submitted":false}],"pk":9,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
      public_items: [],
      pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
      user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},
      audio: {"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},
      audio_obj: {},
      loaded: false,
      page: 1,
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

  let public_state = {
    'state' : {
    pagename: '',
      images:[],
      items: [{"Private":false,"class_name":"STS 4500","name":"STS 4500","pages":[{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 1","pk":9,"submitted":false},{"time":"2020-03-15","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"page1","transcript":"page 2","pk":13,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 3","pk":14,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:33:40Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 4","pk":15,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_2J7Qq2n.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:35:20Z","lampSN":9347,"pk":6}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 5","pk":16,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/ielts-ukvi-academic-writing-part-2-notes-30-638_Af90UIa.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:38:00Z","lampSN":234,"pk":7}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 6","pk":17,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn_SXGMkeP.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:42:10Z","lampSN":435,"pk":8}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 7","pk":18,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_QESKhiZ_6eSK4x4.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:46:20Z","lampSN":2,"pk":9}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 8","pk":19,"submitted":false}],"pk":9,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
      public_items: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":14,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":11,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":13,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]}, {"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":12,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]}],
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
      switchedPage: false
  },
    switchNote: (index)=>{},
    changePrivacy: (notebook)=>{},
    updateCards: (dummy)=>{},
    calculateRating: (note)=>{
      let sum = 0;
        for(var i = 0; i < note.ratings.length; i++){
          sum = sum + note.ratings[i].rating
        }
        return ((sum*(1.0))/note.ratings.length) * 5
    },
  } 

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

it('render undefined notes', async (done) => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  var mock = new MockAdapter(axios);
  let user = {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]}
  mock.onGet(url+'user/').reply(200, user)
  mock.onGet(base_url+'notebooks/get/1/').reply(200, {data: undefined})
  mock.onGet(base_url+'notebooks/get/public/1/STS%204500/').reply(200, {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]})
  let wrapper = Enzyme.mount(<ImageCarousel />, {attachTo: container});
  let instance = wrapper.instance();
  await instance.componentDidMount()
  await instance.setState({items: undefined})
  expect(wrapper.update().text()).toContain('Unable to display notebooks')

  done()
});

it('render student ui', async (done) => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  var mock = new MockAdapter(axios);
  let user = {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]}
  mock.onGet(url+'user/').reply(200, user)
  mock.onGet(base_url+'notebooks/get/1/').reply(200, {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  mock.onGet(base_url+'notebooks/get/public/1/STS%204500/').reply(200, {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]})
  let wrapper = Enzyme.mount(<ImageCarousel />, {attachTo: container});
  let instance = wrapper.instance();

  await instance.componentDidMount()
  expect(container.textContent).toContain("Hello bfb3ab@virginia.edu")
  //------------------test rendered notebooks can be selected and prop functions---------------------//
  //----------------------------------------------------------------------------------------------------//

  let carousel = wrapper.update().find('#carousel')
  await carousel.simulate('change', 2)
  await carousel.props().onChange(2)
  expect(wrapper.update().state('snapshot_index')).toBe(2)
 //-------------------------------------------------------------------------------------------------------//
 let split = wrapper.update().find('#split').at(4)
 await split.simulate('click')
 let sync = wrapper.update().find('#syncAudio').at(4)
 await sync.simulate('click')
  done()
});

it('test bad switch note and page' , async(done)=>{
  var mock = new MockAdapter(axios);
  let wrapper = Enzyme.shallow(<ImageCarousel/>)
  await wrapper.setState({
    pagename: '',
      images:[],
      items: [{"Private":false,"class_name":"STS 4500","name":"STS 4500","pages":[{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:43Z","lampSN":1,"pk":76},{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 1","pk":9,"submitted":false},{"time":"2020-03-15","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"page1","transcript":"page 2","pk":13,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 3","pk":14,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:33:40Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 4","pk":15,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_2J7Qq2n.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:35:20Z","lampSN":9347,"pk":6}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 5","pk":16,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/ielts-ukvi-academic-writing-part-2-notes-30-638_Af90UIa.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:38:00Z","lampSN":234,"pk":7}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 6","pk":17,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn_SXGMkeP.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:42:10Z","lampSN":435,"pk":8}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 7","pk":18,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_QESKhiZ_6eSK4x4.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:46:20Z","lampSN":2,"pk":9}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 8","pk":19,"submitted":false}],"pk":9,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
    public_items: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":11,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]}],
    pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
    user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},
    audio: {"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},
      audio_obj: {},
      loaded: false,
      page: 1,
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
  })
  let instance = wrapper.instance()
  expect(wrapper.update().state('items').length).not.toBe(0)
  await instance.switchNote(999)
  expect(wrapper.update().state('pages').length).toBe(0)
  await instance.setState({
    saved_items: undefined,
    pages: [{'test': 'value'}]
  })
  await instance.switchNote(9)
  expect(wrapper.update().state('pages').length).toBe(0)
  await instance.setState({
    saved_items: [],
    pages: [{'test': 'value'}]
  })
  await instance.switchPage(9)
  expect(wrapper.update().state('pages').length).toBe(1)
  done()
})

it('render student ui and toggle between user and public notebooks', async (done) => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  var mock = new MockAdapter(axios);
  let user = {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]}
  mock.onGet(url+'user/').reply(200, user)
  mock.onGet(base_url+'notebooks/get/1/').reply(200, {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]})
  mock.onGet(base_url+'notebooks/get/public/1/STS%204500/').reply(200, {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]})
  let wrapper = Enzyme.mount(<ImageCarousel />, {attachTo: container});
  let instance = wrapper.instance();
  await instance.componentDidMount()
  let publicSwitch = wrapper.update().find('#publicToggle').at(4)
  await publicSwitch.simulate('click')
  expect(wrapper.update().state('public')).toBe(true)
  await publicSwitch.simulate('click')
  expect(wrapper.update().state('public')).toBe(true)
  publicSwitch = wrapper.update().find('#userToggle').at(4)
  await publicSwitch.simulate('click')
  expect(wrapper.update().state('public')).toBe(false)
  await publicSwitch.simulate('click')
  expect(wrapper.update().state('public')).toBe(false)
  done()
});

it('renders and non-button functions work correctly', async(done)=>{
  var mock = new MockAdapter(axios);
  let user = {"pk":2,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]}
  mock.onGet(url+'user/').reply(200, user)
  mock.onGet(new RegExp('notebooks/get/public/')).reply(200, {data: [{"Private":true,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]})
  let wrapper = Enzyme.shallow(<ImageCarousel/>)
  await wrapper.setState({
    pagename: '',
      images:[],
      items: [{"Private":false,"class_name":"STS 4500","name":"STS 4500","pages":[{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:43Z","lampSN":1,"pk":76},{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 1","pk":9,"submitted":false},{"time":"2020-03-15","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"page1","transcript":"page 2","pk":13,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 3","pk":14,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:33:40Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 4","pk":15,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_2J7Qq2n.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:35:20Z","lampSN":9347,"pk":6}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 5","pk":16,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/ielts-ukvi-academic-writing-part-2-notes-30-638_Af90UIa.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:38:00Z","lampSN":234,"pk":7}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 6","pk":17,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn_SXGMkeP.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:42:10Z","lampSN":435,"pk":8}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 7","pk":18,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_QESKhiZ_6eSK4x4.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:46:20Z","lampSN":2,"pk":9}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 8","pk":19,"submitted":false}],"pk":9,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
    public_items: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":11,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]}],
    pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
    user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},
    audio: {"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},
      audio_obj: {},
      loaded: false,
      page: 1,
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
  })
  let instance = wrapper.instance()
  await instance.switchPage(1)
  expect(wrapper.state('user').pk).toBe(1)
  await instance.updateUser()
  //test to verify that update user accepts axios input, and update user
  expect(wrapper.state('user').pk).toBe(2)
  
  expect(wrapper.state('public_items')[0].Private).toBe(false)
  await wrapper.instance().updatePublicNotebooks()
  //test to verify that updatePublicNotebook method accepts axios input, and updates public notebooks
  expect(wrapper.state('public_items')[0].Private).toBe(true)
  await wrapper.instance().changePrivacy(0)
  expect(wrapper.state('public_items')[0].Private).toBe(true)
  let note = wrapper.update().find('#note0')
  note.props().onUpdatePublic({})
  await wrapper.instance().setState({
    saved_items: public_state.state.user.favoritedBooks,
    public: true
  })
  note = wrapper.update().find('#note0')
  await note.props().onUpdateUser({})
  await note.props().onUpdatePublic({})
  done()
})

it('test audio and sync', async(done)=>{
  let wrapper = Enzyme.shallow(<ImageCarousel/>)
  await wrapper.setState({
    pagename: '',
      images:[],
      items: [{
        "Private":false,
        "class_name":"STS 4500",
        "name":"STS 4500",
        "pages":[
          {
            "time":"2020-01-17",
            "snapshots":[
              {"file":"/media/bg1_92NGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:57Z","lampSN":1,"pk":92},
              {"file":"/media/bg1_92NGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:47Z","lampSN":1,"pk":91}, 
              {"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},
              {"file":"/media/bg1_92NGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:41Z","lampSN":1,"pk":93},
              {"file":"/media/bg1_92NGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:44Z","lampSN":1,"pk":94}, 
              {"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:49Z","lampSN":1,"pk":95}
            ],
            "audio":{
              "file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7
            },
            "name":"Page o",
            "transcript":"page 1",
            "pk":9,
            "submitted":false
          },
          {
            "time":"2020-03-15",
            "snapshots":[
              {
                "file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3
              }
            ],
            "audio":{
              "file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7
            },
            "name":"page1",
            "transcript":"page 2",
            "pk":13,
            "submitted":false
          },
          {
            "time":"2020-01-17",
            "snapshots":[
              {
                "file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4
              }
            ],
            "audio":{
              "file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7
            },
            "name":"Page o",
            "transcript":"page 3",
            "pk":14,
            "submitted":false
          }],
          "pk":9,
          "owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
    public_items: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":11,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]}],
    pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
    user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},
    audio: {"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},
      audio_obj: {},
      loaded: false,
      page: 2,
      notebook: 0,
      transcript: "test transcript",
      public: false,
      recording: undefined,
      time: 400,
      duration: 1655.397011,
      sdac_ready: false,
      recording: undefined,
      showModal: false,
      snapshot_index: 0,
  })
    wrapper.instance().updateAudioTime(260)
  expect(wrapper.update().state('time')).toBe(260) //audio time set in above line
  wrapper.instance().getAudioDuration({duration: 1653})
  expect(wrapper.update().state('duration')).toBe(1653)
  await wrapper.instance().syncToAudio().then(()=>{
    expect(wrapper.update().state('page')).toBe(1) //60 seconds in syncs to page 1 in array
  })
  wrapper.instance().updateAudioTime(60)
  expect(wrapper.update().state('time')).toBe(60) //audio time set in above line
  await wrapper.instance().syncToAudio().then(()=>{
    expect(wrapper.update().state('page')).toBe(0) //60 seconds in syncs to page 1 in array
  })
  await wrapper.instance().switchPage(2)
  let time = await wrapper.instance().syncToPage()
  expect(time).toBe(417) //time in seconds of pages last timestamp from beginning
  // let syncA = wrapper.update().find('#syncAudio')
  // await syncA.simulate('click')
  done()
})

it('test compareSnapshots', ()=>{
  let wrapper = Enzyme.shallow(<ImageCarousel/>)
  let timestamps = [
    {
      id: 1,
      hours: 2, 
      minute: 47, 
      seconds: 23
    },
    {
      id: 3,
      hours: 2, 
      minute: 23, 
      seconds: 45
    },
    {
      id: 2,
      hours: 1, 
      minute: 12, 
      seconds: 56
    },
    {
      id: 4,
      hours: 3, 
      minute: 12, 
      seconds: 59
    },
    {
      id: 5,
      hours: 1, 
      minute: 45, 
      seconds: 12
    },
    {
      id: 6,
      hours: 2, 
      minute: 47, 
      seconds: 12
    },
    {
      id: 7,
      hours: 2, 
      minute: 47, 
      seconds: 12
    },
    {
      id: 8,
      hours: 2, 
      minute: 46, 
      seconds: 12
    },
  ]
  let sorted = timestamps.sort((a,b)=>wrapper.instance().compareSnapshots(a,b))
  expect(sorted[0].id).toBe(2)
  expect(sorted[1].id).toBe(5)
  expect(sorted[2].id).toBe(3)
  expect(sorted[3].id).toBe(8)
  expect(sorted[4].id).toBe(6)
  expect(sorted[5].id).toBe(7)
  expect(sorted[6].id).toBe(1)
  expect(sorted[7].id).toBe(4)
})

it('test addCurent Time and Subtract Duration', ()=>{
  let wrapper = Enzyme.shallow(<ImageCarousel/>)
  let timestamps = [
    {
      id: 1,
      hours: 2, 
      minute: 47, 
      seconds: 23
    },
    {
      id: 2,
      hours: 1, 
      minute: 12, 
      seconds: 56
    },
    {
      id: 3,
      hours: 2, 
      minute: 23, 
      seconds: 45
    },
    {
      id: 4,
      hours: 3, 
      minute: 12, 
      seconds: 59
    },
    {
      id: 5,
      hours: 1, 
      minute: 45, 
      seconds: 12
    },
    {
      id: 6,
      hours: 2, 
      minute: 47, 
      seconds: 12
    },
    {
      id: 7,
      hours: 2, 
      minute: 47, 
      seconds: 12
    },
  ]
  let val = wrapper.instance().subtractDuration(timestamps[2], 12286)
  val = wrapper.instance().addCurrentTime(timestamps[2], 2111)
})

it('test split page', ()=>{
  var mock = new MockAdapter(axios)
  let user = {"pk":2,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]}
  mock.onGet(new RegExp('[a-z|0-9]*')).reply(200, {})
  mock.onGet(new RegExp('notebooks/public/')).reply(200, {})
  mock.onGet(new RegExp('notebooks')).reply(200, {})

  let wrapper = Enzyme.shallow(<ImageCarousel/>)
  wrapper.setState({
    pagename: '',
      images:[],
      items: [{"Private":false,"class_name":"STS 4500","name":"STS 4500","pages":[{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:43Z","lampSN":1,"pk":76},{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 1","pk":9,"submitted":false},{"time":"2020-03-15","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"page1","transcript":"page 2","pk":13,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:31:00Z","lampSN":34957,"pk":4}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 3","pk":14,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:33:40Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 4","pk":15,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_2J7Qq2n.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:35:20Z","lampSN":9347,"pk":6}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 5","pk":16,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/ielts-ukvi-academic-writing-part-2-notes-30-638_Af90UIa.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:38:00Z","lampSN":234,"pk":7}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 6","pk":17,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_rFhGXAn_SXGMkeP.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"1","timestamp":"2020-03-02T16:42:10Z","lampSN":435,"pk":8}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 7","pk":18,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_QESKhiZ_6eSK4x4.jpg","remark":"bfb3ab","class_name":"Capstone Practicum","page_num":"2","timestamp":"2020-03-02T16:46:20Z","lampSN":2,"pk":9}],"audio":{"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},"name":"Page o","transcript":"page 8","pk":19,"submitted":false}],"pk":9,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"sdac_ready":false,"ratings":[]}],
    public_items: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 4","pages":[],"pk":11,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3}]}],
    pages: [{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],
    user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-03-02T16:25:45Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-03-02T16:28:20Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"page 11","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null},"sdac_ready":false,"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2}]}],"ratings":[{"rating":1,"notebook":{"name":"Anotha one","pk":8},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":2},{"rating":0,"notebook":{"name":"Anotha one 4","pk":11},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":3},{"rating":0,"notebook":{"name":"Anotha one 3","pk":10},"user":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},"pk":4}]},
    audio: {"file":"/media/Section1.2.mp4","remark":"bfb3ab4","class_name":"who cares","length":"3000","timestamp":"2020-03-02T16:51:36Z","pk":7},
      audio_obj: {},
      loaded: false,
      page: 1,
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
  }, ()=>{
      let instance = wrapper.instance()
      let splitButton = wrapper.find('#split')
      expect(wrapper.state('items')[wrapper.state('notebook')].pages.length).toBe(8)
      instance.split_page().then(()=>{
        expect(wrapper.update().state('items')[wrapper.update().state('notebook')].pages.length).toBe(8)
      })
    })
  })


