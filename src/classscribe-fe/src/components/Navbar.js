import React from 'react';

import { AppBar, Typography, Toolbar, Button} from '@material-ui/core';
import LogoutButton from '../login_registration/LogoutButton'
import { base_url, url } from "../App";

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: props.username || ""
        };
    }

    componentDidUpdate(props) {
        if (props.username !== this.state.username) {
            this.setState({
                username: props.username
            });
        }
    }

    render() {

        let that = this;
        return (
            <AppBar position="static" style={{'background-color': '#eb4034', 'border-color':'rgb(247,247,247)', 'box-shadow': '0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.13)'}}>
                <Toolbar>
                    <Typography variant="h6" style={{'color': '#fff'}}><b>Hello {this.state.username}</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;
                    {/*<Button color="inherit" href={`${base_url}view-all-courses`}>Courses</Button>
                    <Button color="inherit" href={`${base_url}notebook-carousel`}>Notebooks</Button>*/}

<React.Fragment transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <LogoutButton/>
                    </React.Fragment>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;