import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
    Toolbar,
    Grid,
    Box,
    AppBar,
    Tabs,
    Tab,
    Button,
    Typography,
} from '@material-ui/core';
import styles from './StylesHeader';
import { getLoggedInUserRequest } from '../../../services/auth/AuthService';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ViewHeader = (props: any) => {
    const classes = styles();

    const { selectedValue, location, handleLogout } = props || {};

    let loggedInUser = getLoggedInUserRequest();

    let tabs = loggedInUser?.isAdmin
        ?
        <Tabs value={selectedValue}
            aria-label="tabs menu"
            scrollButtons="auto"
            variant="scrollable"
        >
            <Tab label="Tasks" component={Link} to={{ pathname: '/', search: location.search }} value='/' />
            <Tab label="Users" component={Link} to={{ pathname: '/users', search: location.search }} value='/users' />
        </Tabs>
        :
        <Tabs value={selectedValue}
            aria-label="tabs menu"
            scrollButtons="auto"
            variant="scrollable"
        >
            <Tab label="Tasks" component={Link} to={{ pathname: '/', search: location.search }} value='/' />
        </Tabs>;


    return (
        selectedValue !== undefined
            ?
            <Box className={classes.grow}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                {tabs}
                            </Grid>
                            <Grid item xs={4}>
                                <Box className={classes.container}>
                                    <AccountCircleIcon className={classes.marginTop} />
                                    <Typography className={classes.marginTop}>Hello, {loggedInUser.firstName} |</Typography>
                                    <Button
                                        endIcon={<ExitToAppIcon />}
                                        className={classes.buttonLogout}
                                        onClick={handleLogout}>
                                        Logout
                                </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
            : null
    );
};

export default withRouter(ViewHeader);