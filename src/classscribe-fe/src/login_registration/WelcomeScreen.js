import React, {Component} from 'react';
import StudentDashboard from '../student/Dashboard'
import Navbar from '../components/Navbar';
const history = window.history;

export default class WelcomeScreen extends Component{

    render(){
        if(history.state.type === "teacher"){
            return(
                <>
                    <Navbar></Navbar>
                    <div> 
                        Hello teacher 😎! 
                    </div>
                </>
            )
        }else if(history.state.type === "student"){
            return (
                <>
                    <Navbar></Navbar>
                    <div>
                        <StudentDashboard/>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <Navbar></Navbar>
                    <div>
                        Hello admin!
                    </div>
                </>
            )
        }
    }
}