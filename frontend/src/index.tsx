import React from 'react'
import ReactDOM from 'react-dom'

import App from './scenes/App'
import { initKea } from './initKea'

import { GlobalStyles } from './GlobalStyles'

initKea()

ReactDOM.render(
    <div>
        <GlobalStyles />
        <App />
    </div>,

    document.getElementById('root')
)
