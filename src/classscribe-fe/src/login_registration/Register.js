import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Axios from 'axios';
import {Radio, RadioGroup, FormHelperText, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';




class Register extends Component {
  
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      password2:'',
      type: '',
      university: '',
      useStyles:
        makeStyles((theme) =>
          createStyles({
            formControl: {
              margin: theme.spacing(3),
            },
          }),
        )
    }
    
  }

  register = async (event) =>{
    var payload = {
        "username": this.state.email,
        "email": this.state.email,
        "password1": this.state.password,
        "password2": this.state.password,
        "first_name": this.state.first_name,
        "last_name": this.state.last_name,
        "university": this.state.university,
        "type": this.state.type
    }
    //TODO: save token in cookies
    await Axios.post("http://localhost:8000/api/registration/", payload)
  }
  
  designation = (event) => {
    this.setState({type:event.target.value})  
  };
  
  university = (event) => {
    this.setState({university:event.target.value})  
  };

  render() {
    return (
      <div style={{textAlign:"center"}}>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event) => this.setState({first_name:event.target.value})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event) => this.setState({last_name:event.target.value})}
             />
           <br/>
           <TextField
             hintText="Enter your Email/Username"
             type="email"
             floatingLabelText="Email"
             onChange = {(event) => this.setState({email:event.target.value})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event) => this.setState({password:event.target.value})}
             />
           <br/>
            <div>
              <FormControl component="fieldset" className={this.state.useStyles}>
                    <FormLabel component="legend">Designation</FormLabel>
                    <RadioGroup aria-label="Designation" name="designation" value={this.state.designation} onChange={this.designation}>
                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                        <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl component="fieldset" className={this.state.useStyles}>
                    <FormLabel component="legend">University</FormLabel>
                    <RadioGroup aria-label="Designation" name="designation" value={this.state.university} onChange={this.university}>
                        <FormControlLabel value="George Mason University" control={<Radio />} label="GMU" />
                        <FormControlLabel value="University of Virginia" control={<Radio />} label="UVA" />
                    </RadioGroup>
                </FormControl>
              </div>
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.register(event)}/>

           </div>
         </MuiThemeProvider>
      </div>
    );
  }

}
const style = {
  margin: 15,
};
export default Register;