import {Button} from '@material-ui/core';
import React from 'react'
import Axios from 'axios'
import { url } from '../App'
import Cookies from 'js-cookie'
import { BrowserRouter as Redirect } from "react-router-dom"



const LogoutButton = () => {
    return (
        <div>
            <Button label="Logout" primary={true} style={{margin:15}} onClick={() => logout()}/>
        </div>
    )
}


export default LogoutButton;


const logout = async () => {
    await Axios.post(url + "logout/", {headers: {Authorization: 'Token ' + Cookies.get('user-key')}})
    Cookies.remove('user-key');
    Cookies.remove('user-type')
    window.history.pushState({}, "/login")
    window.location.reload(false);
    window.history.go(1)
}