import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'

import data from './redux/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Provider store={data}>
            <App/>
        </Provider>,
    </React.StrictMode>
)

reportWebVitals()
