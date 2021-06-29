import React from 'react'
import { useValues } from 'kea'
import { Layout } from 'antd'
import { makeStyles } from '@material-ui/core/styles'
import { sceneLogic } from './sceneLogic'
import { SceneLoading } from '../lib/utils'
import useDarkMode from 'use-dark-mode'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            height: '100%',
            width: '100%',
        },
    },
}))

const App: React.FC = () => {
    const prefersDarkMode = useDarkMode().value
    const classes = useStyles()
    const { scene, params, loadedScenes } = useValues(sceneLogic)

    const SceneComponent = loadedScenes[scene]?.component || (() => <SceneLoading />)
    console.log(document.getElementsByTagName('*'))

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    )

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout className={classes.root}>
                    <Layout.Content>
                        <SceneComponent {...params} />
                    </Layout.Content>
                </Layout>
            </ThemeProvider>
        </>
    )
}

export default App
