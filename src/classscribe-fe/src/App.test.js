import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from 'axios';
import { url } from './App';
import 'jest';
import { render, unmountComponentAtNode } from "react-dom";
import PageCard from './components/ImageUpload/PageCard'
import {act} from "react-dom/test-utils"
import NotebookCard from './components/ImageUpload/NotebookCard'
import { ExpansionPanelActions } from '@material-ui/core';
// function makeId(length) {
//   var result           = '';
//   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for ( var i = 0; i < length; i++ ) {
//      result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
//}

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('renders without crashing', () => {
  ReactDOM.render(App, container);
});

it("PageCard doesnt render without input", ()=>{
  act(()=>{
    render(<PageCard></PageCard>, container);
  })
  expect(container.textContent).not.toContain('Page')
})

it("PageCard render with input", ()=>{
  let state = {
    'state' : {
    pagename: '',
      images:[],
      items: [
        {"Private":true,"class_name":"STS 4500","name":"New name","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false},{"time":"2020-01-17","snapshots":[],"audio":null,"name":"Page","transcript":"","pk":11,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}],
      public_items: [],
      pages: [],
      user: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null},
      audio: {},
      audio_obj: {},
      loaded: false,
      page: 0,
      notebook: 0,
      transcript: "Hello fam",
      public: true,
      recording: undefined
  }}  
  let pages = [{
    "time": "2019-12-12",
    "snapshots": [
        {
            "file": "/media/linear3_off_azhLcWo.jpg",
            "remark": "bfb3ab18",
            "class_name": "who cares",
            "page_num": "1",
            "timestamp": "2020-02-05T22:24:23.766416Z",
            "lampSN": 34957,
            "pk": 3
        },
        {
            "file": "/media/linear3_off_jpGHkWP.jpg",
            "remark": "bfb3ab19",
            "class_name": "who cares",
            "page_num": "1",
            "timestamp": "2020-02-05T22:24:45.387858Z",
            "lampSN": 34957,
            "pk": 4
        },
        {
            "file": "/media/linear3_off_rFhGXAn.jpg",
            "remark": "bfb3ab20",
            "class_name": "who cares",
            "page_num": "1",
            "timestamp": "2020-02-05T22:24:54.000557Z",
            "lampSN": 34957,
            "pk": 5
        }
    ],
    "audio": {
        "file": "/media/Section1_mp3cut.net_2_ZndfqE4.mp3",
        "remark": "bfb3ab6",
        "class_name": "who cares",
        "length": "3000",
        "timestamp": null,
        "pk": 10
    },
    "name": "FD2Kp2",
    "transcript": "I am the teacher this is what I say!",
    "pk": 1,
    "submitted": false
},
{
    "time": "2020-01-17",
    "snapshots": [
        {
            "file": "/media/linear3_off_azhLcWo.jpg",
            "remark": "bfb3ab18",
            "class_name": "who cares",
            "page_num": "1",
            "timestamp": "2020-02-05T22:24:23.766416Z",
            "lampSN": 34957,
            "pk": 3
        },
        {
            "file": "/media/linear3_off_jpGHkWP.jpg",
            "remark": "bfb3ab19",
            "class_name": "who cares",
            "page_num": "1",
            "timestamp": "2020-02-05T22:24:45.387858Z",
            "lampSN": 34957,
            "pk": 4
        },
        {
            "file": "/media/linear3_off_rFhGXAn.jpg",
            "remark": "bfb3ab20",
            "class_name": "who cares",
            "page_num": "1",
            "timestamp": "2020-02-05T22:24:54.000557Z",
            "lampSN": 34957,
            "pk": 5
        }
    ],
    "audio": null,
    "name": "FD2Kp2",
    "transcript": "",
    "pk": 2,
    "submitted": false
},
{
    "time": "2020-01-17",
    "snapshots": [],
    "audio": null,
    "name": "Page",
    "transcript": "",
    "pk": 11,
    "submitted": false
}]
  let page = pages[0]
  act(()=>{
    render(<PageCard parent={state} page={page} pages={pages} />, container);
  })
  expect(container.textContent).toContain('Page '+String((pages.indexOf(page))+1))
})


