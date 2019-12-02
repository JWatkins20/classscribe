import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';


var history = window.history;

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:"Click here to Register",
      isLogin:true
    }
  }

  redirectToRegister = () =>{
    history.pushState({},"", "registration");
    window.location.reload(false);
    history.go(1);
  }

  componentDidMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    this.setState({
                  loginscreen:loginscreen
    })
  }
  render() {
    return (
      <div style={{textAlign:"center"}}>
        <div className="loginscreen">
          {this.state.loginscreen}
          <div>
            {this.state.loginmessage}
            <MuiThemeProvider>
              <div>
                <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={() => this.redirectToRegister()}/>
            </div>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};
export default Loginscreen;