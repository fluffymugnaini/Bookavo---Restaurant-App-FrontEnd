import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Component/App/Index'
import reportWebVitals from './reportWebVitals'
import { Auth0Provider } from '@auth0/auth0-react'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Auth0Provider
    domain='dev--4j3brfv.eu.auth0.com'
    clientId='vkkqs3WniXuqKoNevjjRyhKD60CYjzA6'
    redirectUri='http://localhost:3000/reservations'
    //  redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
serviceWorker.unregister()
