import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
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
      university: ''

    }

    const useStyles = makeStyles((theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(3),
      },
    }),
    );
    
    const classes = this.useStyles();
  }
  designation = (event) => {
    this.setState({type:event.target.value})  
  };
  
  university = (event) => {
    this.setState({university:event.target.value})  
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(newValue) => this.setState({password:newValue})}
             />
           <br/>
           <div>
           <FormControl component="fieldset" className={this.classes.formControl}>
                <FormLabel component="legend">Designation</FormLabel>
                <RadioGroup aria-label="Designation" name="designation" value={this.state.designation} onChange={this.designation}>
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                </RadioGroup>
            </FormControl>
            <br/>
            <FormControl component="fieldset" className={this.classes.formControl}>
                <FormLabel component="legend">University</FormLabel>
                <RadioGroup aria-label="Designation" name="designation" value={this.state.university} onChange={this.university}>
                    <FormControlLabel value="GMU" control={<Radio />} label="GMU" />
                    <FormControlLabel value="UVA" control={<Radio />} label="UVA" />
                </RadioGroup>
            </FormControl>
        </div>
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