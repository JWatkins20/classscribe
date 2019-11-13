import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";

export default class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        professorId: '',
        building: '',
        room: '',
        time: '',
        serial: '',
    };
  }
  
  handleSubmit(event) {
      alert("in handle submit");
      const data = new FormData(event.target);
      axios.post(
          "http://localhost:8000/courses/create",
          data
      );
  }

  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formCourseName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control name="courseName" type="text"/>
            </Form.Group>

            <Form.Group controlId="formProfessor">
                <Form.Label>Professor Computing ID</Form.Label>
                <Form.Control name="professorId" type="text"/>
            </Form.Group>

            <Form.Group controlId="formBuilding">
                <Form.Label>Building</Form.Label>
                <Form.Control name="building" type="text"/>
            </Form.Group>

            <Form.Group controlId="formRoom">
                <Form.Label>Room</Form.Label>
                <Form.Control name="room" type="text"/>
            </Form.Group>

            <Form.Group controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control name="time" type="text"/>
                <Form.Text className="text-muted>">
                    Please enter the meeting day in following this format: MWF 12pm-12:50pm. 
                    This class would meet Monday, Wednesday, Friday from 12pm to 12:50pm.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formSerial">
                <Form.Label>Lamp Serial</Form.Label>
                <Form.Control name="lamp_serial" type="text"/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
  }
}