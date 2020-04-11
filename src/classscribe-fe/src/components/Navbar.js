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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Hello {this.state.username}</Typography>
                    {/*<Button color="inherit" href={`${base_url}view-all-courses`}>Courses</Button>
                    <Button color="inherit" href={`${base_url}notebook-carousel`}>Notebooks</Button>*/}
                    <LogoutButton style={{float:"right"}}/>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;