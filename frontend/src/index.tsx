import '~/styles'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { getContext } from 'kea'

import ResponsiveApp from './scenes/ResponsiveApp'
import { initKea } from './initKea'

// const ThemeSelector: React.FC = ({ children }) => {
//     const darkMode = useDarkMode(localStorage.getItem('darkMode') || false)
//     const prefersDarkMode = darkMode.value

//     const changeTheme = (): void => {
//         let darkStyleSheet
//         let lightStyleSheet

//         for (let i = 0; i < document.styleSheets.length; i++) {
//             if (document.styleSheets.item(i).href?.includes('DarkStyles')) {
//                 darkStyleSheet = document.styleSheets.item(i)
//             } else if (document.styleSheets.item(i).href?.includes('LightStyles')) {
//                 lightStyleSheet = document.styleSheets.item(i)
//             }
//         }
//         console.log(prefersDarkMode)
//         if (prefersDarkMode) {
//             if (lightStyleSheet !== undefined && darkStyleSheet !== undefined) {
//                 darkStyleSheet.disabled = false
//                 lightStyleSheet.disabled = true
//             }
//         } else {
//             if (lightStyleSheet !== undefined && darkStyleSheet !== undefined) {
//                 lightStyleSheet.disabled = false
//                 darkStyleSheet.disabled = true
//             }
//         }
//     }

//     useEffect(() => {
//         changeTheme()
//         window.addEventListener('load', () => {
//             changeTheme()
//         })
//     }, [prefersDarkMode])

//     return (
//         <>
//             <React.Suspense fallback={<></>}>
//                 <DarkTheme />
//                 <LightTheme />
//             </React.Suspense>
//             {children}
//         </>
//     )
// }

initKea()

ReactDOM.render(
    <Provider store={getContext().store}>
        <ResponsiveApp />
    </Provider>,
    document.getElementById('root')
)
