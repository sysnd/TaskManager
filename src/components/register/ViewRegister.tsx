import React, { useState } from 'react';
import { Container, Grid, Box, Typography, TextField, Button, Card, CardContent } from '@material-ui/core';
import styles from './StylesRegister';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/User';

const ViewRegister = (props: any) => {
    const {
        handleSubmit,
        usernameErrorProps,
        passwordErrorProps,
        firstNameErrorProps,
        lastNameErrorProps
    } = props || {};

    const [user, setUser] = useState<User>({
        id: '',
        username: '',
        password: '',
        isAdmin: false,
        firstName: '',
        lastName: ''
    });

    const onSubmit = (event: any) => {
        event.preventDefault();
        handleSubmit(user);
    }

    const classes = styles();

    return (
        <Container component='main' maxWidth='xl'>
            <Grid container
                spacing={1}
                direction='row'
                alignItems='center'
                justify='center'>
                <Grid item xs={4} className={classes.divItem}>
                    <Card elevation={3}>
                        <CardContent>
                            <form onSubmit={onSubmit} autoComplete='off'>
                                <Box mb={1} mt={1}>
                                    <Typography component='h5' variant='h5'>
                                        Sign In
                                </Typography>
                                </Box>
                                <Grid item xs={12}>
                                    <Box mb={1} mt={5}>
                                        <Typography component='p' variant='body2' className={classes.title}>
                                            First Name
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id='first-name-text-field'
                                        value={user.firstName || ''}
                                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                        fullWidth
                                        type='text'
                                        variant='outlined'
                                        size='small'
                                        error={firstNameErrorProps.error}
                                        helperText={firstNameErrorProps.helperText}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box mb={1} mt={5}>
                                        <Typography component='p' variant='body2' className={classes.title}>
                                            Last Name
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id='last-name-text-field'
                                        value={user.lastName || ''}
                                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                        fullWidth
                                        type='text'
                                        variant='outlined'
                                        size='small'
                                        error={lastNameErrorProps.error}
                                        helperText={lastNameErrorProps.helperText}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box mb={1} mt={5}>
                                        <Typography component='p' variant='body2' className={classes.title}>
                                            Username
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id='username-text-field'
                                        value={user.username || ''}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                        fullWidth
                                        type='text'
                                        variant='outlined'
                                        size='small'
                                        error={usernameErrorProps.error}
                                        helperText={usernameErrorProps.helperText}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box mb={1} mt={5}>
                                        <Typography component='p' variant='body2' className={classes.title}>
                                            Password
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id='password-text-field'
                                        value={user.password || ''}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        fullWidth
                                        type='password'
                                        variant='outlined'
                                        size='small'
                                        error={passwordErrorProps.error}
                                        helperText={passwordErrorProps.helperText}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display='flex' mt={1}>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            color='primary'
                                            className={classes.submit}
                                        >
                                            Sign In
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display='flex' mt={1}>
                                        <Typography component='p' variant='body2'>
                                            Don't have an account?
                                        </Typography>
                                        <Typography component='p' variant='body2'>
                                            <Link to={{ pathname: '/register' }}>
                                                Register
                                            </Link>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container >
    )
}

export default ViewRegister;