import React, {Component} from 'react';

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
                    Hello student!
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