import React, {Component} from 'react';
import StudentDashboard from '../student/Dashboard'
const history = window.history;

export default class WelcomeScreen extends Component{

    render(){
        if(history.state.type === "teacher"){
            return(
                <div> 
                    Hello teacher 😎! 
                </div>
            )
        }else if(history.state.type === "student"){
            return (
                <div>
                    <StudentDashboard/>
                </div>
            )
        }else{
            return (
                <div>
                    Hello admin!
                </div>
            )
        }
    }
}