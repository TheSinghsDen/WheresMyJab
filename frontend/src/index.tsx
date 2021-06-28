import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { getContext } from 'kea'

import ResponsiveApp from './scenes/ResponsiveApp'
import { initKea } from './initKea'

const LightTheme = React.lazy(() => import('./LightStyles'))
const DarkTheme = React.lazy(() => import('./DarkStyles'))

const ThemeSelector: React.FC = ({ children }) => {
    return (
        <>
            <React.Suspense fallback={<></>}>
                <DarkTheme />
                <LightTheme />
            </React.Suspense>
            {children}
        </>
    )
}

initKea()

ReactDOM.render(
    <Provider store={getContext().store}>
        <ThemeSelector>
            <ResponsiveApp />
        </ThemeSelector>
    </Provider>,
    document.getElementById('root')
)
