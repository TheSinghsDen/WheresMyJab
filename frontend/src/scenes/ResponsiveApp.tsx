import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import App from './App'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(./desktop_background.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        placeContent: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    app: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: '414px',
            height: '800px',
            boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 6px',
            overflowY: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: '100vw',
            minHeight: '100vh',
        },
    },
}))

const ResponsiveApp: React.FC = () => {
    const classes = useStyles()

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={6} md={6} className={classes.image} />

            <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} alignItems="center">
                <div className={classes.paper}>
                    <Paper className={classes.app} elevation={3} variant="outlined">
                        <App />
                    </Paper>
                </div>
            </Grid>
        </Grid>
    )
}

export default ResponsiveApp
