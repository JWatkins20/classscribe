import React, {Component} from 'react';
import StudentDashboard from '../student/Dashboard'
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie'
const history = window.history;

export default class WelcomeScreen extends Component{

    render(){
        if(Cookies.get('user-type') === "teacher"){
            return(
                <>
                    <Navbar username={Cookies.get('user-email')}></Navbar>
                    <div> 
                        Hello teacher 😎! 
                    </div>
                </>
            )
        }else if(Cookies.get('user-type') === "student"){
            return (
                <>
                    <Navbar username={Cookies.get('user-email')}></Navbar>
                    <div>
                        <StudentDashboard/>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <Navbar username={Cookies.get('user-email')}></Navbar>
                    <div>
                        Hello admin!
                    </div>
                </>
            )
        }
    }
}