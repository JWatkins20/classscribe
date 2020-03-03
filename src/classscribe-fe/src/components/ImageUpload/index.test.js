
import React from 'react';
import ImageCarousel from './index';
import { render, fireEvent, wait, waitForDomChange, cleanup, getAllByTestId} from '@testing-library/react';
// import axiosMock from './__mocks__/axios'
//https://testing-library.com/docs/intro
import axios from 'axios'
import 'jest';

jest.mock('axios', () => {
  return {
    post: jest.fn(() => Promise.resolve({ data: {} })),
    get: jest.fn(() => Promise.resolve({ data: {} })),
  }})

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
      recording: undefined
  }}  

  let notes = state.state.items
  let note = notes[state.state.notebook]


it('render student ui', async () => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  axios.get.mockResolvedValueOnce({data: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}, status: 200})
  axios.get.mockResolvedValueOnce({data: {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]}, status: 200})
  axios.get.mockResolvedValueOnce({data: {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]}, status: 200})
  const { getAllByText, getByText } = render(<ImageCarousel />);
  const card = await waitForDomChange(()=>getByText("Capstone Practicum")) // wait for rerender after setstate, then find element with specified text(Notebook Card)
  fireEvent.click(getByText("Capstone Practicum")) // run switchnote() function
  fireEvent.click(getByText("Page 1")) // run switchnote() function
  cleanup()
});

it('test notebook toggle', async () => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  axios.get.mockResolvedValueOnce({"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null,"favoritedBooks":[{"Private":false,"class_name":"STS 4500","name":"Anotha one 3","pages":[{"time":"2020-01-17","snapshots":[{"file":"http://localhost:8000/media/tumblr_nqmq15RqHq1uxwtizo1_r1_400_PbbZFBt.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2019-12-12T11:22:12.859103Z","lampSN":1,"pk":1},{"file":"http://localhost:8000/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2},{"file":"http://localhost:8000/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3}],"audio":{"file":"http://localhost:8000/media/20190903-audio_DhAWY2T.mp3","remark":"bfb3ab2","class_name":"who cares","length":"3000","timestamp":null,"pk":4},"name":"Page","transcript":"Whoa guy slow down","pk":11,"submitted":false}],"pk":10,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}},{"Private":false,"class_name":"STS 4500","name":"Anotha one","pages":[],"pk":8,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}], status: 200})
  axios.get.mockResolvedValueOnce({data: {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]}, status: 200})
  axios.get.mockResolvedValueOnce({data: {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]}, status: 200})
  
  const {getByText, getAllByRole } = render(<ImageCarousel />);
  const card = await waitForDomChange(()=>getByText("Capstone Practicum")) // wait for rerender after setstate, then find element with specified text(Notebook Card)
  fireEvent.click(getAllByRole('saved_switch')[0])
  fireEvent.click(getAllByRole('saved_switch')[0]) //test functionality when already public
  fireEvent.click(getAllByRole('your_switch')[0])
  fireEvent.click(getAllByRole('your_switch')[0])
  cleanup()
});

it('test privacy toggle', async () => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  axios.get.mockResolvedValueOnce({data: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}, status: 200})
  axios.get.mockResolvedValueOnce({data: {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]}, status: 200})
  axios.get.mockResolvedValueOnce({data: {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]}, status: 200})
  axios.post.mockResolvedValueOnce({status: 200}) 
  const { getAllByText, getByText, getAllByRole } = render(<ImageCarousel />);
  const card = await waitForDomChange(()=>getByText("Capstone Practicum")) // wait for rerender after setstate, then find element with specified text(Notebook Card)
  fireEvent.change(getAllByRole('pub_switch')[0], {target: {checked: true}})
  fireEvent.change(getAllByRole('pub_switch')[0], {target: {checked: false}})
  cleanup()
})

it('test notebook edit button', async ()=> {
  axios.get.mockResolvedValueOnce({data: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}, status: 200})
  axios.get.mockResolvedValueOnce({data: {data: [{"Private":true,"class_name":"STS 4500","name":"Capstone Practicum","pages":[{"time":"2019-12-12","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":{"file":"/media/Section1_mp3cut.net_2_ZndfqE4.mp3","remark":"bfb3ab6","class_name":"who cares","length":"3000","timestamp":null,"pk":10},"name":"FD2Kp2","transcript":"I am the teacher this is what I say!","pk":1,"submitted":true},{"time":"2020-01-17","snapshots":[{"file":"/media/linear3_off_azhLcWo.jpg","remark":"bfb3ab18","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:23.766416Z","lampSN":34957,"pk":3},{"file":"/media/linear3_off_jpGHkWP.jpg","remark":"bfb3ab19","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:45.387858Z","lampSN":34957,"pk":4},{"file":"/media/linear3_off_rFhGXAn.jpg","remark":"bfb3ab20","class_name":"who cares","page_num":"1","timestamp":"2020-02-05T22:24:54.000557Z","lampSN":34957,"pk":5}],"audio":null,"name":"FD2Kp2","transcript":"","pk":2,"submitted":false},{"time":"2020-01-17","snapshots":[{"file":"/media/bg1_92NGGin.png","remark":"bfb3ab@virginia.edu","class_name":"example","page_num":"1","timestamp":"2020-01-16T12:52:13.438682Z","lampSN":1,"pk":2}],"audio":null,"name":"Databs","transcript":"","pk":3,"submitted":false}],"pk":1,"owner":{"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}}]}, status: 200})
  axios.get.mockResolvedValueOnce({data: {data: [{"Private":false,"class_name":"STS 4500","name":"Anotha one 2","pages":[],"pk":9,"owner":{"pk":4,"username":"jimbofisher@jimbofisher.edu","email":"bfb3ab@virginia.edu","first_name":"Jimbo","last_name":"Fisher","type":null,"university":"","verification_password":"","verified":false,"type_object":null}}]}, status: 200})
  axios.post.mockResolvedValueOnce({status: 200}) // post request from edit notebook
  const { getAllByText, getByText, getAllByRole, getByTestId } = render(<ImageCarousel />);
  await waitForDomChange(()=>getByText("Capstone Practicum"))
  expect(getAllByRole('edit-button')).toHaveLength(1)
  fireEvent.click(getAllByRole('edit-button')[0])
  //await waitForDomChange(()=>getAllByRole('edit-textfield'))
  fireEvent.change(getByTestId('content-input'), {target: {value: 'Test Name'}})
  fireEvent.click(getAllByRole('edit-submit-button')[0])
  expect(getAllByText('Test Name')).toHaveLength(1)
  cleanup()
})

it('render student ui empty', async () => {
  /**
   * mockResolvedValueOnce allows for setting mocked api call returns for multiple different api calls.
   * This example handles the first 3 axios requests made when student notebook view loads
   */
  axios.get.mockResolvedValueOnce({data: {"pk":1,"username":"bfb3ab@virginia.edu","email":"bfb3ab@virginia.edu","first_name":"Benjamin","last_name":"Brown","type":"student","university":"University of Virginia","verification_password":"AgFyT5ZUJX","verified":true,"type_object":null}, status: 200})
  axios.get.mockResolvedValueOnce({data: {data: []}, status: 400})
  axios.get.mockResolvedValueOnce({data: {data: []}, status: 400})
  const { getAllByText, getByText } = render(<ImageCarousel />);
  cleanup()
});
