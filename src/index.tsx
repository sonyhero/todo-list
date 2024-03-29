import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { HashRouter } from 'react-router-dom'
import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
)
