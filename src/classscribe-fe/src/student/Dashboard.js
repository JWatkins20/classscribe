import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import LogoutButton from '../login_registration/LogoutButton'

const StudentDashboard = () => {

    return(
        <div>
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login">
                            <LogoutButton />
                        </AppBar>
                    </div>
                </MuiThemeProvider>
            </div>
        </div>
    )
}

export default StudentDashboard;