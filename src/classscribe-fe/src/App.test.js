import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from 'axios';
import { url } from './App';
import 'jest';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import IconButton from '@material-ui/core/IconButton'
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


