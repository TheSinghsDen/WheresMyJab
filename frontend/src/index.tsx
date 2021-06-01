import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { getContext } from 'kea'

import ResponsiveApp from './scenes/ResponsiveApp'
import { initKea } from './initKea'

import { GlobalStyles } from './GlobalStyles'

initKea()

ReactDOM.render(
    <Provider store={getContext().store}>
        <GlobalStyles />
        <ResponsiveApp />
    </Provider>,
    document.getElementById('root')
)
