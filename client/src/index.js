import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import store from './redux/store'
import { Provider as ReduxProvider } from 'react-redux'

import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}
const theme = extendTheme({ config })

ReactDOM.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </ReduxProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
