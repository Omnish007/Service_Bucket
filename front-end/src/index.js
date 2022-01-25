import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataProvider from "./redux/store"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
      <App />
      </Router>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
)