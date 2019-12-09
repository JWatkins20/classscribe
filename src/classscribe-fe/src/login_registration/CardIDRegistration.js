
import React, { useState } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { base_url } from "../App"

const sendID = async (email, user_id) => {
    var endpoint = base_url + "IDexists/lamp_registration/" + email + "/" + user_id 
    await Axios.post(endpoint).then(
      async function(res){
          if(res.status !== 200){
            alert('Email is not valid!')
          }else{
            alert('ID successfully linked!')
          }
        }
      )
}

const CardIDRegistration = ({ match }) => {
    const [email, setEmail] = useState('');
    const useStyles = makeStyles((theme) =>
        createStyles({
            formControl: {
                margin: theme.spacing(3),
            },
        })
    )
    return (
        <div style={{textAlign:"center"}}>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Link your card ID with your account"
                    />
                    <TextField
                        hintText="Enter your email"
                        floatingLabelText="Email"
                        onChange = {(event) => setEmail(event.target.value)}
                    />
                    <br/>
                    <RaisedButton label="Link" primary={true} style={useStyles} onClick={() => sendID(email, match.params.user_id)}/>

                </div>
            </MuiThemeProvider>
        </div>
    );
}

export default CardIDRegistration;
