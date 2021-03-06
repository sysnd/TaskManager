import React, { useState, useEffect } from 'react';
import ViewHeader from './ViewHeader';
import { AppBar } from '@material-ui/core';
import styles from './StylesHeader';
import { withRouter } from 'react-router-dom';

const ContainerHeader = (props: any) => {
    const {
        location,
        history
    } = props || {};

    const classes = styles();

    const [showHeader, setShowHeader] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('/');

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setShowHeader(false);
        history.push('/login');
    }

    useEffect(() => {
        if (!location.pathname.includes('/login')
            && !location.pathname.includes('/register')) {
            setShowHeader(true);
        }
        if (location.pathname !== undefined) {
            setSelectedValue(location.pathname);
        }
    },
        [location]
    );

    return showHeader ?
        (
            <>
                <AppBar position="fixed" className={classes.appBar}>
                    <ViewHeader selectedValue={selectedValue} handleLogout={handleLogout} />
                </AppBar>
            </>
        )
        : null
};

export default withRouter(ContainerHeader)
