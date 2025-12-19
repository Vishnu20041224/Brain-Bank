import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { ThoughtProvider } from './context/Thoughts.jsx'
import { CookiesProvider } from "react-cookie";
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <Provider store={store}>
      <ThoughtProvider>
        <App />
      </ThoughtProvider>,
    </Provider>
  </CookiesProvider>
)
