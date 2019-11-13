import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from 'axios';
import { url } from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('register student', async () => {
  var payload = {
    "username": 'testing122@gmail.com',
    "email": 'testing122@gmail.com',
    "password1": 'passw0rd1',
    "password2": 'passw0rd1',
    "first_name": 'Rahat',
    "last_name": 'Maini',
    "university": 'University of Virginia',
    "type": 'student'
  }
  var endpoint = url + "registration/"
  await Axios.post(endpoint, payload).then(
    function(res){
      expect(res.data.token).not.toBe(null);
    }
  )
});

it('register teacher', async () => {
  var payload = {
    "username": 'testing127@gmail.com',
    "email": 'testing127@gmail.com',
    "password1": 'passw0rd1',
    "password2": 'passw0rd1',
    "first_name": 'Rahat',
    "last_name": 'Maini',
    "university": 'University of Virginia',
    "type": 'teacher'
  }
  var endpoint = url + "registration/"
  await Axios.post(endpoint, payload).then(
    function(res){
      expect(res.data.token).not.toBe(null);
    }
  )
});


it('register admin', async () => {
  var payload = {
    "username": 'testing128@gmail.com',
    "email": 'testing128@gmail.com',
    "password1": 'passw0rd1',
    "password2": 'passw0rd1',
    "first_name": 'Rahat',
    "special_password": "7'c$DP$f",
    "last_name": 'Maini',
    "university": 'University of Virginia',
    "type": 'admin'
  }
  var endpoint = url + "adminregistration/"
  await Axios.post(endpoint, payload).then(
    function(res){
      expect(res.data.token).not.toBe(null);
    }
  )
});

it('login student', async () => {
  var payload = {
    "username": 'testing123@gmail.com',
    "password": 'passw0rd1'
  }
  var endpoint = url + "login/"
  await Axios.post(endpoint, payload).then(
    function(res){
      expect(res.data.token).not.toBe(null);
    }
  )
})


it('login teacher', async () => {
  var payload = {
    "username": 'testing124@gmail.com',
    "password": 'passw0rd1'
  }
  var endpoint = url + "login/"
  await Axios.post(endpoint, payload).then(
    function(res){
      expect(res.data.token).not.toBe(null);
    }
  )
});

it('user details endpoint for student', async () => {
  var payload = {
    "username": 'testing122@gmail.com',
    "password": 'passw0rd1'
  }
  var endpoint = url + "login/"
  const res = await Axios.post(endpoint, payload).then(
    async (res) => {
      const user = (await Axios.get(url + "user/", {headers: {Authorization: 'Token ' + res.data.key}})).data
      expect(user.type).toBe('student');
    }
  )
  

})

