import React from 'react'
import { Layout } from 'antd'

import HomePage from './homepage/HomePage'

const App = (): JSX.Element | null => {
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <HomePage />
            </Layout>
        </>
    )
}

export default App
