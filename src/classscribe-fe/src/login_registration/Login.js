import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Axios from 'axios';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:''
  }
 }
login = async (event) =>{
    var payload = {
        "username": this.state.username,
        "password": this.state.password
    }
    //TODO: save token in cookies
    await Axios.post("http://localhost:8000/api/login/", payload)
}
render() {

    return (
      <div>
        <MuiThemeProvider>
            <div>
                <AppBar
                    title="Login"
                />
                <TextField
                    hintText="Enter your Username"
                    floatingLabelText="Username"
                    onChange = {(event) => this.setState({username:event.target.value})}
                    />
                <br/>
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {(event) => this.setState({password:event.target.value})}
                />
                <br/>
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.login(event)}/>

            </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;