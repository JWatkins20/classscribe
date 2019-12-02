import { url } from '../App'
import Axios from 'axios'
import React from 'react'

const history = window.history

const verify = async (email, password) => {
    await Axios.post(url + 'verifyemail/' + email + '/' + password)
    history.pushState({},"", "login");
    window.location.reload(false);
    history.go(1)
}

const EmailVerification = ({match}) => {
    verify(match.params.email, match.params.verification_password)
    return (
        <div>Hello</div>
    )
}


export default EmailVerification;