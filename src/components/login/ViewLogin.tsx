import React, { useState } from 'react';
import { Container, Grid, Box, Typography, TextField, Button, Card, CardContent } from '@material-ui/core';
import styles from './StylesLogin';
import { Link } from 'react-router-dom';

const ViewLogin = (props: any) => {
    const { handleSubmit, usernameErrorProps, passwordErrorProps } = props || {};

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event: any) => {
        event.preventDefault();
        handleSubmit(username, password);
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
                                            Username
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id='username-text-field'
                                        value={username || ''}
                                        onChange={(e) => setUsername(e.target.value)}
                                        fullWidth
                                        type='text'
                                        variant='outlined'
                                        size='small'
                                        error={usernameErrorProps?.error}
                                        helperText={usernameErrorProps?.helperText}
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
                                        value={password || ''}
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                        type='password'
                                        variant='outlined'
                                        size='small'
                                        error={passwordErrorProps?.error}
                                        helperText={passwordErrorProps?.helperText}
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
                                        <Typography component='p' variant='body2' className={classes.marginLeft}>
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

export default ViewLogin;