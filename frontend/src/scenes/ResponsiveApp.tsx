import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import App from './App'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        [theme.breakpoints.up('sm')]: {
            backgroundImage: 'url(./desktop_background.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        placeContent: 'center',
    },
    text: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            placeContent: 'center',
        },
    },
    textbox: {
        height: '50vh',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        placeContent: 'center',
        color: 'white',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '700',
    },
    divider: {
        width: '120px',
        height: '4px',
        background: 'white',
    },
    subtitle: {
        fontSize: '2.5rem',
        fontWeight: '300',
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    description: {
        fontSize: '1.25rem',
        fontWeight: '400',
        textAlign: 'center',
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
            <Grid item xs={false} sm={6} md={6} className={classes.image}>
                <div className={classes.text}>
                    <div className={classes.textbox}>
                        <Typography className={classes.title}>WheresMyJab</Typography>
                        <Divider className={classes.divider} />
                        <Typography className={classes.subtitle}>This Website is best experienced on mobile</Typography>
                        <Typography className={classes.description}>
                            We are working on a better version for the desktop view. You can use the mobile view on
                            desktop but for a better experience open this on mobile.
                        </Typography>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6}>
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
