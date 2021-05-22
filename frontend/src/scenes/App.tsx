import React from 'react'
import { useValues } from 'kea'
import { Layout } from 'antd'

import { sceneLogic } from './sceneLogic'
import { SceneLoading } from '../lib/utils'

const App = (): JSX.Element | null => {
    const { scene, params, loadedScenes } = useValues(sceneLogic)

    const SceneComponent = loadedScenes[scene]?.component || (() => <SceneLoading />)

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Content>
                    <SceneComponent {...params} />
                </Layout.Content>
            </Layout>
        </>
    )
}

export default App
