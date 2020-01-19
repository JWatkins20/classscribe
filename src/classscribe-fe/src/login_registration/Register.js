import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Axios from 'axios';
import {Radio, RadioGroup, FormHelperText, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import { url } from '../App';


const history = window.history


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
      special_password: '',
      admin: false,
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

  register = async () =>{
    if(this.state.email.substring(this.state.email.length-3) !== 'edu'){
      alert("Please enter a valid edu email address.")
    }else{
      this.setState({email:this.state.email.toLowerCase()})
      var payload = {
          "username": this.state.email,
          "email": this.state.email,
          "password1": this.state.password,
          "password2": this.state.password,
          "special_password": this.state.special_password,
          "first_name": this.state.first_name,
          "last_name": this.state.last_name,
          "university": this.state.university,
          "type": this.state.type
      }
      var endpoint = url + "registration/"
      if(this.state.admin){
        endpoint = url + "adminregistration/"
      }
      await Axios.post(endpoint, payload).then(
        async function(res){
          if(res.status == '201'){
            res = await Axios.post(url + 'emailverification/' + payload.email)
            history.pushState({},"", "/login");
            window.location.reload(false);
            history.go(1);
          }else{
            alert('Error!')
          }
        }
      )
    }

  }
  
  designation = (event) => {
    if(event.target.value === "admin"){
      this.setState({admin:true})
    }else{
      this.setState({admin:false})
    }
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
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Enter Email"
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
            { this.state.admin ?         
              <TextField
                type = "password"
                hintText="Enter your Special Password"
                floatingLabelText="Special Password"
                onChange = {(event) => this.setState({special_password:event.target.value})}
              />
            : null }
           <br/>
            <div>
              <FormControl component="fieldset" className={this.state.useStyles}>
                    <FormLabel component="legend">Designation</FormLabel>
                    <RadioGroup aria-label="Designation" name="designation" value={this.state.designation} onChange={this.designation}>
                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                        <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
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
              <p class="text-uppercase">Remember to verify your email before trying to login.</p>
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