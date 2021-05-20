import React from 'react'
import ReactDOM from 'react-dom'

import App from './scenes/App'

import { GlobalStyles } from './GlobalStyles'

ReactDOM.render(
    <div>
        <GlobalStyles />
        <App />
    </div>,

    document.getElementById('root')
)
