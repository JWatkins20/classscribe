import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { base_url, url } from '../App';

import { Toolbar, Button} from '@material-ui/core';

const history = window.history;

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:''
  }
 }
login = async () =>{
    var payload = {
        "username": this.state.username,
        "password": this.state.password
    }
    try{
      await Axios.post(url +"login/", payload).then(
        async function(res){
            Cookies.set('user-key', res.data.key)
            const user = (await Axios.get(url + "user/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}})).data
            Cookies.set('user-type', user.type)
            Cookies.set('user-email', user.email)
            history.pushState({},"", "dashboard");
            window.location.reload(false);
            history.go(1);
        }
      )
    } catch(e){
      alert(e.response.request.response)
    }

}
componentDidMount() {
  if (this.props.location.state !== undefined){
    alert(this.props.location.state.incomingMessage);
  }
}
render() {


    return (
      <div>
        <MuiThemeProvider>
            <div>
                <AppBar title="Login"/>
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
                <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.login(event)}/>

            </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default withRouter(Login);