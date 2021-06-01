import React from 'react'
import { useValues } from 'kea'
import { Layout } from 'antd'
import { makeStyles } from '@material-ui/core/styles'
import { sceneLogic } from './sceneLogic'
import { SceneLoading } from '../lib/utils'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            height: '100%',
            width: '100%',
        },
    },
}))

const App: React.FC = () => {
    const classes = useStyles()
    const { scene, params, loadedScenes } = useValues(sceneLogic)

    const SceneComponent = loadedScenes[scene]?.component || (() => <SceneLoading />)

    return (
        <>
            <Layout className={classes.root}>
                <Layout.Content>
                    <SceneComponent {...params} />
                </Layout.Content>
            </Layout>
        </>
    )
}

export default App
