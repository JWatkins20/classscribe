import React from 'react';

import { AppBar, Typography, Toolbar, Button} from '@material-ui/core';

import { base_url, url } from "../App";

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: props.username || ""
        };
    }

    render() {

        let that = this;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Hello {this.state.username}</Typography>
                    <Button color="inherit" href={base_url}>Home</Button>
                    <Button color="inherit" href={`${base_url}view-all-courses`}>Courses</Button>
                    <Button color="inherit" href={`${base_url}notebook-carousel`}>Notebooks</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;