import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App'
import { AppProvider } from '../src/reducers/appConfigReducer/appConfigReducer';





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);