import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from 'axios';
import { url } from './App';

function makeId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('register student', async () => {
  const email = makeId(10) + '@gmail.com';
  var payload = {
    "username": email,
    "email": email,
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
  const email = makeId(10) + '@gmail.com';
  var payload = {
    "username": email,
    "email": email,
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
  const email = makeId(10) + '@gmail.com';
  var payload = {
    "username": email,
    "email": email,
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
  const email = makeId(10) + '@gmail.com';
  var payload = {
    "username": email,
    "email": email,
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

  var payload = {
    "username": email,
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
  const email = makeId(10) + '@gmail.com';
  var payload = {
    "username": email,
    "email": email,
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

  var payload = {
    "username": email,
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

