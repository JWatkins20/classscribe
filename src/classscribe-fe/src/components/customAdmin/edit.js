import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { base_url } from '../../App';
import axios from "axios";

export default class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: props.match.params.course_name,
        professorId: '',
        building: props.match.params.building,
        room: props.match.params.room,
        time: props.match.params.time,
        serial: '',
    };

    this.getValues();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValues = this.getValues.bind(this);
  }

  getValues() {
    var that = this;
    const getUrl = base_url + `'courses/edit/${this.state.name}/${this.state.building}/${this.state.room}/${this.state.time}`;
    axios.get(getUrl)
        .then(function (response) {
            that.setState({
                name: response.data["course_name"],
                professorId: response.data["professorID"],
                building: response.data["building"],
                room: response.data["room"],
                time: response.data["time"],
                serial: response.data["lamp_serial"]
            });
        })
        .catch(function (error) {
            alert(error);
        });
  }
  
  handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      const putUrl = base_url + `courses/edit/${this.state.name}/${this.state.building}/${this.state.room}/${this.state.time}`;
      axios.post(putUrl, data)
        .then(function (response) {
            if (response.status === 200) {
                alert("Edits have been saved!");
            }
            else {
                alert("Edits were not saved!");
            }
        });
  }

  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formCourseName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control name="courseName" type="text" defaultValue={this.state.name}/>
            </Form.Group>

            <Form.Group controlId="formProfessor">
                <Form.Label>Professor Computing ID</Form.Label>
                <Form.Control name="professorId" type="text" defaultValue={this.state.professorId}/>
            </Form.Group>

            <Form.Group controlId="formBuilding">
                <Form.Label>Building</Form.Label>
                <Form.Control name="building" type="text" defaultValue={this.state.building}/>
            </Form.Group>

            <Form.Group controlId="formRoom">
                <Form.Label>Room</Form.Label>
                <Form.Control name="room" type="text" defaultValue={this.state.room}/>
            </Form.Group>

            <Form.Group controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control name="time" type="text" defaultValue={this.state.time}/>
                <Form.Text className="text-muted>">
                    Please enter the meeting day in following this format: MWF 12pm-12:50pm. 
                    This class would meet Monday, Wednesday, Friday from 12pm to 12:50pm.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formSerial">
                <Form.Label>Lamp Serial</Form.Label>
                <Form.Control name="lamp_serial" type="text" defaultValue={this.state.serial}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
  }
}